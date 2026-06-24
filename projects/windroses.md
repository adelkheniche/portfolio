---
id: windroses
index: 01
title: WINDROSES
category: 2026 // IOT & POETIC COMPUTING
hero_img: assets/windroses/windrose_hero.jpg
excerpt: Transmettre une pensée à distance par le souffle. Une interaction poétique et éphémère, sans écran ni bouton.
---

## Snapshot

- **Rôle :** Designer
- **Timeframe :** 2026
- **Contexte :** Recherche sur l'interaction avec un objet connecté cinétique
- **Techniques :** Impression 3D SLA, coulage porcelaine, CAO (Fusion 360), usinage PCB, soudure CMS, ESP32, MQTT
- **Statut :** Prototype fonctionnel

## Contraintes

Transmettre un signal à distance par le mouvement, sans écran. La contrainte était de loger l'électronique dans la porcelaine tout en stabilisant la base face au souffle, et d'associer des techniques artisanales et industrielles en prenant en compte les tolérances propres à chaque technologie.

<video autoplay muted loop playsinline class="project-video">
  <source src="assets/windroses/windroses_video.mp4" type="video/mp4" />
</video>

## Intention

Connecter les gens entre eux sans écran, sans LED ni bouton, par le souffle. Le geste engendre un mouvement éphémère à l'autre bout, comme une pensée silencieuse et invisible. Parfois, recevoir cette attention d'un être cher suffit à tout dire.

Le corps cylindrique en porcelaine abrite la carte de contrôle et le moteur, tandis que les pales sont en placage bois cintré.

![Concept d'interaction](assets/windroses/windroses_concept.png)

## Démarche

- **Détection :** Un micro-moteur DC utilisé en génératrice remplace le capteur de vent, filtré pour stabiliser le signal électrique du souffle.
- **Réseau :** Communication bidirectionnelle en MQTT entre deux modules ESP32.

![Recherche bobinages moteur](assets/windroses/coils_prototypes.jpg)
![Moteur sur-mesure](assets/windroses/placeholder_custom_motor.jpg)

## Fabrication

- **Céramique :** Coulage de barbotine de porcelaine dans un moule en plâtre tiré d'un master imprimé en résine 3D (SLA). Modélisation Fusion 360 intégrant 15 % de retrait de la terre.
- **Électronique :** Usinage CNC du PCB de test, fraisage de la carte finale, soudure de composants CMS.
- **Intégration :** Véritable « integration hell » consistant à loger la carte électronique dans un châssis imprimé en 3D, lui-même inséré dans la pièce en porcelaine. Cette dernière se déformant et rétrécissant de manière variable à la cuisson, il a fallu concevoir un berceau d'intégration tolérant pour compenser ces variations géométriques imprévisibles.

![Modélisation Fusion 360](assets/windroses/cad_fusion360.jpg)
![Impression SLA du master](assets/windroses/mold_sla_master.jpg)
![Moulage en plâtre](assets/windroses/mold_step2.jpg)
![Coulage de l'argile](assets/windroses/mold_plaster_clay.jpg)
![Pièces brutes à l'atelier](assets/windroses/bases_workshop.jpg)

- **Ingénierie électronique :**
![Fraisage CNC de précision](assets/windroses/cnc_milling_pcb.jpg)
![Circuit imprimé brut](assets/windroses/pcb%20diy%20homemade.jpg)
![Circuit imprimé final assemblé](assets/windroses/pcb_blue_finished.jpg)

## Résultat

Le souffle est détecté de manière fiable. La carte s'intègre dans le piètement malgré le retrait géométrique de la porcelaine après cuisson.

![Windrose Final Result](assets/windroses/windrose_final.png)

## Reproductibilité

La chaîne de fabrication (master SLA, moule plâtre, usinage PCB) est validée. Le formage des pales en bois par trempage et cintrage permet d'obtenir la courbure de manière répétable, mais demande un processus artisanal fastidieux et peu reproductible à grande échelle.

![Pales en placage bois après trempage](assets/windroses/pinwheel_wood_veneer.jpg)
