/**
 * Portfolio Data — Arc Narratif en 4 Actes
 * "Du programmeur qui code tout à l'orchestrateur qui dirige des agents"
 */

const PORTFOLIO_DATA = {
  meta: {
    name: "Ismaël Moreau",
    tagline: "Du code qui tourne au code qui pense.",
    contact: {
      email: "ism-moreau@outlook.com",
      phone: "(581) 988-4982"
    },
    github: "ismaelMoreau"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ERAS: Visual themes that evolve with scroll
  // ═══════════════════════════════════════════════════════════════════════════
  eras: {
    fondations: {
      name: 'Les Fondations',
      years: '2017-2019',
      accent: '#00ffaa',
      audioFile: 'audio/act1.mp3'
    },
    echelle: {
      name: "L'Échelle",
      years: '2019-2021',
      accent: '#00d4ff',
      audioFile: 'audio/act2.mp3'
    },
    creatif: {
      name: 'Le Créatif',
      years: '2022-2023',
      accent: '#a855f7',
      audioFile: 'audio/act3.mp3'
    },
    multiplicateur: {
      name: 'Le Multiplicateur',
      years: '2024-2025',
      accent: '#00ffaa',
      audioFile: 'audio/act4.mp3'
    }
  },

  // Audio tour configuration
  audioTour: {
    intro: 'audio/intro.mp3',
    outro: 'audio/outro.mp3'
  },

  timeline: [
    // ═══════════════════════════════════════════════════════════════════════════
    // ACTE 1: LES FONDATIONS (2017-2019)
    // "J'apprends à construire des systèmes"
    // ═══════════════════════════════════════════════════════════════════════════
    {
      period: "2017-2019",
      era: "fondations",
      context: {
        type: "work",
        title: "Développeur Full Stack",
        place: "Laboratoire Blockchain Inc.",
        narrative: "Ma première vraie job. Pas de framework, pas de filet. Linux, JavaScript brut, interfaces web qui parlent directement aux machines. J'apprends que le code n'est pas juste du code — c'est un système qui vit, qui respire, qui doit tenir debout tout seul."
      },
      projects: [],
      skills: ["Linux", "JavaScript", "HTML/CSS", "Web Interfaces", "Systèmes Distribués"]
    },
    {
      period: "2019",
      era: "fondations",
      context: {
        type: "education",
        title: "AEC Programmeur Analyste",
        place: "Cégep de Ste-Foy",
        narrative: "Formaliser ce que j'avais appris sur le terrain. Bases de données, analyse fonctionnelle, méthodologies. Transformer l'instinct en méthode."
      },
      projects: [],
      skills: ["SQL", "Analyse Fonctionnelle", "Conception BD", "Méthodologies"]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ACTE 2: L'ÉCHELLE (2019-2021)
    // "J'apprends à opérer à grande échelle"
    // ═══════════════════════════════════════════════════════════════════════════
    {
      period: "2019-2021",
      era: "echelle",
      context: {
        type: "work",
        title: "Spécialiste DevOps Infonuagique",
        place: "Desjardins Assurance",
        narrative: "Desjardins. Pas une startup — une institution. Des clusters de VM qui gèrent des millions en assurance. J'apprends que mon code ne suffit plus: il faut des pipelines, de l'automatisation, des systèmes qui se déploient tout seuls. Le cloud devient mon terrain de jeu."
      },
      projects: [],
      skills: ["Azure", "PowerShell", "Ansible", "Hadoop", "VM Clusters", "CI/CD Pipelines"]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ACTE 3: LE CRÉATIF (2022-2023)
    // "J'applique mes skills à des domaines créatifs"
    // ═══════════════════════════════════════════════════════════════════════════
    {
      period: "2022",
      era: "creatif",
      context: {
        type: "work",
        title: "Programmeur R&D Backend",
        place: "Sarbakan",
        narrative: "Game dev. Un monde où le code doit être beau ET rapide. Docker sur serveur dédié, GitLab CI/CD, mais surtout: Unity, C#, et la première exposition au ECS. Les systèmes distribués du DevOps rencontrent les systèmes temps réel du jeu vidéo."
      },
      projects: [
        {
          name: "P5 RPG - Game Over",
          repo: "ismaelMoreau/P5_rpg",
          video: "videos/P5_rpg-GameOver.mkv",
          oneLiner: "Mon premier jeu. Du JavaScript brut pour comprendre les boucles de gameplay.",
          tech: ["p5.js", "JavaScript"],
          link: null
        },
        {
          name: "P5 RPG - Bubble",
          repo: "ismaelMoreau/P5_rpg",
          video: "videos/P5_rpg-bubble.mkv",
          oneLiner: "Variante bubble du jeu. Exploration des mécaniques de collision et spawning.",
          tech: ["p5.js", "JavaScript"],
          link: null
        }
      ],
      skills: ["Unity", "C#", "Docker", "GitLab CI/CD", "ECS Patterns", "Agile"]
    },
    {
      period: "2023",
      era: "creatif",
      context: {
        type: "work",
        title: "Conseiller + Dev solo",
        place: "SQDC",
        narrative: "Un choix délibéré. Moins de pression, plus de temps pour construire. Le jour je conseille, le soir je code. La SQDC devient mon labo: je comprends les besoins terrain et je construis des outils pour y répondre."
      },
      projects: [
        {
          name: "Spritesheet Splitter",
          repo: "ismaelMoreau/spritesheetspliter",
          oneLiner: "Outil Python pour découper des spritesheets et créer des GIFs. Premiers pas en traitement d'image.",
          tech: ["Python", "PIL/Pillow", "Jupyter"],
          link: null
        },
        {
          name: "500 Tops Rolling Stone",
          repo: "ismaelMoreau/500tops_rollings_stone_song",
          oneLiner: "Analyse de données musicales. Explorer des datasets pour le fun.",
          tech: ["Python", "Data Analysis"],
          link: null
        }
      ],
      skills: ["Python", "Image Processing", "Tool Development", "Connaissance Produits"]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ACTE 4: LE MULTIPLICATEUR (2024+)
    // "L'IA devient mon levier"
    // ═══════════════════════════════════════════════════════════════════════════
    {
      period: "2024",
      era: "multiplicateur",
      context: {
        type: "education",
        title: "AEC Intelligence Artificielle",
        place: "Cégep de Ste-Foy",
        narrative: "Le turning point. Tout ce que j'ai appris — les systèmes, les pipelines, le game dev — converge. L'IA n'est pas une nouvelle compétence, c'est un multiplicateur de tout ce que je sais déjà faire."
      },
      projects: [
        {
          name: "GamePrototype ECS-DRL",
          repo: "ismaelMoreau/GamePrototype-UnityECS-DRL",
          video: "videos/GamePrototype-ECS-DRL-demo.mp4",
          oneLiner: "Deep Reinforcement Learning en C# pur, sans ML-Agents. Des ennemis qui apprennent pendant qu'on joue.",
          tech: ["Unity 6", "C#", "ECS/DOTS", "Reinforcement Learning"],
          link: null
        },
        {
          name: "VR Boids",
          isPrivate: true,
          oneLiner: "Comportements émergents en VR. L'algorithme Boids comme premier pas vers les systèmes multi-agents.",
          tech: ["Unity", "C#", "XR Toolkit", "Boids Algorithm"],
          link: null
        },
        {
          name: "Gmail Tool Isabel",
          repo: "ismaelMoreau/gmail_tool_isabel",
          oneLiner: "Automatisation Gmail avec Jupyter. Python + APIs = le début de l'orchestration.",
          tech: ["Python", "Gmail API", "OAuth 2.0", "Jupyter"],
          link: null
        },
        {
          name: "SQDC Personal BD",
          repo: "ismaelMoreau/sqdc-personal-bd",
          oneLiner: "Base de données personnelle des produits SQDC. Structurer mes connaissances terrain.",
          tech: ["Data Structuring"],
          link: null
        },
        {
          name: "Cours-A61",
          repo: "ismaelMoreau/Cours-A61",
          oneLiner: "Travaux de mise en production. DevOps, CI/CD, environnements.",
          tech: ["DevOps", "CI/CD", "Déploiement"],
          link: null
        }
      ],
      skills: ["Machine Learning", "Deep Learning", "PyTorch", "MLOps", "Reinforcement Learning"]
    },
    {
      period: "2025",
      era: "multiplicateur",
      context: {
        type: "personal",
        title: "L'Orchestrateur",
        place: null,
        narrative: "Je ne code plus tout — j'orchestre. Des LLM locaux, des agents qui collaborent, des systèmes qui génèrent du contenu. Huit ans de fondations pour arriver ici: du programmeur qui tape du code à l'architecte qui dirige des agents."
      },
      projects: [
        {
          name: "Marie 2.0",
          isPrivate: true,
          oneLiner: "Dual-brain AI: deux LLM spécialisés (émotionnel + logique) qui pensent ensemble. Mémoire Neo4j, prompt chains, émergence cognitive.",
          tech: ["Python", "Neo4j", "Docker", "Ollama", "Llama 3.1"],
          link: null
        },
        {
          name: "Survivor-LLM",
          isPrivate: true,
          oneLiner: "Roguelike 3D avec compagnons IA conversationnels. ECS haute performance + LLM local = dialogues émergents en temps réel.",
          tech: ["Unity 6", "C#", "ECS/DOTS", "LLMUnity", "Ollama"],
          link: null
        },
        {
          name: "Dota 2 MCP Server",
          repo: "ismaelMoreau/Dota_2_MCP_Server_",
          oneLiner: "Model Context Protocol + bot Discord coach. L'IA qui analyse ta game et te conseille en temps réel via TTS.",
          tech: ["Python", "FastAPI", "Discord.py", "Docker", "MCP Protocol"],
          link: null
        },
        {
          name: "PersonnaNpc",
          repo: "ismaelMoreau/PersonnaNpc",
          video: "videos/PersonnaNpc-firstTest.mkv",
          oneLiner: "Pipeline complet: fine-tuning LLM (DeepSeek) → TTS (Piper) → animation faciale (Audio2Face) → Unity. Des NPC avec une âme.",
          tech: ["Python", "DeepSeek", "Piper TTS", "NVIDIA Audio2Face", "Unity"],
          link: null
        },
        {
          name: "SQDC Products Portal",
          repo: "ismaelMoreau/sqdcProductsPortal",
          oneLiner: "Application métier 100% vanilla JS pour la succursale. Parfois le meilleur framework, c'est pas de framework.",
          tech: ["JavaScript ES6+", "HTML5", "CSS3", "LocalStorage"],
          link: "https://ismaelmoreau.github.io/sqdcProductsPortal/"
        },
        {
          name: "AwooSurvivor 3D",
          isPrivate: true,
          video: "videos/AWOOSURVIVOR 3D (2025).mp4",
          oneLiner: "Vampire survivors-like 3D isométrique avec dating sim. ECS optimisé pour des centaines d'entités simultanées.",
          tech: ["Unity 6", "C#", "ECS 1.4", "Rukhanka Animation", "HLSL"],
          link: null
        },
        {
          name: "AwooSurvivor 2D",
          isPrivate: true,
          oneLiner: "Version 2D du survivor. Prototype qui a mené à la version 3D — l'itération comme méthode.",
          tech: ["Unity", "C#", "ECS 1.4", "Physics 2D"],
          link: null
        }
      ],
      skills: ["LLM Integration", "Prompt Engineering", "Multi-Agent Systems", "MCP Protocol", "Fine-tuning", "Neo4j"]
    }
  ]
};
