# TESTING_EVALS — Plan de test rapide

## Validation statique
- Vérifier que nom dossier == frontmatter.name
- Lancer : python3 scripts/validate_skill.py --skill-dir .

## Tests de déclenchement
- Utiliser le JSON should / should-not trigger.
- Observer false positives et false negatives.
- Ajuster la description.

## Tests de qualité de sortie
- Tester 2 à 3 demandes réalistes.
- Vérifier qu’aucun placeholder ne reste accidentellement.
- Vérifier que les sections essentielles sont présentes.
- Vérifier que la sortie reste lisible et non vague.
