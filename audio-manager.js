/**
 * Audio Tour Manager
 * Handles guided tour narration with sync to scroll position
 */

(function() {
  'use strict';

  // Raw subtitle text for each section (timestamps calculated dynamically)
  const SUBTITLE_TEXTS = {
    fr: {
      intro: [
        "Salut. Moi c'est Ismaël.",
        "Ça fait huit ans que je construis des trucs avec du code.",
        "Des systèmes distribués, des jeux vidéo, des pipelines DevOps...",
        "Et maintenant, des agents IA qui travaillent pour moi.",
        "Laisse-moi te montrer comment j'en suis arrivé là."
      ],
      fondations: [
        "2017. Mon entrée dans le métier.",
        "Laboratoire Blockchain. Pas de React, pas de framework fancy.",
        "Du JavaScript brut, du Linux, MongoDB pour les données, et des interfaces qui parlent aux machines.",
        "C'est là que j'ai compris que le code, c'est pas juste des lignes sur un écran.",
        "C'est un système vivant qui doit tenir debout tout seul."
      ],
      echelle: [
        "2019. Desjardins Assurance.",
        "Pas une startup. Une institution financière avec des exigences de sécurité strictes.",
        "Des clusters de VM qui gèrent des millions en assurance.",
        "Soudainement, mon code seul suffisait plus.",
        "Fallait des pipelines sécurisés, de l'automatisation, des systèmes qui se déploient tout seuls à travers dev, QA et Prod.",
        "Gestion IAM Azure, gates de sécurité, conformité. Le cloud sécurisé est devenu mon terrain de jeu."
      ],
      creatif: [
        "2022. Changement de cap.",
        "Sarbakan, un studio de jeux vidéo.",
        "Un monde où le code doit être beau et rapide en même temps.",
        "Unity, C#, React. Ma première rencontre avec la programmation orientée données.",
        "Après le cloud d'entreprise, je découvre le temps réel du jeu vidéo."
      ],
      sqdc: [
        "Puis la SQDC.",
        "Un travail simple qui me laisse l'énergie de coder le soir.",
        "Et c'est exactement ce que je fais.",
        "Le SQDC Products Portal, je l'ai monté rapidement — un outil pour les conseillers.",
        "Pendant que je travaille le jour, je construis la nuit."
      ],
      multiplicateur: [
        "2024. Le tournant décisif.",
        "AEC en Intelligence Artificielle. Mais c'était pas juste apprendre une nouvelle compétence.",
        "L'IA, c'est un multiplicateur de tout ce que je savais déjà faire.",
        "Mes projets le prouvent.",
        "Apprentissage par renforcement profond en C# pur. Des ennemis qui apprennent pendant qu'on joue.",
        "Des grands modèles de langage locaux qui collaborent. MongoDB pour les données, Neo4j pour les relations.",
        "Aujourd'hui, je ne code plus tout seul. J'orchestre des agents qui codent pour moi."
      ],
      outro: [
        "Voilà. Huit ans résumés en quelques minutes.",
        "Du programmeur qui tape du code à l'architecte qui dirige des agents.",
        "Les tables ont tourné.",
        "Si tu veux jaser, mon email est juste là."
      ]
    },
    en: {
      intro: [
        "Hey. I'm Ismaël.",
        "I've been building things with code for eight years now.",
        "Distributed systems, video games, DevOps pipelines...",
        "And now, AI agents that work for me.",
        "Let me show you how I got here."
      ],
      fondations: [
        "2017. My entry into the field.",
        "Blockchain Lab. No React, no fancy frameworks.",
        "Raw JavaScript, Linux, MongoDB for data, and web interfaces that talk directly to machines.",
        "That's where I learned that code isn't just lines on a screen.",
        "It's a living system that needs to stand on its own."
      ],
      echelle: [
        "2019. Desjardins Insurance.",
        "Not a startup. A financial institution with strict security requirements.",
        "Clusters of virtual machines handling millions in insurance.",
        "Suddenly, my code alone wasn't enough anymore.",
        "I needed secure pipelines, automation, systems that deploy themselves across dev, QA, and Prod.",
        "Azure IAM management, security gates, compliance. Secure cloud became my playground."
      ],
      creatif: [
        "2022. Change of direction.",
        "Sarbakan, a video game studio.",
        "A world where code has to be beautiful and fast at the same time.",
        "Unity, C#, React. My first encounter with data-oriented programming.",
        "Distributed systems from DevOps meeting real-time game development."
      ],
      sqdc: [
        "Then SQDC.",
        "A simple job that leaves me energy to code at night.",
        "And that's exactly what I do.",
        "The SQDC Products Portal, I built it quickly — a tool for the advisors.",
        "While I work during the day, I build at night."
      ],
      multiplicateur: [
        "2024. The decisive turning point.",
        "AEC in Artificial Intelligence. But it wasn't just learning a new skill.",
        "AI is a multiplier of everything I already knew how to do.",
        "My projects prove it.",
        "Deep reinforcement learning in pure C#. Enemies that learn while you play.",
        "Local large language models that collaborate. MongoDB for data, Neo4j for relationships.",
        "Today, I don't code alone anymore. I orchestrate agents that code for me."
      ],
      outro: [
        "There you go. Eight years summarized in a few minutes.",
        "From a programmer typing code to an architect directing agents.",
        "The tables have turned.",
        "If you want to chat, my email is right there."
      ]
    }
  };

  // Current language state (synced from app.js)
  let currentLang = 'fr';

  // Calculate word count for proportional timing
  function getWordCount(text) {
    return text.split(/\s+/).length;
  }

  // Build subtitles dynamically based on actual audio duration
  // Distributes time proportionally based on word count
  function buildSubtitlesForDuration(texts, audioDuration) {
    const subs = [];

    // Calculate total words
    const wordCounts = texts.map(getWordCount);
    const totalWords = wordCounts.reduce((a, b) => a + b, 0);

    // Reserve time for start delay and gaps between lines
    const startDelay = 0.3;
    const gapPerLine = 0.15;
    const totalGaps = gapPerLine * (texts.length - 1);
    const availableTime = audioDuration - startDelay - totalGaps;

    let currentTime = startDelay;

    texts.forEach((text, i) => {
      // Duration proportional to word count
      const proportion = wordCounts[i] / totalWords;
      const duration = availableTime * proportion;

      subs.push({
        start: currentTime,
        end: currentTime + duration,
        text: text
      });

      currentTime += duration + gapPerLine;
    });

    return subs;
  }

  // Cache for dynamically calculated subtitles per section
  const DYNAMIC_SUBTITLES = {};

  class AudioManager {
    constructor() {
      this.currentAudio = null;
      this.currentSection = null;
      this.isActive = false;
      this.isPaused = false;
      this.isMuted = false;
      this.sectionQueue = ['intro', 'fondations', 'echelle', 'creatif', 'sqdc', 'multiplicateur', 'outro'];
      this.currentQueueIndex = 0;

      // DOM elements
      this.controls = document.getElementById('audioControls');
      this.playPauseBtn = document.getElementById('audioPlayPause');
      this.muteBtn = document.getElementById('audioMute');
      this.closeBtn = document.getElementById('audioClose');
      this.progressBar = document.getElementById('audioProgressBar');
      this.subtitleEl = document.getElementById('audioSubtitle');

      this.bindEvents();
    }

    bindEvents() {
      if (this.playPauseBtn) {
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
      }

      if (this.muteBtn) {
        this.muteBtn.addEventListener('click', () => this.toggleMute());
      }

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.stop());
      }

      // Listen for era changes from app.js
      // NOTE: We no longer skip or change audio based on scroll
      // The highlight stays on the current AUDIO section, not scroll position
      document.addEventListener('eraChanged', () => {
        // Don't change highlight based on scroll - keep it on current audio section
        // highlightActiveNode is called in playSection() when audio changes
      });
    }

    start() {
      this.isActive = true;
      this.isPaused = false;
      this.currentQueueIndex = 0;

      if (this.controls) {
        this.controls.classList.add('active');
        this.controls.classList.remove('paused');
      }

      this.playSection('intro');
      // Auto-scroll is now handled by highlightActiveNode() for each section
    }

    playSection(sectionId) {
      if (this.currentSection === sectionId && this.currentAudio && !this.currentAudio.paused) {
        return;
      }

      // Fade out current audio
      if (this.currentAudio) {
        this.fadeOut(this.currentAudio);
      }

      this.currentSection = sectionId;

      // Get audio source (with language suffix for English)
      let src;
      if (sectionId === 'intro') {
        src = PORTFOLIO_DATA.audioTour?.intro;
        // Add language suffix for English (if file exists)
        if (currentLang === 'en') {
          src = src?.replace('.mp3', '-en.mp3');
        }
      } else if (sectionId === 'outro') {
        src = PORTFOLIO_DATA.audioTour?.outro;
        if (currentLang === 'en') {
          src = src?.replace('.mp3', '-en.mp3');
        }
      } else if (PORTFOLIO_DATA.eras && PORTFOLIO_DATA.eras[sectionId]) {
        src = PORTFOLIO_DATA.eras[sectionId].audioFile;
        if (currentLang === 'en') {
          src = src?.replace('.mp3', '-en.mp3');
        }
      }

      if (!src) {
        console.warn(`No audio file found for section: ${sectionId}`);
        this.onSectionEnd();
        return;
      }

      this.currentAudio = new Audio(src);
      this.currentAudio.volume = this.isMuted ? 0 : 0.8;

      this.currentAudio.addEventListener('timeupdate', () => {
        this.updateProgress();
        this.updateSubtitle();
      });

      this.currentAudio.addEventListener('ended', () => {
        this.onSectionEnd();
      });

      this.currentAudio.addEventListener('error', (e) => {
        // If English audio fails, fallback to French
        if (currentLang === 'en' && src.includes('-en.mp3')) {
          console.warn(`English audio not found for ${sectionId}, falling back to French`);
          const frenchSrc = src.replace('-en.mp3', '.mp3');
          this.currentAudio = new Audio(frenchSrc);
          this.currentAudio.volume = this.isMuted ? 0 : 0.8;
          this.currentAudio.addEventListener('timeupdate', () => {
            this.updateProgress();
            this.updateSubtitle();
          });
          this.currentAudio.addEventListener('ended', () => this.onSectionEnd());
          this.currentAudio.addEventListener('loadedmetadata', () => {
            const duration = this.currentAudio.duration;
            const texts = SUBTITLE_TEXTS[currentLang]?.[sectionId];
            if (texts && duration && isFinite(duration)) {
              const cacheKey = `${currentLang}_${sectionId}`;
              DYNAMIC_SUBTITLES[cacheKey] = buildSubtitlesForDuration(texts, duration);
            }
          });
          this.fadeIn(this.currentAudio);
        } else {
          console.warn(`Audio error for ${sectionId}:`, e);
          this.onSectionEnd();
        }
      });

      // Calculate subtitles based on actual audio duration when metadata loads
      this.currentAudio.addEventListener('loadedmetadata', () => {
        const duration = this.currentAudio.duration;
        const texts = SUBTITLE_TEXTS[currentLang]?.[sectionId];
        if (texts && duration && isFinite(duration)) {
          // Use composite key to cache per language + section
          const cacheKey = `${currentLang}_${sectionId}`;
          DYNAMIC_SUBTITLES[cacheKey] = buildSubtitlesForDuration(texts, duration);
        }
      });

      this.fadeIn(this.currentAudio);

      // Highlight active timeline node
      this.highlightActiveNode(sectionId);
    }

    fadeIn(audio) {
      // Wait for audio to be ready before playing
      audio.volume = this.isMuted ? 0 : 0.8;

      const playWhenReady = () => {
        audio.play().catch((e) => {
          console.warn('Audio playback failed:', e);
          // Auto-play might be blocked, show paused state
          if (this.controls) this.controls.classList.add('paused');
          this.isPaused = true;
        });
      };

      // If audio is ready, play immediately, otherwise wait
      if (audio.readyState >= 2) {
        playWhenReady();
      } else {
        audio.addEventListener('canplay', playWhenReady, { once: true });
      }
    }

    fadeOut(audio) {
      const interval = setInterval(() => {
        if (audio) {
          audio.volume = Math.max(audio.volume - 0.05, 0);
          if (audio.volume <= 0) {
            clearInterval(interval);
            audio.pause();
          }
        } else {
          clearInterval(interval);
        }
      }, 25);
    }

    updateProgress() {
      if (!this.currentAudio || !this.progressBar) return;
      const pct = (this.currentAudio.currentTime / this.currentAudio.duration) * 100;
      this.progressBar.style.width = `${pct || 0}%`;
    }

    updateSubtitle() {
      if (!this.currentAudio || !this.subtitleEl) return;

      // Use dynamically calculated subtitles based on actual audio duration
      const cacheKey = `${currentLang}_${this.currentSection}`;
      const subs = DYNAMIC_SUBTITLES[cacheKey];
      if (!subs) {
        this.subtitleEl.classList.remove('visible');
        return;
      }

      const time = this.currentAudio.currentTime;
      const active = subs.find(s => time >= s.start && time < s.end);

      if (active) {
        this.subtitleEl.textContent = active.text;
        this.subtitleEl.classList.add('visible');
      } else {
        this.subtitleEl.classList.remove('visible');
      }
    }

    // Set language from app.js
    setLanguage(lang) {
      const oldLang = currentLang;
      currentLang = lang;

      // If audio tour is active, switch to the new language audio
      if (this.isActive && this.currentSection && oldLang !== lang) {
        // Save current position ratio to resume at similar point
        const currentTime = this.currentAudio?.currentTime || 0;
        const duration = this.currentAudio?.duration || 1;
        const positionRatio = duration > 0 ? currentTime / duration : 0;

        // Stop current audio without triggering onSectionEnd
        if (this.currentAudio) {
          this.currentAudio.pause();
          this.currentAudio = null;
        }

        // Replay the current section in new language
        const sectionToReplay = this.currentSection;
        this.currentSection = null; // Reset to allow replay
        this.playSection(sectionToReplay);

        // Try to resume at similar position once new audio loads
        if (positionRatio > 0.1) { // Only if we were past 10%
          const resumeHandler = () => {
            if (this.currentAudio && this.currentAudio.duration) {
              const newTime = this.currentAudio.duration * positionRatio;
              this.currentAudio.currentTime = Math.min(newTime, this.currentAudio.duration - 0.5);
            }
            this.currentAudio?.removeEventListener('canplay', resumeHandler);
          };
          // Wait a bit for the new audio to be set up
          setTimeout(() => {
            if (this.currentAudio) {
              this.currentAudio.addEventListener('canplay', resumeHandler, { once: true });
            }
          }, 100);
        }
      }
    }

    onSectionEnd() {
      this.progressBar.style.width = '100%';

      // Clear subtitle
      if (this.subtitleEl) {
        this.subtitleEl.classList.remove('visible');
      }

      // Move to next section in queue
      this.currentQueueIndex++;
      if (this.currentQueueIndex < this.sectionQueue.length) {
        const nextSection = this.sectionQueue[this.currentQueueIndex];

        // Small delay before next section
        setTimeout(() => {
          if (this.isActive && !this.isPaused) {
            this.playSection(nextSection);
          }
        }, 1000);
      } else {
        // Tour complete
        setTimeout(() => this.stop(), 2000);
      }
    }

    highlightActiveNode(sectionId) {
      // Remove previous highlights
      document.querySelectorAll('.timeline-node.audio-active').forEach(node => {
        node.classList.remove('audio-active');
      });

      // Find and highlight node matching this era
      if (sectionId !== 'intro' && sectionId !== 'outro') {
        const nodes = document.querySelectorAll('.timeline-node');
        let firstMatchingNode = null;

        nodes.forEach(node => {
          if (node.dataset.era === sectionId) {
            node.classList.add('audio-active');
            if (!firstMatchingNode) {
              firstMatchingNode = node;
            }
          }
        });

        // Auto-scroll to the first matching node
        if (firstMatchingNode) {
          this.scrollToNode(firstMatchingNode);
        }
      } else if (sectionId === 'intro') {
        // Scroll to hero for intro
        const hero = document.querySelector('.hero');
        if (hero) {
          hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (sectionId === 'outro') {
        // Scroll to footer for outro
        const footer = document.querySelector('.footer');
        if (footer) {
          footer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }

    scrollToNode(node) {
      // Calculate position to center the node in viewport
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const nodeCenter = rect.top + rect.height / 2;
      const targetScroll = window.scrollY + nodeCenter - viewportHeight / 3;

      window.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }

    togglePlayPause() {
      if (!this.currentAudio) return;

      if (this.isPaused) {
        this.currentAudio.play().catch(() => {});
        this.isPaused = false;
        if (this.controls) this.controls.classList.remove('paused');
      } else {
        this.currentAudio.pause();
        this.isPaused = true;
        if (this.controls) this.controls.classList.add('paused');
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;

      if (this.currentAudio) {
        this.currentAudio.volume = this.isMuted ? 0 : 0.8;
      }

      if (this.controls) {
        this.controls.classList.toggle('muted', this.isMuted);
      }
    }

    stop() {
      if (this.currentAudio) {
        this.fadeOut(this.currentAudio);
        this.currentAudio = null;
      }

      this.isActive = false;
      this.isPaused = false;
      this.currentSection = null;
      this.currentQueueIndex = 0;

      if (this.controls) {
        this.controls.classList.remove('active', 'paused', 'muted');
      }

      if (this.subtitleEl) {
        this.subtitleEl.classList.remove('visible');
      }

      if (this.progressBar) {
        this.progressBar.style.width = '0%';
      }

      // Remove node highlights
      document.querySelectorAll('.timeline-node.audio-active').forEach(node => {
        node.classList.remove('audio-active');
      });
    }
  }

  // Expose globally
  window.AudioManager = new AudioManager();

})();
