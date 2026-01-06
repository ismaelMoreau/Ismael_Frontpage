/**
 * Audio Tour Manager
 * Handles guided tour narration with sync to scroll position
 */

(function() {
  'use strict';

  // Subtitles for each audio section (timestamps in seconds)
  const SUBTITLES = {
    intro: [
      { start: 0, end: 3, text: "Salut. Moi c'est Ismaël." },
      { start: 3, end: 7, text: "Ça fait huit ans que je construis des trucs avec du code." },
      { start: 7, end: 12, text: "Des systèmes distribués, des jeux vidéo, des pipelines DevOps..." },
      { start: 12, end: 15, text: "Et maintenant, des agents IA qui pensent pour moi." }
    ],
    fondations: [
      { start: 0, end: 4, text: "2017. Ma première vraie job." },
      { start: 4, end: 8, text: "Laboratoire Blockchain. Pas de React, pas de framework fancy." },
      { start: 8, end: 13, text: "Juste du JavaScript brut, du Linux, et des interfaces qui parlent aux machines." },
      { start: 13, end: 18, text: "C'est là que j'ai compris que le code, c'est pas juste des lignes sur un écran." },
      { start: 18, end: 22, text: "C'est un système vivant qui doit tenir debout tout seul." }
    ],
    echelle: [
      { start: 0, end: 4, text: "2019. Desjardins Assurance." },
      { start: 4, end: 8, text: "Pas une startup. Une institution." },
      { start: 8, end: 13, text: "Des clusters de VM qui gèrent des millions en assurance." },
      { start: 13, end: 17, text: "Soudainement, mon code seul suffisait plus." },
      { start: 17, end: 22, text: "Fallait des pipelines, de l'automatisation, des systèmes qui se déploient tout seuls." }
    ],
    creatif: [
      { start: 0, end: 4, text: "2022. Changement de cap. Sarbakan." },
      { start: 4, end: 8, text: "Game dev. Un monde où le code doit être beau ET rapide." },
      { start: 8, end: 13, text: "Unity, C#, et ma première rencontre avec l'ECS." },
      { start: 13, end: 18, text: "Les systèmes distribués du DevOps qui rencontrent le temps réel du jeu vidéo." },
      { start: 18, end: 23, text: "Ensuite, la SQDC. Un choix délibéré. Plus de temps pour mes projets." }
    ],
    multiplicateur: [
      { start: 0, end: 4, text: "2024. Le turning point." },
      { start: 4, end: 9, text: "AEC en Intelligence Artificielle. Mais c'était pas juste apprendre." },
      { start: 9, end: 14, text: "L'IA, c'est un multiplicateur de tout ce que je savais déjà faire." },
      { start: 14, end: 19, text: "Deep Reinforcement Learning en C# pur. Des ennemis qui apprennent pendant qu'on joue." },
      { start: 19, end: 24, text: "Des LLM locaux qui collaborent. Je code plus tout. J'orchestre." }
    ],
    outro: [
      { start: 0, end: 4, text: "Voilà. Huit ans résumés en quelques minutes." },
      { start: 4, end: 9, text: "Du programmeur qui tape du code à l'architecte qui dirige des agents." },
      { start: 9, end: 12, text: "Les tables ont tourné." }
    ]
  };

  class AudioManager {
    constructor() {
      this.currentAudio = null;
      this.currentSection = null;
      this.isActive = false;
      this.isPaused = false;
      this.isMuted = false;
      this.sectionQueue = ['intro', 'fondations', 'echelle', 'creatif', 'multiplicateur', 'outro'];
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
      document.addEventListener('eraChanged', (e) => {
        if (this.isActive && !this.isPaused) {
          const eraId = e.detail.era;
          if (this.sectionQueue.includes(eraId) && eraId !== this.currentSection) {
            // Find era index and update queue position
            const eraIndex = this.sectionQueue.indexOf(eraId);
            if (eraIndex > this.currentQueueIndex) {
              this.currentQueueIndex = eraIndex;
              this.playSection(eraId);
            }
          }
        }
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

      // Scroll to start of timeline after intro
      setTimeout(() => {
        const timeline = document.querySelector('.timeline-container');
        if (timeline) {
          timeline.scrollIntoView({ behavior: 'smooth' });
        }
      }, 3000);
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
      audio.volume = 0;
      audio.play().catch((e) => {
        console.warn('Audio playback failed:', e);
        // Auto-play might be blocked, show paused state
        if (this.controls) this.controls.classList.add('paused');
        this.isPaused = true;
      });

      if (!this.isMuted) {
        const target = 0.8;
        let vol = 0;
        const interval = setInterval(() => {
          vol += 0.05;
          if (audio) audio.volume = Math.min(vol, target);
          if (vol >= target) clearInterval(interval);
        }, 25);
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
        nodes.forEach(node => {
          if (node.dataset.era === sectionId) {
            node.classList.add('audio-active');
          }
        });
      }
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
