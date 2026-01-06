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
  timeline: [
    // ═══════════════════════════════════════════════════════════════════════════
    // ACTE 1: LES FONDATIONS (2017-2019)
    // "J'apprends à construire des systèmes"
    // ═══════════════════════════════════════════════════════════════════════════
    {
      period: "2017-2019",
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
      context: {
        type: "work",
        title: "Programmeur R&D Backend",
        place: "Sarbakan",
        narrative: "Game dev. Un monde où le code doit être beau ET rapide. Docker sur serveur dédié, GitLab CI/CD, mais surtout: Unity, C#, et la première exposition au ECS. Les systèmes distribués du DevOps rencontrent les systèmes temps réel du jeu vidéo."
      },
      projects: [
        {
          name: "P5 RPG",
          repo: "ismaelMoreau/P5_rpg",
          video: null,
          oneLiner: "Mon premier jeu. Du JavaScript brut pour comprendre les boucles de gameplay.",
          tech: ["p5.js", "JavaScript"],
          link: null
        }
      ],
      skills: ["Unity", "C#", "Docker", "GitLab CI/CD", "ECS Patterns", "Agile"]
    },
    {
      period: "2023",
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
          video: null,
          oneLiner: "Outil Python pour découper des spritesheets et créer des GIFs. Premiers pas en traitement d'image.",
          tech: ["Python", "PIL/Pillow", "Jupyter"],
          link: null
        },
        {
          name: "500 Tops Rolling Stone",
          repo: "ismaelMoreau/500tops_rollings_stone_song",
          video: null,
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
          video: null,
          oneLiner: "Deep Reinforcement Learning en C# pur, sans ML-Agents. Des ennemis qui apprennent pendant qu'on joue.",
          tech: ["Unity 6", "C#", "ECS/DOTS", "Reinforcement Learning"],
          link: null
        },
        {
          name: "VR Boids",
          repo: null,
          video: null,
          oneLiner: "Comportements émergents en VR. L'algorithme Boids comme premier pas vers les systèmes multi-agents.",
          tech: ["Unity", "C#", "XR Toolkit", "Boids Algorithm"],
          link: null
        },
        {
          name: "Gmail Tool Isabel",
          repo: "ismaelMoreau/gmail_tool_isabel",
          video: null,
          oneLiner: "Automatisation Gmail avec Jupyter. Python + APIs = le début de l'orchestration.",
          tech: ["Python", "Gmail API", "OAuth 2.0", "Jupyter"],
          link: null
        },
        {
          name: "SQDC Personal BD",
          repo: "ismaelMoreau/sqdc-personal-bd",
          video: null,
          oneLiner: "Base de données personnelle des produits SQDC. Structurer mes connaissances terrain.",
          tech: ["Data Structuring"],
          link: null
        },
        {
          name: "Cours-A61",
          repo: "ismaelMoreau/Cours-A61",
          video: null,
          oneLiner: "Travaux de mise en production. DevOps, CI/CD, environnements.",
          tech: ["DevOps", "CI/CD", "Déploiement"],
          link: null
        }
      ],
      skills: ["Machine Learning", "Deep Learning", "PyTorch", "MLOps", "Reinforcement Learning"]
    },
    {
      period: "2025",
      context: {
        type: "personal",
        title: "L'Orchestrateur",
        place: null,
        narrative: "Je ne code plus tout — j'orchestre. Des LLM locaux, des agents qui collaborent, des systèmes qui génèrent du contenu. Huit ans de fondations pour arriver ici: du programmeur qui tape du code à l'architecte qui dirige des agents."
      },
      projects: [
        {
          name: "Marie 2.0",
          repo: null,
          video: null,
          oneLiner: "Dual-brain AI: deux LLM spécialisés (émotionnel + logique) qui pensent ensemble. Mémoire Neo4j, prompt chains, émergence cognitive.",
          tech: ["Python", "Neo4j", "Docker", "Ollama", "Llama 3.1"],
          link: null
        },
        {
          name: "Survivor-LLM",
          repo: null,
          video: null,
          oneLiner: "Roguelike 3D avec compagnons IA conversationnels. ECS haute performance + LLM local = dialogues émergents en temps réel.",
          tech: ["Unity 6", "C#", "ECS/DOTS", "LLMUnity", "Ollama"],
          link: null
        },
        {
          name: "Dota 2 MCP Server",
          repo: "ismaelMoreau/Dota_2_MCP_Server_",
          video: null,
          oneLiner: "Model Context Protocol + bot Discord coach. L'IA qui analyse ta game et te conseille en temps réel via TTS.",
          tech: ["Python", "FastAPI", "Discord.py", "Docker", "MCP Protocol"],
          link: "https://github.com/ismaelMoreau/Dota_2_MCP_Server_"
        },
        {
          name: "PersonnaNpc",
          repo: "ismaelMoreau/PersonnaNpc",
          video: null,
          oneLiner: "Pipeline complet: fine-tuning LLM (DeepSeek) → TTS (Piper) → animation faciale (Audio2Face) → Unity. Des NPC avec une âme.",
          tech: ["Python", "DeepSeek", "Piper TTS", "NVIDIA Audio2Face", "Unity"],
          link: null
        },
        {
          name: "SQDC Products Portal",
          repo: "ismaelMoreau/sqdcProductsPortal",
          video: null,
          oneLiner: "Application métier 100% vanilla JS pour la succursale. Parfois le meilleur framework, c'est pas de framework.",
          tech: ["JavaScript ES6+", "HTML5", "CSS3", "LocalStorage"],
          link: "https://ismaelmoreau.github.io/sqdcProductsPortal/"
        },
        {
          name: "AwooSurvivor 3D",
          repo: null,
          video: null,
          oneLiner: "Vampire survivors-like 3D isométrique avec dating sim. ECS optimisé pour des centaines d'entités simultanées.",
          tech: ["Unity 6", "C#", "ECS 1.4", "Rukhanka Animation", "HLSL"],
          link: null
        },
        {
          name: "AwooSurvivor 2D",
          repo: null,
          video: null,
          oneLiner: "Version 2D du survivor. Prototype qui a mené à la version 3D — l'itération comme méthode.",
          tech: ["Unity", "C#", "ECS 1.4", "Physics 2D"],
          link: null
        }
      ],
      skills: ["LLM Integration", "Prompt Engineering", "Multi-Agent Systems", "MCP Protocol", "Fine-tuning", "Neo4j"]
    }
  ]
};
