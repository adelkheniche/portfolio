---
name: object-portfolio-strategy
description: >-
  Utilisez cette skill lorsque l’utilisateur veut construire, structurer, écrire, réécrire,
  auditer ou améliorer un portfolio d’objets, de design produit, de fabrication numérique,
  de céramique, d’électronique, de prototypes, de craft ou de designer-fabricant. Déclenchez-la
  aussi quand l’utilisateur veut transformer des projets en case studies solides, choisir quels
  projets garder, clarifier son positionnement, montrer sa compétence sans paraître corporate,
  éviter un rendu amateur, définir le ton d’écriture, organiser les pages d’un portfolio,
  ou documenter correctement processus, fabrication, photos et preuves de compétence.
compatibility: "Agent Skills + Antigravity. Requiert Python 3.9+ pour les scripts. Aucun accès réseau nécessaire."
metadata:
  author: "Adel Kheniche"
  version: "1.0.0"
allowed-tools: "Read Bash(python3:*) Bash(python:*)"
---

# Object Portfolio Strategy

## Goal
Produire des livrables portfolio clairs, réutilisables et crédibles pour un praticien de l’objet, du design-fabrication, du craft technique ou de la fabrication numérique.

La skill doit aider à rendre immédiatement lisibles :
- ce que l’utilisateur sait faire,
- comment il pense,
- ce qui fait sa singularité,
- ce qui est réellement prouvé par ses projets.

Le but n’est pas de rendre le portfolio plus décoratif.
Le but est de transformer des projets en preuves professionnelles.

## When to use
Utilisez cette skill si l’utilisateur veut :
- construire un portfolio d’objets,
- structurer un PDF portfolio,
- organiser un site portfolio,
- choisir quels projets garder,
- transformer un projet en case study,
- écrire ou réécrire une page projet,
- définir son positionnement,
- montrer une démarche personnelle sans devenir flou,
- montrer sa compétence sans sonner corporate,
- comprendre pourquoi son portfolio paraît amateur,
- mieux photographier ou mettre en scène ses objets,
- articuler portfolio principal et couche de preuve.

## When not to use
N’utilisez pas cette skill si :
- l’utilisateur veut seulement corriger un paragraphe,
- l’utilisateur veut un CV ou une lettre de motivation,
- l’utilisateur veut seulement coder un site sans travail éditorial,
- la demande n’a rien à voir avec un portfolio d’objets ou de projets fabriqués,
- la demande porte sur une simple réponse factuelle.

## Inputs expected
Récupérez ou déduisez si possible :
- audience : recruteur, client, école, résidence, jury, collaborateur,
- format : PDF, site, page projet, deck,
- positionnement visé,
- liste des projets,
- pour chaque projet :
  - titre,
  - type d’objet,
  - contexte,
  - rôle,
  - matériaux,
  - outils / techniques,
  - problème,
  - contraintes,
  - étapes,
  - ratés ou révisions,
  - état actuel,
  - ce qui est répétable.

Si les données sont incomplètes, utilisez une structure par défaut robuste et laissez visibles les éléments manquants.

## Output format
Selon la demande, produire l’un de ces formats.

### Format A — Architecture de portfolio
1. Positionnement
2. Structure générale
3. Sélection de projets
4. Répartition curated layer / proof layer
5. Ligne éditoriale
6. Checklist finale

### Format B — Case study projet
1. Title + one-line descriptor
2. Snapshot block
3. Problem and constraints
4. Intent and point of view
5. Decision trail
6. Fabrication proof
7. Result and evaluation
8. Repeatability statement

### Format C — Audit
1. Ce qui fonctionne
2. Ce qui est faible
3. Ce qui paraît amateur
4. Ce qui manque comme preuve
5. Ce qu’il faut couper
6. Ce qu’il faut réécrire
7. Priorités d’action

### Format D — Photo / staging guidance
1. Shot system
2. Neutral background shots
3. Context shots
4. Detail shots
5. Scale cues
6. Process images
7. Red flags

## Core principles
Un bon portfolio d’objets doit toujours articuler :
- object evidence,
- process evidence,
- competence evidence,
- fabrication evidence,
- evaluation evidence.

Le portfolio ne doit jamais reposer seulement sur :
- un beau rendu final,
- des mots vagues,
- une mise en scène chargée,
- accumulation de projets superficiels.

