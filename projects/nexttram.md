---
id: nexttram
index: 02
title: NEXTTRAM
category: 2026 // EMBEDDED DESIGN & DATA
hero_img: assets/siel/nexttram_full.png
excerpt: Afficheur domestique temps réel basé sur ESP32, traduisant les flux de transport en un signal physique.
---

## Snapshot

- **Rôle :** Maker
- **Timeframe :** 2026
- **Contexte :** Projet de design matériel et logiciel autour de la donnée urbaine
- **Techniques :** Impression 3D FDM, C++ (ESP32), API RATP/IDFM, Interface TFT
- **Statut :** Prototype fonctionnel

## Contraintes

L'enjeu consistait à extraire les données de transport public des écrans de smartphones pour les afficher en continu dans le hall d'entrée d'un domicile. La contrainte était de concevoir un boîtier compact intégrant l'électronique de communication et un écran TFT lisible à distance.

![NEXTTRAM Physical Design](assets/siel/nexttram_full.png)

## Intention

Concevoir une balise physique domestique dont la géométrie torsadée oriente l'écran de signalisation à hauteur de regard, s'éloignant des boîtiers techniques classiques.

## Démarche

- **Charte graphique :** Utilisation des codes de la signalétique de transport parisienne (couleurs des lignes, indices de direction).
- **Sélection des données :** Affichage des horaires de passage en temps réel et des alertes de perturbation.
- **Format :** Modélisation d'un pied vertical pour limiter l'encombrement sur la console d'entrée.

## Fabrication

- **Firmware :** Développement C++ (ESP32) gérant les requêtes HTTPS vers les API RATP/IDFM et les reconnexions réseau automatiques.
- **Parsing :** Utilisation de la bibliothèque `ArduinoJson` pour traiter le flux de données en limitant l'empreinte mémoire RAM de l'ESP32.
- **Impression 3D :** Modélisation et impression du pied torsadé (PLA vert métallique) avec une tolérance d'ajustement de 0.2 mm pour insérer l'écran TFT.

![NEXTTRAM Interface](assets/siel/nexttram_closeup.jpg)

## Résultat

L'appareil affiche en continu les horaires de transport. L'écran TFT assure le contraste nécessaire. L'intégration d'un circuit de charge et d'une batterie LiPo est envisagée pour supprimer le cordon d'alimentation actuel.

## Reproductibilité

Le code de connexion, de traitement JSON et d'affichage TFT est documenté pour être appliqué à d'autres flux de données.
