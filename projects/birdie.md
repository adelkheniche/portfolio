---
id: birdie
index: 03
title: BIRDIE & AIR QUALITY
category: 2026 // IOT & QUALITY OF AIR
hero_img: assets/birdie/birdie_hero.jpg
excerpt: Système de mesure IoT pour les FabLabs, inspiré de Birdie. Signalétique physique pour la qualité de l'air.
---

## Snapshot

- **Rôle :** Maker
- **Timeframe :** 2026
- **Contexte :** Recherche appliquée sur la santé dans les Fablabs
- **Techniques :** Capteur HM330X (PM2.5 & PM10), ESP32-S3, Servomoteur, Supabase, Dataviz Web
- **Statut :** Prototype fonctionnel

## Contraintes

Dans un atelier de céramique ou un fablab, de nombreuses manipulations génèrent des particules fines imperceptibles (ponçage de la terre cuite, préparation de barbotine dégageant de la silice, cuisson). Le principal enjeu réside dans l'invisibilité du danger : sans signal concret, les usagers n'activent pas l'aspiration et n'ouvrent pas les fenêtres. La contrainte consistait à concevoir une alerte physique non intrusive, capable de modifier les comportements sans passer par un écran.

<video autoplay muted loop playsinline class="project-video">
  <source src="assets/birdie.mp4" type="video/mp4" />
</video>

## Intention

Transformer la donnée de pollution en un état mécanique. Inspiré du projet original *Birdie* (canari basculant en cas d'air vicié), ce prototype utilise un oiseau en impression 3D qui bascule tête en bas lorsque le seuil critique de PM2.5 est dépassé. La particularité du projet est d'envoyer ces mesures en continu vers une base de données cloud pour les analyser via un site web dédié.

![Birdie dans l'atelier](assets/birdie/birdie_workshop_sink.jpg)
![Birdie et étagères](assets/birdie/birdie_workshop_shelves.jpg)

## Démarche

- **Actionneur :** Utilisation d'un servomoteur en liaison directe pour le pivot de l'oiseau. Ce choix simplifie le prototype et valide l'usage avant d'optimiser la mécanique.
- **Croisement des données :** Les relevés de qualité de l'air enregistrés sur Supabase sont croisés avec l'agenda de réservation des machines de l'atelier pour analyser l'impact de chaque activité.

![Gros plan sur Birdie](assets/birdie/birdie_closeup.jpg)
![Prototype V1 sur support bois](assets/birdie/birdie_prototype_wood.jpg)

## Fabrication

- **Acquisition :** Raccordement d'un capteur HM330X à un microcontrôleur ESP32-S3.
- **Stabilisation électrique :** Le démarrage du servomoteur provoquait des chutes de tension réinitialisant l'ESP32. Ce problème a été résolu de manière logicielle en limitant la vitesse d'accélération du signal PWM.
- **Architecture Data :** Transmission des données de mesure à la base de données Supabase par requêtes HTTP (Wi-Fi) pour l'archivage en temps réel.

![Soudure de l'ESP32 Feather](assets/birdie/birdie_soldering.jpg)
![Électronique interne et batterie](assets/birdie/birdie_internal.jpg)
![Impression 3D de l'oiseau](assets/birdie/birdie_3d_print_head.jpg)
![Birdie sur le mur](assets/birdie/birdie_hero.jpg)
![Birdie et vue d'angle](assets/birdie/birdie_workshop_angle.jpg)

## Résultat

- **Physique :** L'alerte mécanique de l'oiseau attire l'attention et incite les usagers à aérer la pièce.
- **Numérique :** Le croisement des graphiques de pollution et du planning de réservation a identifié un dysfonctionnement de l'aspiration de la découpeuse laser, qui rejetaient l'air dans une salle adjacente. Ces données ont permis de faire lancer des travaux de correction.

![Interface du tableau de bord d'analyse de l'air](assets/birdie/birdie_dashboard.png)

Ce tableau de bord croise les mesures de concentration de particules (PM2.5 et PM10) avec l'agenda des réservations de machines et d'activités du laboratoire. Cette corrélation permet de comparer précisément la qualité de l'air générée par chaque type d'activité (comme une initiation à la découpe laser ou le ponçage de pièces en céramique) afin de valider et d'anticiper les risques sanitaires spécifiques à chaque usage de la salle. Le tableau de bord est accessible en ligne : [adelkheniche.github.io/airquality](https://adelkheniche.github.io/airquality).

## Reproductibilité

Le fonctionnement général (moteur DC, filtrage du signal, transmission Wi-Fi) est validé. Pistes d'amélioration (V2) :
- Conception d'un PCB dédié regroupant le microcontrôleur, le driver moteur et le capteur de qualité de l'air.
- Intégration d'un circuit de charge (BMS) et d'une batterie LiPo pour rendre le projet autonome et sans fil, en optimisant l'autonomie via une veille prolongée avec une prise de mesure toutes les 15 minutes.
