/**
 * Tables Have Turned — Portfolio Timeline Renderer
 * Pure vanilla JS. No build step. No server required.
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // Configuration
  // ═══════════════════════════════════════════════════════════════════════════

  const CONFIG = {
    intersectionThreshold: 0.1,
    intersectionRootMargin: '0px 0px -50px 0px',
    skillUnlockDelay: 80 // ms between skill unlocks
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // State
  // ═══════════════════════════════════════════════════════════════════════════

  const videoModal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('videoPlayer');

  // Era & Skills state
  const STATE = {
    currentEra: null,
    unlockedSkills: new Set(),
    skillQueue: []
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // Hero Rendering
  // ═══════════════════════════════════════════════════════════════════════════

  function renderHero(meta) {
    const nameEl = document.querySelector('.hero-name');
    if (nameEl) nameEl.textContent = meta.name || 'Your Name';

    const taglineEl = document.querySelector('.hero-tagline');
    if (taglineEl) taglineEl.textContent = meta.tagline || '';

    const emailLink = document.querySelector('[data-contact="email"]');
    if (emailLink && meta.contact?.email) {
      emailLink.href = `mailto:${meta.contact.email}`;
      emailLink.textContent = meta.contact.email;
    }

    const githubLink = document.querySelector('[data-contact="github"]');
    if (githubLink && meta.github) {
      githubLink.href = `https://github.com/${meta.github}`;
      githubLink.textContent = `@${meta.github}`;
      githubLink.target = '_blank';
      githubLink.rel = 'noopener noreferrer';
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Timeline Rendering
  // ═══════════════════════════════════════════════════════════════════════════

  function renderTimeline(timeline) {
    const container = document.getElementById('timeline');
    if (!container) return;

    container.innerHTML = '';

    timeline.forEach((entry, index) => {
      const node = createTimelineNode(entry, index);
      container.appendChild(node);
    });

    setupScrollAnimations();
  }

  function createTimelineNode(entry, index) {
    const node = document.createElement('article');
    node.className = 'timeline-node';
    node.style.transitionDelay = `${index * 0.05}s`;

    // Era data for visual theming
    node.dataset.era = entry.era || 'fondations';
    node.dataset.index = index;

    const period = document.createElement('div');
    period.className = 'node-period';
    period.textContent = entry.period;
    node.appendChild(period);

    if (entry.context) {
      const context = createContext(entry.context);
      node.appendChild(context);
    }

    if (entry.skills && entry.skills.length > 0) {
      const skills = createSkillsTags(entry.skills);
      node.appendChild(skills);
    }

    if (entry.projects && entry.projects.length > 0) {
      const projects = createProjectsGrid(entry.projects);
      node.appendChild(projects);
    }

    return node;
  }

  function createContext(ctx) {
    const wrapper = document.createElement('div');
    wrapper.className = 'node-context';

    const type = document.createElement('div');
    type.className = 'context-type';
    type.textContent = ctx.type || 'experience';
    wrapper.appendChild(type);

    const title = document.createElement('h2');
    title.className = 'context-title';
    title.textContent = ctx.title || '';
    wrapper.appendChild(title);

    if (ctx.place) {
      const place = document.createElement('div');
      place.className = 'context-place';
      place.textContent = ctx.place;
      wrapper.appendChild(place);
    }

    if (ctx.narrative) {
      const narrative = document.createElement('p');
      narrative.className = 'context-narrative';
      narrative.textContent = ctx.narrative;
      wrapper.appendChild(narrative);
    }

    return wrapper;
  }

  function createSkillsTags(skills) {
    const wrapper = document.createElement('div');
    wrapper.className = 'node-skills';

    skills.forEach(skill => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.textContent = skill;
      wrapper.appendChild(tag);
    });

    return wrapper;
  }

  function createProjectsGrid(projects) {
    const grid = document.createElement('div');
    grid.className = 'node-projects';

    projects.forEach(project => {
      const card = createProjectCard(project);
      grid.appendChild(card);
    });

    return grid;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Project Card
  // ═══════════════════════════════════════════════════════════════════════════

  function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    // Only add video area if project has a video
    if (project.video) {
      const videoWrap = createVideoArea(project);
      card.appendChild(videoWrap);
    }

    const info = document.createElement('div');
    info.className = 'project-info';

    const header = document.createElement('div');
    header.className = 'project-header';

    const name = document.createElement('h3');
    name.className = 'project-name';
    name.textContent = project.name;
    header.appendChild(name);

    // Add private badge if repo is private
    if (project.isPrivate) {
      const privateBadge = document.createElement('span');
      privateBadge.className = 'private-badge';
      privateBadge.textContent = 'private';
      header.appendChild(privateBadge);
    }

    const links = createProjectLinks(project);
    if (links) header.appendChild(links);

    info.appendChild(header);

    if (project.oneLiner) {
      const oneLiner = document.createElement('p');
      oneLiner.className = 'project-oneliner';
      oneLiner.textContent = project.oneLiner;
      info.appendChild(oneLiner);
    }

    if (project.tech && project.tech.length > 0) {
      const techWrap = document.createElement('div');
      techWrap.className = 'project-tech';

      project.tech.forEach(t => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = t;
        techWrap.appendChild(tag);
      });

      info.appendChild(techWrap);
    }

    card.appendChild(info);
    return card;
  }

  function createVideoArea(project) {
    const wrap = document.createElement('div');
    wrap.className = 'project-video-wrap';

    const videoSrc = project.video || null;

    if (videoSrc) {
      wrap.dataset.video = videoSrc;

      if (project.thumbnail) {
        const thumb = document.createElement('img');
        thumb.className = 'project-thumbnail';
        thumb.src = project.thumbnail;
        thumb.alt = `${project.name} thumbnail`;
        thumb.loading = 'lazy';
        wrap.appendChild(thumb);
      }

      const play = document.createElement('div');
      play.className = 'project-play';
      wrap.appendChild(play);

      wrap.addEventListener('click', () => openVideoModal(videoSrc));
    } else {
      const noVideo = document.createElement('div');
      noVideo.className = 'project-no-video';
      noVideo.textContent = '// no demo video';
      wrap.appendChild(noVideo);
    }

    return wrap;
  }

  function createProjectLinks(project) {
    const hasRepo = project.repo;
    const hasLink = project.link;

    if (!hasRepo && !hasLink) return null;

    const wrapper = document.createElement('div');
    wrapper.className = 'project-links';

    if (hasRepo) {
      const repoLink = document.createElement('a');
      repoLink.className = 'project-link';
      repoLink.href = `https://github.com/${project.repo}`;
      repoLink.target = '_blank';
      repoLink.rel = 'noopener noreferrer';
      repoLink.textContent = 'repo';
      wrapper.appendChild(repoLink);
    }

    if (hasLink) {
      const liveLink = document.createElement('a');
      liveLink.className = 'project-link';
      liveLink.href = project.link;
      liveLink.target = '_blank';
      liveLink.rel = 'noopener noreferrer';
      liveLink.textContent = 'live';
      wrapper.appendChild(liveLink);
    }

    return wrapper;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Video Modal
  // ═══════════════════════════════════════════════════════════════════════════

  function openVideoModal(src) {
    if (!videoModal || !videoPlayer) return;

    videoPlayer.src = src;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    videoPlayer.play().catch(() => {});
  }

  function closeVideoModal() {
    if (!videoModal || !videoPlayer) return;

    videoModal.classList.remove('active');
    videoPlayer.pause();
    videoPlayer.src = '';
    document.body.style.overflow = '';
  }

  function setupVideoModal() {
    if (!videoModal) return;

    const backdrop = videoModal.querySelector('.video-modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeVideoModal);
    }

    const closeBtn = videoModal.querySelector('.video-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeVideoModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Scroll Animations
  // ═══════════════════════════════════════════════════════════════════════════

  function setupScrollAnimations() {
    const nodes = document.querySelectorAll('.timeline-node');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: CONFIG.intersectionThreshold,
        rootMargin: CONFIG.intersectionRootMargin
      }
    );

    nodes.forEach((node) => observer.observe(node));
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Era Tracking & Visual Themes
  // ═══════════════════════════════════════════════════════════════════════════

  function setupEraTracking() {
    const nodes = document.querySelectorAll('.timeline-node');
    if (nodes.length === 0) return;

    const eraObserver = new IntersectionObserver(
      (entries) => {
        // Find the most visible node
        let mostVisible = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry.target;
          }
        });

        if (mostVisible) {
          const newEra = mostVisible.dataset.era;
          if (newEra && newEra !== STATE.currentEra) {
            transitionToEra(newEra);
          }

          // Unlock skills up to this node
          const nodeIndex = parseInt(mostVisible.dataset.index, 10);
          unlockSkillsUpTo(nodeIndex);
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '-30% 0px -30% 0px'
      }
    );

    nodes.forEach((node) => eraObserver.observe(node));
  }

  function transitionToEra(eraId) {
    STATE.currentEra = eraId;
    document.body.dataset.era = eraId;

    // Update skill panel era label
    const eraLabel = document.getElementById('eraLabel');
    if (eraLabel && PORTFOLIO_DATA.eras && PORTFOLIO_DATA.eras[eraId]) {
      eraLabel.textContent = PORTFOLIO_DATA.eras[eraId].name;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Progressive Skill Accumulation
  // ═══════════════════════════════════════════════════════════════════════════

  function setupSkillPanel() {
    const panel = document.getElementById('skillPanel');
    const timeline = document.querySelector('.timeline-container');

    if (!panel || !timeline) return;

    // Show/hide skill panel based on timeline visibility
    const panelObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            panel.classList.add('visible');
          } else {
            panel.classList.remove('visible');
          }
        });
      },
      { threshold: 0, rootMargin: '-10% 0px -10% 0px' }
    );

    panelObserver.observe(timeline);
  }

  function unlockSkillsUpTo(nodeIndex) {
    if (!PORTFOLIO_DATA.timeline) return;

    const skillList = document.getElementById('skillList');
    const skillCount = document.getElementById('skillCount');
    if (!skillList) return;

    const newSkills = [];

    // Collect all skills from entries 0 to nodeIndex
    for (let i = 0; i <= nodeIndex && i < PORTFOLIO_DATA.timeline.length; i++) {
      const entry = PORTFOLIO_DATA.timeline[i];
      if (entry.skills) {
        entry.skills.forEach((skill) => {
          if (!STATE.unlockedSkills.has(skill)) {
            STATE.unlockedSkills.add(skill);
            newSkills.push(skill);
          }
        });
      }
    }

    // Animate new skills with staggered delay
    newSkills.forEach((skill, i) => {
      setTimeout(() => {
        addSkillToPanel(skill, skillList);
      }, i * CONFIG.skillUnlockDelay);
    });

    // Update count
    if (skillCount) {
      const total = STATE.unlockedSkills.size;
      skillCount.textContent = `${total} skill${total !== 1 ? 's' : ''}`;
    }
  }

  function addSkillToPanel(skill, skillList) {
    const li = document.createElement('li');
    li.className = 'skill-item animating';
    li.textContent = skill;
    skillList.appendChild(li);

    // After animation, change to unlocked state
    setTimeout(() => {
      li.classList.remove('animating');
      li.classList.add('unlocked');
    }, 500);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Initialization
  // ═══════════════════════════════════════════════════════════════════════════

  function init() {
    setupVideoModal();

    // PORTFOLIO_DATA is defined in data.js (loaded before this script)
    if (typeof PORTFOLIO_DATA !== 'undefined') {
      if (PORTFOLIO_DATA.meta) {
        renderHero(PORTFOLIO_DATA.meta);
      }
      if (PORTFOLIO_DATA.timeline) {
        renderTimeline(PORTFOLIO_DATA.timeline);
        setupEraTracking();
        setupSkillPanel();
      }
    } else {
      console.error('PORTFOLIO_DATA not found. Make sure data.js is loaded before app.js');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
