---
id: birdie
index: 03
title: BIRDIE & AIR QUALITY
category: 2026 // IOT & QUALITY OF AIR
hero_img: assets/birdie/birdie_hero.jpg
excerpt: Système de mesure IoT pour les FabLabs, inspiré de Birdie. Signalétique physique pour la qualité de l'air.
---

## Snapshot

- **Rôle :** Designer / Contrefacteur
- **Timeframe :** 2026
- **Contexte :** Recherche appliquée sur la santé dans les Fablabs
- **Techniques :** Capteur HM330X (PM2.5 & PM10), ESP32-S3, Servomoteur, Supabase, Dataviz Web
- **Statut :** Prototype fonctionnel

## Contraintes

Dans un atelier de céramique ou un fablab, les manipulations (ponçage de la terre, préparation de barbotine, cuisson) génèrent des particules fines. Sans signal visuel, les usagers n'activent pas l'aspiration ou n'aèrent pas les pièces. La contrainte consistait à concevoir un indicateur physique pour modifier les comportements sans écran.

<video autoplay muted loop playsinline class="project-video">
  <source src="assets/birdie.mp4" type="video/mp4" />
</video>

## Intention

Traduire la qualité de l'air en un état mécanique. Inspiré du projet *Birdie* (canari basculant en cas d'air vicié), cet oiseau imprimé en 3D bascule tête en bas lorsque le seuil de PM2.5 est dépassé. Les mesures sont envoyées en continu vers une base de données pour analyse sur un tableau de bord en ligne.

![Birdie dans l'atelier](assets/birdie/birdie_workshop_sink.jpg)
![Birdie et étagères](assets/birdie/birdie_workshop_shelves.jpg)

## Démarche

- **Actionneur :** Un servomoteur gère directement le pivotement de l'oiseau pour valider le principe mécanique.
- **Croisement des données :** Relevés sur Supabase croisés avec le planning de l'atelier pour analyser l'impact de chaque activité.

![Gros plan sur Birdie](assets/birdie/birdie_closeup.jpg)
![Prototype V1 sur support bois](assets/birdie/birdie_prototype_wood.jpg)

## Fabrication

- **Acquisition :** Raccordement d'un capteur HM330X à un ESP32-S3.
- **Régulation :** Limitation logicielle de l'accélération du servomoteur pour éviter les chutes de tension et réinitialisations de l'ESP32.
- **Transmission :** Envoi des données vers la base Supabase en Wi-Fi.

![Soudure de l'ESP32 Feather](assets/birdie/birdie_soldering.jpg)
![Électronique interne et batterie](assets/birdie/birdie_internal.jpg)
![Impression 3D de l'oiseau](assets/birdie/birdie_3d_print_head.jpg)
![Birdie sur le mur](assets/birdie/birdie_hero.jpg)
![Birdie et vue d'angle](assets/birdie/birdie_workshop_angle.jpg)

## Résultat

- **Physique :** L'alerte mécanique incite les usagers à aérer.
- **Analyse :** Les données ont révélé un défaut d'aspiration sur la découpeuse laser (rejet d'air dans la pièce voisine), ce qui a permis de faire corriger l'installation.

![Interface du tableau de bord d'analyse de l'air](assets/birdie/birdie_dashboard.png)

Le tableau de bord croise les taux de particules (PM2.5/PM10) et le planning des machines pour identifier la pollution liée à chaque activité (laser, ponçage). Accessible en ligne : [adelkheniche.github.io/airquality](https://adelkheniche.github.io/airquality).

## Reproductibilité

Le fonctionnement général (moteur DC, filtrage du signal, transmission Wi-Fi) est validé. Pistes d'amélioration (V2) :
- Conception d'un PCB dédié regroupant le microcontrôleur, le driver moteur et le capteur de qualité de l'air.
- Intégration d'un circuit de charge (BMS) et d'une batterie LiPo pour rendre le projet autonome et sans fil.
