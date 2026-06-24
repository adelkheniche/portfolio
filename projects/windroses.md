---
id: windroses
index: 01
title: WINDROSES
category: 2026 // IOT & POETIC COMPUTING
hero_img: assets/windroses/windrose_hero.jpg
excerpt: Objet de design cinétique pour la transmission de signaux à distance.
---

## Snapshot

- **Rôle :** Maker
- **Timeframe :** 2026
- **Contexte :** Recherche sur l'interaction avec un objet connecté cinétique
- **Techniques :** Impression 3D SLA, coulage porcelaine, CAO (Fusion 360), usinage PCB, soudure CMS, ESP32, MQTT
- **Statut :** Prototype fonctionnel

## Contraintes

L'enjeu consistait à transmettre un signal à distance par une interaction cinétique, sans écran. La contrainte principale était de dimensionner un volume interne suffisant pour abriter l'électronique tout en assurant la stabilité de la base en porcelaine face au souffle de l'utilisateur.

<video autoplay muted loop playsinline class="project-video">
  <source src="assets/windroses/windroses_video.mp4" type="video/mp4" />
</video>

## Intention

Souffler sur un moulinet active la rotation d'un second moulinet distant. Le corps cylindrique en porcelaine abrite la carte de contrôle et le moteur, tandis que les pales sont en placage bois cintré.

![Concept d'interaction](assets/windroses/windroses_concept.png)

## Démarche

- **Générateur :** Un micro-moteur DC utilisé en génératrice remplace le capteur de vent, associé à un filtre passe-bas matériel et logiciel pour stabiliser le signal électrique induit par le souffle.
- **Protocole :** Utilisation du protocole MQTT pour la communication réseau bidirectionnelle entre les modules ESP32.

![Recherche bobinages moteur](assets/windroses/coils_prototypes.jpg)
![Moteur sur-mesure](assets/windroses/placeholder_custom_motor.jpg)

## Fabrication

- **Céramique :** Modélisation CAO (Fusion 360) intégrant 15 % de retrait de la porcelaine au séchage et à la cuisson. Impression 3D résine (MSLA) du master, fabrication du moule en plâtre et coulage de la barbotine.
- **Électronique :** Usinage de la carte de test sur CNC, fraisage de la carte finale sur machine LPKF, soudure des composants CMS et intégration de la carte dans le piètement.

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

Le couplage du moteur DC et du filtre permet de détecter de manière fiable l'intensité et la durée du souffle. L'intégration de la carte dans la base valide les tolérances dimensionnelles de la porcelaine après cuisson.

![Windrose Final Result](assets/windroses/windrose_final.png)

## Reproductibilité

Le processus (master SLA, moule plâtre, usinage PCB) et le formage des pales en bois par trempage et cintrage permettent d'obtenir la courbure et l'ajustement de manière fiable.

![Pales en placage bois après trempage](assets/windroses/pinwheel_wood_veneer.jpg)
