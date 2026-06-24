# DESCRIPTION_TUNING — Optimiser le champ `description`

## Objectif
Obtenir un déclenchement fiable : ni trop rare, ni trop large.

## Règles pratiques
- Écrire la description au mode impératif.
- Décrire l’intention utilisateur, pas l’architecture interne.
- Utiliser des formulations réalistes : construire un portfolio, structurer, auditer, choisir les projets, écrire une case study, montrer sa compétence, éviter un rendu amateur.
- Inclure les synonymes métier : design produit, designer-fabricant, fabrication numérique, craft, maker, portfolio d’objets.
- Rester sous la limite de la spec.

## Tests recommandés
1. Générer un set initial avec `scripts/gen_trigger_eval_queries.py`.
2. Ajouter des near-misses.
3. Ajuster la description.
4. Retester.

## Anti-overtrigger
Ne pas utiliser une description trop générique du type “pour écrire des documents”.
La description doit rester spécifique au portfolio d’objets et à ses usages.
