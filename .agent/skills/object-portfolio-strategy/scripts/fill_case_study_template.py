#!/usr/bin/env python3
"""
Fill a portfolio case study template from a JSON variables file.
"""

import argparse
import json
import re
import sys
from pathlib import Path

PLACEHOLDER_RE = re.compile(r"\[([A-Z0-9_]+)\]")


def eprint(msg: str) -> None:
    print(msg, file=sys.stderr)


def main():
    ap = argparse.ArgumentParser(description="Fill portfolio case study placeholders using a JSON variables file.")
    ap.add_argument("--template", required=True, help="Path to template file")
    ap.add_argument("--vars", required=True, help="Path to JSON file with variables")
    ap.add_argument("--out", required=True, help="Output file path")
    ap.add_argument("--strict", action="store_true", help="Fail if placeholders remain")
    args = ap.parse_args()

    template_path = Path(args.template)
    vars_path = Path(args.vars)
    out_path = Path(args.out)

    if not template_path.exists():
        eprint(f"Error: template not found: {template_path}")
        raise SystemExit(2)
    if not vars_path.exists():
        eprint(f"Error: vars file not found: {vars_path}")
        raise SystemExit(2)

    vars_data = json.loads(vars_path.read_text(encoding="utf-8"))
    if not isinstance(vars_data, dict):
        eprint("Error: vars JSON must be an object mapping keys to values.")
        raise SystemExit(2)

    text = template_path.read_text(encoding="utf-8")

    def repl(m):
        key = m.group(1)
        if key in vars_data and vars_data[key] is not None:
            return str(vars_data[key])
        return m.group(0)

    filled = PLACEHOLDER_RE.sub(repl, text)
    remaining = sorted(set(PLACEHOLDER_RE.findall(filled)))

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(filled, encoding="utf-8")

    result = {
        "ok": (len(remaining) == 0) if args.strict else True,
        "output": str(out_path),
        "remaining_placeholders": remaining,
    }
    print(json.dumps(result, indent=2, ensure_ascii=False))

    if args.strict and remaining:
        eprint(f"Strict mode: remaining placeholders: {remaining}")
        raise SystemExit(1)


if __name__ == "__main__":
    main()
