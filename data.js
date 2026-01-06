/**
 * Portfolio Data
 * Edit this file to populate your timeline.
 */

const PORTFOLIO_DATA = {
  meta: {
    name: "Ismaël Moreau",
    tagline: "Tables have turned.",
    contact: {
      email: "your.email@example.com",
      phone: "+1 XXX XXX XXXX"
    },
    github: "ismaelMoreau"
  },
  timeline: [
    {
      period: "2024",
      context: {
        type: "education",
        title: "AEC Intelligence Artificielle",
        place: "Cégep de Ste-Foy",
        narrative: "Where orchestrating AI became second nature."
      },
      projects: [
        {
          name: "Project Name",
          repo: "ismaelMoreau/project-repo",
          video: "videos/project-demo.mp4",
          oneLiner: "One sentence describing what this project does.",
          tech: ["Python", "PyTorch", "FastAPI"],
          link: null
        }
      ],
      skills: ["Machine Learning", "Deep Learning", "MLOps"]
    },
    {
      period: "2023",
      context: {
        type: "work",
        title: "Your Role Here",
        place: "Company Name",
        narrative: "What this chapter meant to your journey."
      },
      projects: [
        {
          name: "Side Project",
          repo: null,
          video: "videos/side-project.mp4",
          oneLiner: "A personal project that emerged from this period.",
          tech: ["Unity", "C#"],
          link: "https://example.com/demo"
        }
      ],
      skills: ["DevOps", "CI/CD", "Docker"]
    }
  ]
};
