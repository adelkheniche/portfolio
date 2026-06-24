#!/usr/bin/env python3
"""
Generate trigger eval queries for the skill description.
"""

import argparse
import json
from datetime import date


def main():
    ap = argparse.ArgumentParser(description="Generate should-trigger / should-not-trigger eval queries.")
    ap.add_argument("--out", required=True, help="Output JSON file")
    args = ap.parse_args()

    today = date.today().isoformat()

    should = [
        "Je veux construire un portfolio d’objets solide et lisible.",
        "Aidez-moi à transformer mes projets en case studies pour mon portfolio.",
        "Mon portfolio de designer-fabricant fait amateur, pourquoi ?",
        "Je veux choisir quels projets garder dans mon portfolio d’objets.",
        "Aidez-moi à écrire une page projet pour un objet en céramique et électronique.",
        "Comment montrer ma compétence de fabrication dans un portfolio ?",
        "Je veux structurer un PDF portfolio avec 3 à 5 projets phares.",
        "Aidez-moi à définir le ton de mon portfolio sans qu’il fasse corporate.",
        "Comment photographier mes objets pour qu’ils paraissent sérieux ?",
        "J’ai besoin d’un audit de portfolio pour un profil maker / design produit.",
    ]

    should_not = [
        "Corrige seulement les fautes de ce paragraphe.",
        "Écris-moi une lettre de motivation.",
        "Fais-moi un CV.",
        "Quelle est la météo à Paris ?",
        "Explique-moi ce qu’est la céramique 3D en deux phrases.",
        "Écris une fonction Fibonacci en Python.",
        "Traduis cette phrase en anglais.",
        "Donne-moi trois idées d’objets absurdes.",
        "Résume ce texte.",
        "Comment installer Tailwind sur un site ?",
    ]

    queries = [{"query": q, "should_trigger": True, "generated": today} for q in should] + \
              [{"query": q, "should_trigger": False, "generated": today} for q in should_not]

    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(queries, f, indent=2, ensure_ascii=False)

    print(json.dumps({
        "ok": True,
        "out": args.out,
        "count": len(queries),
        "should_trigger": len(should),
        "should_not_trigger": len(should_not),
    }, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