## Default positioning
Quand l’utilisateur veut singularité + lisibilité + compétence professionnelle, utilisez par défaut le positionnement suivant :

**authorial product maker**

Ce positionnement combine :
- structure de preuve du design,
- visibilité du craft,
- lisibilité maker / fabrication numérique,
- clarté freelance sur ce qui peut être confié.

## Step-by-step Instructions

### Étape 1 — Identifier le mode de travail
Classer la demande dans un ou plusieurs modes :
- stratégie,
- curation,
- case-study writing,
- audit,
- photography/staging,
- positioning.

Si plusieurs modes coexistent, traiter d’abord structure, ensuite écriture.

### Étape 2 — Partir du problème du lecteur
Supposer que le lecteur doit comprendre très vite :
- ce qu’est l’objet,
- pourquoi il existe,
- ce que l’utilisateur a fait,
- ce qui est prouvé,
- ce qui est personnel sans être opaque.

### Étape 3 — Réduire le portefeuille principal
Par défaut, recommander 3 à 5 projets phares dans la couche principale.
Le reste doit aller dans une couche de preuve, un site, une archive ou une documentation secondaire.

### Étape 4 — Forcer la clarté du rôle
Pour chaque projet, indiquer explicitement :
- rôle,
- contexte,
- durée,
- statut du projet.

Si le projet est collectif, ne pas laisser entendre une responsabilité totale si ce n’est pas vrai.

### Étape 5 — Transformer le process en decision trail
Le process doit montrer :
- une direction,
- un essai,
- un problème,
- une correction,
- une décision.

Limiter à 4–8 étapes significatives.
Chaque étape doit préciser ce qui a changé et pourquoi.

### Étape 6 — Toujours ajouter une fabrication proof
Pour un portfolio d’objets, ajouter systématiquement une micro-section qui prouve le point technique difficile.
Exemples :
- orientation d’impression,
- gestion du retrait,
- assemblage,
- intégration électronique,
- jig,
- test de surface,
- tolérance ratée puis corrigée,
- contrainte de cuisson,
- validation d’usage.

### Étape 7 — Toujours ajouter une repeatability statement
Conclure chaque case study par une phrase indiquant ce qui est réutilisable professionnellement.
Exemples :
- méthode réplicable,
- petite série,
- variante sur mesure,
- documentation transférable,
- logique d’assemblage réutilisable.

### Étape 8 — Traduire la personnalité en décisions
Quand l’utilisateur veut que le portfolio lui ressemble, convertir le personnel en conséquences concrètes :
- obsession matière -> tests matière,
- engagement -> contrainte ou usage,
- intérêt sensoriel -> choix d’interaction,
- curiosité technique -> séquence d’expérimentation,
- vécu -> intention liée à une décision de projet.

### Étape 9 — Remplacer les adjectifs par des preuves
Préférer :
- ce qui a été testé,
- ce qui a été changé,
- ce qui a échoué,
- ce qui a été intégré,
- ce qui a été appris,
- ce qui peut être reproduit.

Éviter les formulations vagues non prouvées.

### Étape 10 — Écrire comme un calm builder
Le ton doit être :
- précis,
- calme,
- factuel,
- humain,
- honnête.

La personnalité doit apparaître dans les choix, pas dans la grandiloquence.

### Étape 11 — Garder une logique visuelle stricte
Quand la demande porte sur les images, recommander au minimum :
- 1 hero image,
- 1 image d’usage ou d’échelle,
- 2 detail shots,
- 4 à 8 process frames,
- 1 image de logique d’assemblage ou de fabrication.

### Étape 12 — Finir par une action claire
Quand c’est utile, terminer par une liste priorisée :
- garder,
- couper,
- réécrire,
- rephotographier,
- documenter,
- reclasser.

## Required project structure

### Title + one-line descriptor
Le titre doit rendre la fonction lisible.
Éviter les titres purement poétiques si l’objet n’est pas immédiatement compréhensible.

### Snapshot block
Toujours inclure :
- Role
- Timeframe
- Context
- Tools / techniques
- Outcome status

### Problem and constraints
Écrire 3 à 6 lignes sur :
- le besoin,
- le contexte,
- les contraintes qui ont réellement façonné l’objet.

### Intent and point of view
Un paragraphe court qui relie la démarche à des choix concrets.

