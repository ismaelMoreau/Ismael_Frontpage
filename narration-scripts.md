# Scripts de Narration — Visite Guidée Audio

Scripts pour générer les fichiers audio TTS. Chaque section dure environ 20-25 secondes.

---

## Intro (~15s)

> Salut. Moi c'est Ismaël.
> Ça fait huit ans que je construis des trucs avec du code.
> Des systèmes distribués, des jeux vidéo, des pipelines DevOps...
> Et maintenant, des agents I A qui travaillent pour moi.
> Laisse-moi te montrer comment j'en suis arrivé là.

---

## Acte 1: Les Fondations (~24s)

> 2017. Mon entrée dans le métier.
> Laboratoire Blockchain. Pas de React, pas de framework sophistiqué.
> Du JavaScript brut, du Linux, Mongo D B pour les données, et des interfaces qui parlent aux machines.
> C'est là que j'ai compris que le code, c'est pas juste des lignes sur un écran.
> C'est un système vivant qui doit tenir debout tout seul.

---

## Acte 2: L'Échelle (~24s)

> 2019. Desjardins Assurance.
> Pas une startup. Une institution financière avec des exigences de sécurité strictes.
> Des clusters de machines virtuelles qui gèrent des millions en assurance.
> Soudainement, mon code seul suffisait plus.
> Fallait des pipelines sécurisés, de l'automatisation, des systèmes qui se déploient tout seuls à travers dev, Q A et Prod.
> Gestion I A M Azure, portes de validation, conformité. Le cloud sécurisé est devenu mon terrain de jeu.

---

## Acte 3: Le Créatif (~20s)

> 2022. Changement de cap.
> Sarbakan, un studio de jeux vidéo.
> Un monde où le code doit être beau et rapide en même temps.
> Unity, C sharp, React. Ma première rencontre avec la programmation orientée données.
> Les systèmes distribués du DevOps qui rencontrent le temps réel du jeu vidéo.

---

## Acte 3.5: L'Initiative S Q D C (~18s)

> Puis la S Q D C.
> Un travail simple qui me laisse l'énergie de coder le soir.
> Et c'est exactement ce que je fais.
> Le S Q D C Products Portal, je l'ai monté rapidement — un outil pour les conseillers.
> Pendant que je travaille le jour, je construis la nuit.

---

## Acte 4: Le Multiplicateur (~26s)

> 2024. Le tournant décisif.
> AEC en Intelligence Artificielle. Mais c'était pas juste apprendre une nouvelle compétence.
> L'IA, c'est un multiplicateur de tout ce que je savais déjà faire.
> Mes projets le prouvent.
> Apprentissage par renforcement profond en C sharp pur. Des ennemis qui apprennent pendant qu'on joue.
> Des grands modèles de langage locaux qui collaborent. Mongo DB pour les données, Néo four jay pour les relations.
> Aujourd'hui, je ne code plus tout seul. J'orchestre des agents qui codent pour moi.

---

## Outro (~12s)

> Voilà. Huit ans résumés en quelques minutes.
> Du programmeur qui tape du code à l'architecte qui dirige des agents.
> Les tables ont tourné.
> Si tu veux jaser, mon email est juste là.

---

## Notes TTS

Les scripts ci-dessus sont optimisés pour la synthèse vocale:
- **Acronymes espacés**: "I A", "Q A", "L L M", "E C S", "A E C", "I A M", "S Q D C"
- **C#** → "C sharp"
- **MongoDB** → "Mongo D B"
- **Neo4j** → "Néo four jay"
- **VM** → "machines virtuelles"
- **fancy** → "sophistiqué"
- **Game dev** → "Développement de jeux"
- **turning point** → "tournant décisif"
- **gates** → "portes de validation"

---

## Fichiers à générer

```
audio/
├── intro.mp3
├── act1.mp3          (fondations)
├── act2.mp3          (echelle)
├── act3.mp3          (creatif - Sarbakan)
├── act3-5.mp3        (sqdc - Initiative SQDC)
├── act4.mp3          (multiplicateur)
└── outro.mp3
```

## Outils TTS recommandés

1. **ElevenLabs** — Voix "Adam" en français, naturelle et expressive
2. **Coqui TTS** — Open source, bonne qualité
3. **Piper TTS** — Gratuit, local, modèles français disponibles
4. **Google Cloud TTS** — Voix WaveNet fr-CA

## Paramètres suggérés

- **Vitesse**: Légèrement plus lent que normal (0.9x)
- **Ton**: Conversationnel, pas trop formel
- **Pauses**: 0.5s entre les phrases principales
