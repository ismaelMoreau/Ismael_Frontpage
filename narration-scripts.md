# Scripts de Narration — Visite Guidée Audio

Scripts pour générer les fichiers audio TTS. Chaque section dure environ 20-25 secondes.

---

## Intro (~15s)

> Salut. Moi c'est Ismaël.
> Ça fait huit ans que je construis des trucs avec du code.
> Des systèmes distribués, des jeux vidéo, des pipelines DevOps...
> Et maintenant, des agents IA qui agissent pour moi.
> Laisse-moi te montrer comment j'en suis arrivé là.

---

## Acte 1: Les Fondations (~24s)

> 2017. Ma première vraie job.
> Laboratoire Blockchain. Pas de React, pas de framework fancy.
> Du JavaScript brut, du Linux, MongoDB pour les données, et des interfaces qui parlent aux machines.
> C'est là que j'ai compris que le code, c'est pas juste des lignes sur un écran.
> C'est un système vivant qui doit tenir debout tout seul.

---

## Acte 2: L'Échelle (~24s)

> 2019. Desjardins Assurance.
> Pas une startup. Une institution.
> Des clusters de VM qui gèrent des millions en assurance.
> Soudainement, mon code seul suffisait plus.
> Fallait des pipelines, de l'automatisation, des systèmes qui se déploient tout seuls à travers dev, QA et Prod.
> Le cloud est devenu mon terrain de jeu.

---

## Acte 3: Le Créatif (~25s)

> 2022. Changement de cap. Sarbakan, un studio de jeux.
> Game dev. Un monde où le code doit être beau et rapide.
> Unity, C#, React, et ma première rencontre avec l'ECS.
> Les systèmes distribués du DevOps qui rencontrent les systèmes temps réel du jeu vidéo.
> Ensuite, la SQDC. Un choix stratégique.
> C'est là que j'ai compris les vrais besoins terrain. Ce que les conseillers vivent au quotidien, les outils qui manquent.

---

## Acte 4: Le Multiplicateur (~26s)

> 2024. Le turning point.
> AEC en Intelligence Artificielle. Mais c'était pas juste apprendre une nouvelle compétence.
> L'IA, c'est un multiplicateur de tout ce que je savais déjà faire.
> Deep Reinforcement Learning en C# pur. Des ennemis qui apprennent pendant qu'on joue.
> Des LLM locaux qui collaborent. MongoDB pour les données, Neo4j pour les relations.
> Je code plus tout. J'orchestre.

---

## Outro (~12s)

> Voilà. Huit ans résumés en quelques minutes.
> Du programmeur qui tape du code à l'architecte qui dirige des agents.
> Les tables ont tourné.
> Si tu veux jaser, mon email est juste là.

---

## Fichiers à générer

```
audio/
├── intro.mp3
├── act1-fondations.mp3
├── act2-echelle.mp3
├── act3-creatif.mp3
├── act4-multiplicateur.mp3
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