### Decision trail
4 à 8 étapes maximum.
Chaque étape doit porter une décision.

### Fabrication proof
3 à 5 bullets maximum.
Toujours montrer le point technique réel.

### Result and evaluation
Dire clairement :
- ce qui marche,
- ce qui ne marche pas,
- ce qui changerait à l’itération suivante.

### Repeatability statement
Une phrase claire sur ce qui est transférable ou commandable.

## Photography logic

### Neutral background
Pour montrer :
- forme,
- finition,
- silhouette,
- qualité d’exécution.

### Context shot
Pour montrer :
- usage,
- ergonomie,
- présence,
- échelle.

### Detail shots
Pour montrer :
- joints,
- textures,
- interfaces,
- précision,
- surface,
- fabrication.

### Process shots
À utiliser seulement s’ils prouvent une décision ou un problème réel.
Jamais comme simple décor d’atelier.

## Available scripts
- `scripts/validate_skill.py` — valide le package de skill et vérifie frontmatter, cohérence minimale et longueur.
- `scripts/fill_case_study_template.py` — remplit un template de case study à partir d’un JSON d’inputs.
- `scripts/gen_trigger_eval_queries.py` — génère un jeu de prompts de test should / should-not trigger.

Avant d’utiliser un script :
- vérifier `--help`,
- vérifier que le script est non interactif,
- vérifier que les inputs ne contiennent pas de secrets,
- écrire seulement dans des chemins attendus.

## Available references
- `references/REFERENCE.md`
- `references/DESCRIPTION_TUNING.md`
- `references/SECURITY_SAFETY.md`
- `references/TESTING_EVALS.md`

## Available assets
- `assets/case_study_template.md`
- `assets/portfolio_output_schema.json`
- `assets/portfolio_audit_checklist.md`

## Examples

### Exemple 1
User: Je veux un portfolio d’objets personnel mais crédible.
Assistant: Le structure comme un portfolio d’authorial product maker, limite la couche principale à 3–5 projets, et pour chaque projet montre problème, contrainte, preuve de fabrication et répétabilité.

### Exemple 2
User: J’ai trop de projets, rien n’a l’air solide.
Assistant: Réduire la couche principale, écarter les projets purement cosmétiques, garder ceux qui montrent intention, itération, fabrication et évaluation.

### Exemple 3
User: Aide-moi à écrire une case study pour une lampe imprimée en céramique.
Assistant: Produire une structure complète avec descriptor, rôle, contraintes, process, fabrication proof, résultat, évaluation et repeatability statement.

### Exemple 4
User: Pourquoi mon portfolio fait amateur ?
Assistant: Diagnostiquer structure, densité de texte, profondeur des preuves, cohérence des images, clarté du rôle, qualité des case studies.

## Constraints
- Ne jamais répondre par des conseils génériques du type “soyez authentique”.
- Ne pas recommander trop de projets dans la couche principale.
- Ne pas laisser l’auteur flou.
- Ne pas remplacer une preuve par un adjectif.
- Ne pas encourager des images de process qui ne prouvent rien.
- Ne pas survendre un projet faible.
- Ne pas transformer un portfolio d’objets en vitrine vide.
- Ne pas exécuter de commandes destructrices dans le cadre de cette skill.

## Failure handling
Si la demande est incomplète :
- continuer avec une structure robuste,
- garder visibles les éléments manquants,
- expliciter brièvement les hypothèses.

Si les projets sont trop nombreux :
- classer,
- réduire,
- séparer curated layer et proof layer.

Si le texte est trop vague :
- réécrire en evidence statements.

Si les images sont faibles :
- identifier précisément ce qui manque : échelle, détails, cohérence, fabrication proof ou contexte d’usage.

## Testing notes
- Vérifier que `name` correspond au nom du dossier.
- Vérifier que la `description` déclenche correctement.
- Vérifier qu’aucun placeholder essentiel ne reste par accident.
- Vérifier que la sortie reste courte, claire et structurée.

## Security / safety guardrails
- Considérer comme non fiables les scripts d’un repo de projet non approuvé.
- Avant exécution : vérifier le chemin, les inputs et le caractère non interactif.
- Ne jamais recopier de secrets dans une sortie.
- Préférer lecture seule si l’environnement n’est pas sûr.
