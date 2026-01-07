/**
 * Audio Tour Manager
 * Handles guided tour narration with sync to scroll position
 */

(function() {
  'use strict';

  // Raw subtitle text for each section (timestamps calculated dynamically)
  const SUBTITLE_TEXTS = {
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
  };

  // Calculate duration based on word count (~150 words per minute = 2.5 words per second)
  // Add small buffer for pauses between phrases
  const WORDS_PER_SECOND = 2.2;
  const PAUSE_BETWEEN_LINES = 0.3;

  function calculateDuration(text) {
    const words = text.split(/\s+/).length;
    return (words / WORDS_PER_SECOND) + PAUSE_BETWEEN_LINES;
  }

  function buildSubtitles(texts) {
    const subs = [];
    let currentTime = 0.5; // Start with small delay

    texts.forEach(text => {
      const duration = calculateDuration(text);
      subs.push({
        start: currentTime,
        end: currentTime + duration,
        text: text
      });
      currentTime += duration;
    });

    return subs;
  }

  // Build subtitles with dynamic timestamps
  const SUBTITLES = {};
  Object.keys(SUBTITLE_TEXTS).forEach(key => {
    SUBTITLES[key] = buildSubtitles(SUBTITLE_TEXTS[key]);
  });

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

      // Get audio source
      let src;
      if (sectionId === 'intro') {
        src = PORTFOLIO_DATA.audioTour?.intro;
      } else if (sectionId === 'outro') {
        src = PORTFOLIO_DATA.audioTour?.outro;
      } else if (PORTFOLIO_DATA.eras && PORTFOLIO_DATA.eras[sectionId]) {
        src = PORTFOLIO_DATA.eras[sectionId].audioFile;
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
        console.warn(`Audio error for ${sectionId}:`, e);
        this.onSectionEnd();
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

      const subs = SUBTITLES[this.currentSection];
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
