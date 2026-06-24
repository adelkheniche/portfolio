#!/usr/bin/env python3
"""
Validate an Agent Skills / Antigravity skill directory.
Outputs JSON to stdout.
"""

import argparse
import json
import re
import sys
from pathlib import Path

NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def die(msg: str, code: int = 2) -> None:
    print(msg, file=sys.stderr)
    raise SystemExit(code)


def read_skill_md(skill_dir: Path) -> str:
    p = skill_dir / "SKILL.md"
    if not p.exists():
        die(f"Error: SKILL.md not found in {skill_dir}")
    return p.read_text(encoding="utf-8")


def split_frontmatter(text: str):
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        die("Error: SKILL.md must start with frontmatter '---'")
    try:
        end_idx = next(i for i in range(1, len(lines)) if lines[i].strip() == "---")
    except StopIteration:
        die("Error: closing frontmatter delimiter not found")
    fm_lines = lines[1:end_idx]
    body = "\n".join(lines[end_idx + 1:]).lstrip("\n")
    return fm_lines, body


def parse_minimal_yaml(fm_lines):
    data = {}
    i = 0
    n = len(fm_lines)

    def indent(s: str) -> int:
        return len(s) - len(s.lstrip(" "))

    while i < n:
        raw = fm_lines[i]
        line = raw.strip()
        i += 1

        if not line or line.startswith("#"):
            continue

        if ":" not in line:
            continue

        key, rest = line.split(":", 1)
        key = key.strip()
        rest = rest.lstrip()

        if rest in (">", ">-", "|", "|-"):
            block = []
            while i < n:
                nxt = fm_lines[i]
                if nxt.strip() == "":
                    block.append("")
                    i += 1
                    continue
                if indent(nxt) == 0:
                    break
                block.append(nxt[indent(nxt):])
                i += 1
            data[key] = " ".join([ln.strip() for ln in block]).strip() if rest.startswith(">") else "\n".join(block).rstrip("\n")
            continue

        if rest == "":
            nested = {}
            while i < n:
                nxt = fm_lines[i]
                if nxt.strip() == "":
                    i += 1
                    continue
                if indent(nxt) == 0:
                    break
                stripped = nxt.strip()
                if ":" in stripped:
                    k, v = stripped.split(":", 1)
                    nested[k.strip()] = v.strip().strip('"').strip("'")
                i += 1
            data[key] = nested
            continue

        data[key] = rest.strip().strip('"').strip("'")

    return data


def validate(frontmatter, skill_dir: Path):
    errors = []
    warnings = []
    folder_name = skill_dir.name

    name = frontmatter.get("name")
    desc = frontmatter.get("description")

    if not name:
        errors.append("Missing required field 'name'.")
    else:
        if len(name) > 64:
            errors.append("'name' exceeds 64 characters.")
        if not NAME_RE.match(name):
            errors.append("'name' must match ^[a-z0-9]+(-[a-z0-9]+)*$.")
        if name != folder_name:
            errors.append(f"'name' must match parent directory name. name='{name}', dir='{folder_name}'.")

    if not desc or not str(desc).strip():
        errors.append("Missing required field 'description'.")
    elif len(desc) > 1024:
        errors.append("'description' exceeds 1024 characters.")

    compat = frontmatter.get("compatibility")
    if compat and len(str(compat)) > 500:
        errors.append("'compatibility' exceeds 500 characters.")

    skill_md = (skill_dir / "SKILL.md").read_text(encoding="utf-8")
    line_count = skill_md.count("\n") + 1
    if line_count > 500:
        warnings.append("SKILL.md is long; move more detail into references/ if needed.")

    return errors, warnings


def main():
    ap = argparse.ArgumentParser(description="Validate an Agent Skills / Antigravity skill directory.")
    ap.add_argument("--skill-dir", default=".", help="Path to skill directory")
    args = ap.parse_args()

    skill_dir = Path(args.skill_dir).resolve()
    text = read_skill_md(skill_dir)
    fm_lines, _ = split_frontmatter(text)
    fm = parse_minimal_yaml(fm_lines)
    errors, warnings = validate(fm, skill_dir)

    out = {
        "ok": len(errors) == 0,
        "errors": errors,
        "warnings": warnings,
        "frontmatter": fm,
        "skill_dir": str(skill_dir),
    }
    print(json.dumps(out, indent=2, ensure_ascii=False))
    raise SystemExit(0 if out["ok"] else 1)


if __name__ == "__main__":
    main()
