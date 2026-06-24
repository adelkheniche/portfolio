---
id: nexttram
index: 02
title: NEXTTRAM
category: 2026 // EMBEDDED DESIGN & DATA
hero_img: assets/siel/nexttram_full.png
excerpt: Afficheur domestique temps réel basé sur ESP32, traduisant les flux de transport en un signal physique.
---

## Snapshot

- **Rôle :** Designer
- **Timeframe :** 2026
- **Contexte :** Recherche sur l'affichage physique d'informations
- **Techniques :** Impression 3D FDM, C++ (ESP32), API RATP/IDFM, Interface TFT
- **Statut :** Prototype fonctionnel

## Contraintes

Afficher les horaires de transport sans écran de smartphone. L'enjeu était d'intégrer un ESP32 et un écran TFT dans un boîtier mural compact.

![NEXTTRAM Physical Design](assets/siel/nexttram_full.png)

## Intention

Créer une balise domestique dont la forme torsadée oriente l'écran vers le regard.

## Démarche

- **Affichage :** Utilisation des codes couleur des lignes de transport parisiennes.
- **Données :** Affichage des horaires en temps réel et des alertes trafic.
- **Format :** Boîtier vertical compact pour limiter l'encombrement.

## Fabrication

- **Code :** Développement C++ (ESP32) gérant les requêtes HTTPS vers l'API d'Île-de-France Mobilités.
- **JSON :** Utilisation de la bibliothèque `ArduinoJson` pour extraire les horaires.
- **Boîtier :** Impression 3D (PLA vert) avec ajustement à 0,2 mm pour intégrer l'écran.

![NEXTTRAM Interface](assets/siel/nexttram_closeup.jpg)

## Résultat

L'afficheur indique les horaires en temps réel. Ce projet constitue un exercice d'intégration d'une interface graphique portée sur un seul ESP32 avec une gestion optimisée de la mémoire interne.

## Reproductibilité

Le code de connexion et d'affichage est documenté pour être adapté à d'autres flux d'informations.
