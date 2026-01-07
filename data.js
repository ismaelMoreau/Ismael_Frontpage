/**
 * Portfolio Data — Arc Narratif en 4 Actes
 * "Du programmeur qui code tout à l'orchestrateur qui dirige des agents"
 */

// ═══════════════════════════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════════════════════════
const TRANSLATIONS = {
  ui: {
    fr: {
      tagline: "Du code qui tourne au code qui pense.",
      tourButton: "Visite guidée",
      scrollHint: "scroll pour descendre",
      personalProject: "projet perso",
      endTimeline: "// fin de la timeline",
      footerMessage: "Tables have turned.",
      heroMeta: "Ce portfolio: ~6h30 de développement du premier push au dernier moins deux heures de souper en famille"
    },
    en: {
      tagline: "From code that runs to code that thinks.",
      tourButton: "Guided tour",
      scrollHint: "scroll to descend",
      personalProject: "personal project",
      endTimeline: "// end of timeline",
      footerMessage: "Tables have turned.",
      heroMeta: "This portfolio: ~6h30 of development from first push to last minus two hours of family dinner"
    }
  },
  eras: {
    fr: {
      fondations: "Les Fondations",
      echelle: "L'Échelle",
      creatif: "Le Créatif",
      sqdc: "L'Initiative SQDC",
      multiplicateur: "Le Multiplicateur"
    },
    en: {
      fondations: "The Foundations",
      echelle: "Scaling Up",
      creatif: "The Creative",
      sqdc: "The SQDC Initiative",
      multiplicateur: "The Multiplier"
    }
  },
  // Timeline narratives and titles
  timeline: {
    en: [
      // 0: Fondations - Blockchain Lab
      {
        title: "Full Stack Developer",
        narrative: "My entry into the field. No framework, no safety net. Linux, raw JavaScript, web interfaces that talk directly to machines. I learned that code isn't just code — it's a living system that must stand on its own."
      },
      // 1: Fondations - AEC
      {
        title: "AEC Programmer Analyst",
        narrative: "Formalizing what I had learned in the field. Databases, functional analysis, methodologies. Turning instinct into method."
      },
      // 2: Échelle - Desjardins
      {
        title: "Cloud DevOps Specialist",
        narrative: "Desjardins. Not a startup — a financial institution with strict security requirements. VM clusters handling millions in insurance. CI/CD pipelines with security gates, Azure IAM management, deployment compliance. Secure cloud became my playground."
      },
      // 3: Créatif - Sarbakan
      {
        title: "R&D Backend Programmer",
        narrative: "Game dev. A world where code must be beautiful AND fast. Docker on dedicated server, GitLab CI/CD, but most importantly: Unity, C#, and my first exposure to data-oriented programming. Distributed systems from DevOps meet real-time game development."
      },
      // 4: Créatif - SQDC Conseiller
      {
        title: "Advisor + Solo Dev",
        narrative: "A strategic choice. By day, I advise customers and understand their needs on the floor. By night, I code solutions. SQDC taught me what no tutorial teaches: the real pain points of retail, what works in practice, and how to translate field needs into concrete tools."
      },
      // 5: SQDC Initiative
      {
        title: "The SQDC Initiative",
        narrative: "A simple job that leaves me energy to code at night. And that's exactly what I do. The SQDC Products Portal, I built it quickly — a tool to make advisors' daily work easier. While I work during the day, I build at night."
      },
      // 6: Multiplicateur - AEC IA
      {
        title: "AEC Artificial Intelligence",
        narrative: "The turning point. Everything I learned — systems, pipelines, game dev — converges. AI isn't a new skill, it's a multiplier of everything I already know how to do."
      },
      // 7: Multiplicateur - Orchestrateur
      {
        title: "The Orchestrator",
        narrative: "I don't code everything anymore — I orchestrate. Local LLMs, collaborating agents, content-generating systems. Eight years of foundations to get here: from a programmer typing code to an architect directing agents."
      }
    ]
  },
  // Project one-liners
  projects: {
    en: {
      "P5 RPG": "The beginning of my passion for AI: autonomous companions driven by reinforcement learning. RPG prototype developed before Sarbakan.",
      "Spritesheet Splitter": "Automated pipeline for extracting sprites and generating GIF animations. Batch image processing with PIL.",
      "500 Tops Rolling Stone": "Extraction and analysis of a 500-song dataset. Data cleaning, statistical visualizations.",
      "SQDC Products Portal": "Web app for in-store product lookup. Indica/Sativa/Hybrid filtering, editable product sheets, print lists. Designed to make advisors' daily work easier.",
      "SQDC Products DB": "MongoDB database of SQDC products. Data modeling, aggregation queries, JSON export. The Portal's backend.",
      "GamePrototype ECS-DRL": "Deep Reinforcement Learning in pure C#, without ML-Agents. Enemies that learn while you play.",
      "VR Boids": "Emergent behaviors in VR. The Boids algorithm as a first step towards multi-agent systems.",
      "Gmail Tool Isabel": "Gmail sorting and archiving automation via API. OAuth 2.0 authentication, custom filters, batch processing.",
      "Marie 2.0": "Dual-brain AI: two specialized LLMs (emotional + logical) thinking together. Neo4j memory, prompt chains, cognitive emergence.",
      "Survivor-LLM": "Local LLM multi-agent system orchestrating autonomous companions in a 3D roguelike. Each NPC reasons, plans, and collaborates via specialized agents.",
      "Dota 2 MCP Server": "MCP (Model Context Protocol) server exposing the Dota 2 API. Discord bot with replay analysis and TTS voice coaching.",
      "PersonnaNpc": "Complete pipeline: LLM fine-tuning (DeepSeek) → TTS (Piper) → facial animation (Audio2Face) → Unity. NPCs with a soul.",
      "AwooSurvivor 3D": "3D isometric survivor with dating sim. ECS architecture optimized for hundreds of simultaneous entities.",
      "AwooSurvivor 2D": "2D survivor prototype. Rapid iteration to validate mechanics before the 3D version."
    }
  }
};

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
      years: '2022',
      accent: '#a855f7',
      audioFile: 'audio/act3.mp3'
    },
    sqdc: {
      name: "L'Initiative SQDC",
      years: '2023-2025',
      accent: '#22c55e',
      audioFile: 'audio/act3-5.mp3'
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
        narrative: "Mon entrée dans le métier. Pas de framework, pas de filet. Linux, JavaScript brut, interfaces web qui parlent directement aux machines. J'apprends que le code n'est pas juste du code — c'est un système qui vit, qui respire, qui doit tenir debout tout seul."
      },
      projects: [],
      skills: ["Linux", "JavaScript", "HTML/CSS", "MongoDB", "Git", "Web Interfaces", "Systèmes Distribués"]
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
        narrative: "Desjardins. Pas une startup — une institution financière avec des exigences de sécurité strictes. Des clusters de VM qui gèrent des millions en assurance. Pipelines CI/CD avec gates de sécurité, gestion IAM Azure, conformité des déploiements. Le cloud sécurisé devient mon terrain de jeu."
      },
      projects: [],
      skills: ["Azure", "PowerShell", "Ansible", "Hadoop", "VM Clusters", "CI/CD Pipelines", "Sécurité Cloud", "IAM"]
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
        narrative: "Game dev. Un monde où le code doit être beau ET rapide. Docker sur serveur dédié, GitLab CI/CD, mais surtout: Unity, C#, et la première exposition à la programmation orientée données. Les systèmes distribués du DevOps rencontrent les systèmes temps réel du jeu vidéo."
      },
      projects: [
        {
          name: "P5 RPG",
          repo: "ismaelMoreau/P5_rpg",
          videos: ["videos/P5_rpg-bubble.mkv", "videos/P5_rpg-GameOver.mkv"],
          oneLiner: "Le début de mon engouement pour l'IA: compagnons autonomes pilotés par renforcement. Prototype RPG développé avant Sarbakan.",
          tech: ["JavaScript", "p5.js", "Canvas", "Reinforcement Learning", "AI Companions"],
          isPersonal: true,
          link: null
        }
      ],
      skills: ["Unity", "C#", "React", "Docker", "Git", "GitLab CI/CD", "ECS Patterns", "Agile"]
    },
    {
      period: "2023",
      era: "creatif",
      context: {
        type: "work",
        title: "Conseiller + Dev solo",
        place: "SQDC",
        narrative: "Un choix stratégique. Le jour, je conseille les clients et je comprends leurs besoins sur le plancher. Le soir, je code des solutions. La SQDC m'a appris ce qu'aucun tutoriel n'enseigne: les vrais pain points du commerce de détail, ce qui fonctionne en pratique, et comment traduire les besoins terrain en outils concrets."
      },
      projects: [
        {
          name: "Spritesheet Splitter",
          repo: "ismaelMoreau/spritesheetspliter",
          oneLiner: "Pipeline automatisé pour extraire des sprites et générer des animations GIF. Traitement d'image batch avec PIL.",
          tech: ["Python", "PIL/Pillow", "Jupyter"],
          isPersonal: true,
          link: null
        },
        {
          name: "500 Tops Rolling Stone",
          repo: "ismaelMoreau/500tops_rollings_stone_song",
          oneLiner: "Extraction et analyse d'un dataset de 500 chansons. Nettoyage de données, visualisations statistiques.",
          tech: ["Python", "Pandas", "Data Analysis"],
          isPersonal: true,
          link: null
        }
      ],
      skills: ["Python", "Image Processing", "Tool Development", "Commerce de Détail", "Analyse Besoins", "Connaissance Produits"]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ACTE 3.5: L'INITIATIVE SQDC (2023-2025)
    // "Quand l'expérience terrain génère des outils concrets"
    // ═══════════════════════════════════════════════════════════════════════════
    {
      period: "2023-2025",
      era: "sqdc",
      context: {
        type: "work",
        title: "L'Initiative SQDC",
        place: "SQDC",
        narrative: "Un travail simple qui me laisse l'énergie de coder le soir. Et c'est exactement ce que je fais. Le SQDC Products Portal, je l'ai monté rapidement — un outil pour faciliter le quotidien des conseillers. Pendant que je travaille le jour, je construis la nuit."
      },
      projects: [
        {
          name: "SQDC Products Portal",
          repo: "ismaelMoreau/sqdcProductsPortal",
          oneLiner: "Application web pour consultation produits en succursale. Filtrage Indica/Sativa/Hybride, fiches modifiables, listes d'impression. Conçu pour faciliter le quotidien des conseillers.",
          tech: ["JavaScript ES6+", "HTML5", "CSS3", "LocalStorage"],
          client: "Outil interne SQDC",
          link: "https://ismaelmoreau.github.io/sqdcProductsPortal/"
        },
        {
          name: "SQDC Products DB",
          repo: "ismaelMoreau/sqdc-personal-bd",
          oneLiner: "Base de données MongoDB des produits SQDC. Modélisation de données, requêtes d'agrégation, export JSON. Le backend du Portal.",
          tech: ["MongoDB", "Data Modeling", "JSON", "Aggregation Pipelines"],
          isPersonal: true,
          link: null
        }
      ],
      skills: ["Full Stack", "UX/UI", "Besoins Métier", "Prototypage Rapide", "MongoDB", "JavaScript ES6+"]
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
          isPersonal: true,
          link: null
        },
        {
          name: "VR Boids",
          isPrivate: true,
          oneLiner: "Comportements émergents en VR. L'algorithme Boids comme premier pas vers les systèmes multi-agents.",
          tech: ["Unity", "C#", "XR Toolkit", "Boids Algorithm"],
          isPersonal: true,
          link: null
        },
        {
          name: "Gmail Tool Isabel",
          repo: "ismaelMoreau/gmail_tool_isabel",
          oneLiner: "Automatisation du tri et archivage Gmail via API. Authentification OAuth 2.0, filtres personnalisés, traitement batch.",
          tech: ["Python", "Gmail API", "OAuth 2.0", "Jupyter"],
          client: "Mandat client",
          link: null
        }
      ],
      skills: ["Machine Learning", "Deep Learning", "PyTorch", "MongoDB", "MLOps", "Reinforcement Learning"]
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
          isPersonal: true,
          link: null
        },
        {
          name: "Survivor-LLM",
          isPrivate: true,
          oneLiner: "Système multi-agents LLM locaux orchestrant des compagnons autonomes dans un roguelike 3D. Chaque NPC raisonne, planifie et collabore via des agents spécialisés.",
          tech: ["Unity 6", "C#", "ECS/DOTS", "LLMUnity", "Ollama", "Multi-Agent Systems"],
          isPersonal: true,
          link: null
        },
        {
          name: "Dota 2 MCP Server",
          repo: "ismaelMoreau/Dota_2_MCP_Server_",
          oneLiner: "Serveur MCP (Model Context Protocol) exposant l'API Dota 2. Bot Discord avec analyse de replays et coaching vocal TTS.",
          tech: ["Python", "FastAPI", "Discord.py", "Docker", "MCP Protocol"],
          isPersonal: true,
          link: null
        },
        {
          name: "PersonnaNpc",
          repo: "ismaelMoreau/PersonnaNpc",
          video: "videos/PersonnaNpc-firstTest.mkv",
          oneLiner: "Pipeline complet: fine-tuning LLM (DeepSeek) → TTS (Piper) → animation faciale (Audio2Face) → Unity. Des NPC avec une âme.",
          tech: ["Python", "DeepSeek", "Piper TTS", "NVIDIA Audio2Face", "Unity"],
          isPersonal: true,
          link: null
        },
        {
          name: "AwooSurvivor 3D",
          isPrivate: true,
          video: "videos/AWOOSURVIVOR 3D (2025).mp4",
          oneLiner: "Survivor 3D isométrique avec dating sim. Architecture ECS optimisée pour des centaines d'entités simultanées.",
          tech: ["Unity 6", "C#", "ECS 1.4", "Rukhanka Animation", "HLSL"],
          client: "Awootoys",
          link: null
        },
        {
          name: "AwooSurvivor 2D",
          isPrivate: true,
          oneLiner: "Prototype 2D du survivor. Itération rapide pour valider les mécaniques avant la version 3D.",
          tech: ["Unity", "C#", "ECS 1.4", "Physics 2D"],
          client: "Awootoys",
          link: null
        }
      ],
      skills: ["LLM Integration", "Context Engineering", "Multi-Agent Systems", "MCP Protocol", "Fine-tuning", "Neo4j"]
    }
  ]
};
