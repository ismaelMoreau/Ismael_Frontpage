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
    currentNodeIndex: -1,  // Track current visible node
    isInitialized: false,  // Prevent batch unlock on page load
    currentLang: 'fr'      // Language: 'fr' | 'en'
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // Language Management
  // ═══════════════════════════════════════════════════════════════════════════

  // Get UI translation
  function t(key) {
    if (typeof TRANSLATIONS === 'undefined') return key;
    return TRANSLATIONS.ui[STATE.currentLang]?.[key] || TRANSLATIONS.ui['fr']?.[key] || key;
  }

  // Get localized era name
  function getEraName(eraId) {
    if (typeof TRANSLATIONS === 'undefined') return eraId;
    return TRANSLATIONS.eras[STATE.currentLang]?.[eraId] || TRANSLATIONS.eras['fr']?.[eraId] || eraId;
  }

  // Get localized timeline text (narrative, title, place)
  function getTimelineText(index, field) {
    if (typeof TRANSLATIONS === 'undefined' || STATE.currentLang === 'fr') {
      return null; // Use original data.js values
    }
    const entry = TRANSLATIONS.timeline?.en?.[index];
    return entry?.[field] || null;
  }

  // Get localized project oneliner
  function getProjectOneLiner(projectName) {
    if (typeof TRANSLATIONS === 'undefined' || STATE.currentLang === 'fr') {
      return null; // Use original data.js values
    }
    return TRANSLATIONS.projects?.en?.[projectName] || null;
  }

  function toggleLanguage() {
    STATE.currentLang = STATE.currentLang === 'fr' ? 'en' : 'fr';

    // Update button text
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
      langBtn.textContent = STATE.currentLang === 'fr' ? 'EN' : 'FR';
    }

    // Update HTML lang attribute
    document.documentElement.lang = STATE.currentLang;

    // Re-render everything
    renderAll();

    // Notify audio manager of language change
    if (window.AudioManager) {
      window.AudioManager.setLanguage(STATE.currentLang);
    }
  }

  function setupLanguageToggle() {
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
      langBtn.addEventListener('click', toggleLanguage);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Hero Rendering
  // ═══════════════════════════════════════════════════════════════════════════

  function renderHero(meta) {
    const nameEl = document.querySelector('.hero-name');
    if (nameEl) nameEl.textContent = meta.name || 'Your Name';

    const taglineEl = document.querySelector('.hero-tagline');
    if (taglineEl) taglineEl.textContent = t('tagline');

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

    // Update other UI elements
    const heroMeta = document.querySelector('.hero-meta');
    if (heroMeta) heroMeta.textContent = t('heroMeta');

    const scrollHint = document.querySelector('.scroll-indicator .mono');
    if (scrollHint) scrollHint.textContent = t('scrollHint');

    const tourBtn = document.querySelector('.tour-button span:last-child');
    if (tourBtn) tourBtn.textContent = t('tourButton');

    const footerMono = document.querySelector('.footer .mono');
    if (footerMono) footerMono.textContent = t('endTimeline');

    const footerMessage = document.querySelector('.footer-message');
    if (footerMessage) footerMessage.textContent = t('footerMessage');
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
      const context = createContext(entry.context, index);
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

  function createContext(ctx, index) {
    const wrapper = document.createElement('div');
    wrapper.className = 'node-context';

    const type = document.createElement('div');
    type.className = 'context-type';
    type.textContent = ctx.type || 'experience';
    wrapper.appendChild(type);

    const title = document.createElement('h2');
    title.className = 'context-title';
    title.textContent = getTimelineText(index, 'title') || ctx.title || '';
    wrapper.appendChild(title);

    if (ctx.place) {
      const place = document.createElement('div');
      place.className = 'context-place';
      place.textContent = getTimelineText(index, 'place') || ctx.place;
      wrapper.appendChild(place);
    }

    if (ctx.narrative) {
      const narrative = document.createElement('p');
      narrative.className = 'context-narrative';
      narrative.textContent = getTimelineText(index, 'narrative') || ctx.narrative;
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

    // Add media area: video, thumbnail, or live preview
    if (project.video) {
      const videoWrap = createVideoArea(project);
      card.appendChild(videoWrap);
    } else if (project.thumbnail) {
      const thumbWrap = createThumbnailArea(project);
      card.appendChild(thumbWrap);
    } else if (project.link) {
      const previewWrap = createLivePreviewArea(project);
      card.appendChild(previewWrap);
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
      privateBadge.textContent = t('private');
      header.appendChild(privateBadge);
    }

    // Add client badge for work projects (highlighted)
    if (project.client) {
      const clientBadge = document.createElement('span');
      clientBadge.className = 'project-client-badge';
      clientBadge.textContent = project.client;
      header.appendChild(clientBadge);
    }
    // Add personal project badge (subtle)
    else if (project.isPersonal) {
      const personalBadge = document.createElement('span');
      personalBadge.className = 'project-personal-badge';
      personalBadge.textContent = t('personalProject');
      header.appendChild(personalBadge);
    }

    const links = createProjectLinks(project);
    if (links) header.appendChild(links);

    info.appendChild(header);

    if (project.oneLiner) {
      const oneLiner = document.createElement('p');
      oneLiner.className = 'project-oneliner';
      oneLiner.textContent = getProjectOneLiner(project.name) || project.oneLiner;
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

  function createThumbnailArea(project) {
    const wrap = document.createElement('div');
    wrap.className = 'project-thumbnail-wrap';

    const thumb = document.createElement('img');
    thumb.className = 'project-thumbnail';
    thumb.src = project.thumbnail;
    thumb.alt = `${project.name} preview`;
    thumb.loading = 'lazy';
    wrap.appendChild(thumb);

    if (project.link) {
      const linkOverlay = document.createElement('a');
      linkOverlay.className = 'project-link-overlay';
      linkOverlay.href = project.link;
      linkOverlay.target = '_blank';
      linkOverlay.rel = 'noopener noreferrer';
      linkOverlay.innerHTML = '<span>View Live</span>';
      wrap.appendChild(linkOverlay);
    }

    return wrap;
  }

  function createLivePreviewArea(project) {
    const wrap = document.createElement('a');
    wrap.className = 'project-live-preview';
    wrap.href = project.link;
    wrap.target = '_blank';
    wrap.rel = 'noopener noreferrer';

    const icon = document.createElement('div');
    icon.className = 'live-preview-icon';
    icon.innerHTML = '↗';
    wrap.appendChild(icon);

    const label = document.createElement('span');
    label.className = 'live-preview-label';
    label.textContent = 'View Live Demo';
    wrap.appendChild(label);

    const url = document.createElement('span');
    url.className = 'live-preview-url';
    // Extract domain from URL
    try {
      const urlObj = new URL(project.link);
      url.textContent = urlObj.hostname;
    } catch {
      url.textContent = project.link;
    }
    wrap.appendChild(url);

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

    // Initialize with first node's era
    if (nodes[0] && nodes[0].dataset.era) {
      transitionToEra(nodes[0].dataset.era);
    }

    // Delay full initialization to prevent batch unlock on page load
    setTimeout(() => {
      STATE.isInitialized = true;
      updateSkillsForCurrentScroll();
      // Re-check era based on current scroll position
      detectCurrentEra();
    }, 500);

    // Use scroll listener for more reliable tracking (works with drag)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (!STATE.isInitialized) return;

      // Throttle scroll updates
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        updateSkillsForCurrentScroll();
        detectCurrentEra();
      }, 50);
    }, { passive: true });

    // Also use IntersectionObserver for era transitions
    const eraObserver = new IntersectionObserver(
      (entries) => {
        if (!STATE.isInitialized) return;

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
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '-30% 0px -30% 0px'
      }
    );

    nodes.forEach((node) => eraObserver.observe(node));
  }

  function updateSkillsForCurrentScroll() {
    const nodes = document.querySelectorAll('.timeline-node');
    if (nodes.length === 0) return;

    const viewportCenter = window.innerHeight / 2;
    let currentIndex = 0;

    // Find which node is at or above viewport center
    nodes.forEach((node, index) => {
      const rect = node.getBoundingClientRect();
      // Node is considered "reached" when its top passes 60% of viewport
      if (rect.top < viewportCenter + window.innerHeight * 0.1) {
        currentIndex = index;
      }
    });

    // Only update if index changed
    if (currentIndex !== STATE.currentNodeIndex) {
      STATE.currentNodeIndex = currentIndex;
      rebuildSkillList(currentIndex);
    }
  }

  function detectCurrentEra() {
    const nodes = document.querySelectorAll('.timeline-node');
    if (nodes.length === 0) return;

    const viewportCenter = window.innerHeight / 2;
    let currentEra = null;

    // Find which node is closest to viewport center
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      // Node is considered "current" when it's in the viewport center area
      if (rect.top < viewportCenter + 100 && rect.bottom > viewportCenter - 100) {
        currentEra = node.dataset.era;
      }
    });

    // Fallback: find the last node that's above viewport center
    if (!currentEra) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const rect = nodes[i].getBoundingClientRect();
        if (rect.top < viewportCenter) {
          currentEra = nodes[i].dataset.era;
          break;
        }
      }
    }

    // Fallback to first node's era if at top of page
    if (!currentEra && nodes[0]) {
      currentEra = nodes[0].dataset.era;
    }

    if (currentEra && currentEra !== STATE.currentEra) {
      transitionToEra(currentEra);
    }
  }

  function transitionToEra(eraId) {
    STATE.currentEra = eraId;
    document.body.dataset.era = eraId;

    // Update skill panel era label
    const eraLabel = document.getElementById('eraLabel');
    if (eraLabel) {
      eraLabel.textContent = getEraName(eraId);
    }

    // Dispatch event for audio manager
    document.dispatchEvent(new CustomEvent('eraChanged', {
      detail: { era: eraId }
    }));
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

  // Mobile skill panel toggle
  function setupSkillToggle() {
    const toggle = document.getElementById('skillToggle');
    const panel = document.getElementById('skillPanel');

    if (!toggle || !panel) return;

    toggle.addEventListener('click', () => {
      panel.classList.toggle('mobile-open');
      toggle.setAttribute('aria-expanded', panel.classList.contains('mobile-open'));
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (panel.classList.contains('mobile-open') &&
          !panel.contains(e.target) &&
          !toggle.contains(e.target)) {
        panel.classList.remove('mobile-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on scroll for cleaner UX
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      if (Math.abs(window.scrollY - lastScrollY) > 50) {
        panel.classList.remove('mobile-open');
        toggle.setAttribute('aria-expanded', 'false');
        lastScrollY = window.scrollY;
      }
    }, { passive: true });
  }

  // Update mobile toggle count
  function updateSkillToggleCount(count) {
    const toggleCount = document.getElementById('skillToggleCount');
    const toggle = document.getElementById('skillToggle');
    if (toggleCount) {
      toggleCount.textContent = count;
    }
    if (toggle) {
      toggle.classList.toggle('has-skills', count > 0);
    }
  }

  // Track pending skill additions to prevent duplicates during rapid scrolling
  let pendingSkillAdditions = new Set();

  function rebuildSkillList(nodeIndex) {
    if (!PORTFOLIO_DATA.timeline) return;

    const skillList = document.getElementById('skillList');
    const skillCount = document.getElementById('skillCount');
    if (!skillList) return;

    // Collect all skills up to current node index
    const skillsToShow = [];
    const seenSkills = new Set();

    for (let i = 0; i <= nodeIndex && i < PORTFOLIO_DATA.timeline.length; i++) {
      const entry = PORTFOLIO_DATA.timeline[i];
      if (entry && entry.skills) {
        entry.skills.forEach((skill) => {
          if (!seenSkills.has(skill)) {
            seenSkills.add(skill);
            skillsToShow.push(skill);
          }
        });
      }
    }

    // Get current skills in the DOM (use data attribute for reliable matching)
    const currentSkillEls = skillList.querySelectorAll('.skill-item');
    const currentSkills = Array.from(currentSkillEls).map(el => el.dataset.skill || el.textContent);

    // Determine what to add/remove
    const toAdd = skillsToShow.filter(s => !currentSkills.includes(s) && !pendingSkillAdditions.has(s));
    const toRemove = currentSkills.filter(s => !skillsToShow.includes(s));

    // Remove skills that shouldn't be shown anymore
    toRemove.forEach(skill => {
      pendingSkillAdditions.delete(skill); // Clear from pending if was being added
      const el = Array.from(currentSkillEls).find(el => (el.dataset.skill || el.textContent) === skill);
      if (el) {
        el.classList.add('removing');
        setTimeout(() => el.remove(), 300);
      }
    });

    // Add new skills with staggered animation
    toAdd.forEach((skill, i) => {
      pendingSkillAdditions.add(skill);
      setTimeout(() => {
        // Double-check skill isn't already in DOM before adding
        const existingEls = skillList.querySelectorAll('.skill-item');
        const alreadyExists = Array.from(existingEls).some(el => (el.dataset.skill || el.textContent) === skill);
        if (alreadyExists) {
          pendingSkillAdditions.delete(skill);
          return;
        }

        const li = document.createElement('li');
        li.className = 'skill-item animating';
        li.textContent = skill;
        li.dataset.skill = skill; // Store skill name in data attribute for reliable matching
        skillList.appendChild(li);

        setTimeout(() => {
          li.classList.remove('animating');
          li.classList.add('unlocked');
          pendingSkillAdditions.delete(skill);
        }, 400);
      }, i * CONFIG.skillUnlockDelay);
    });

    // Update count
    const total = skillsToShow.length;
    if (skillCount) {
      skillCount.textContent = `${total} skill${total !== 1 ? 's' : ''}`;
    }
    // Update mobile toggle count
    updateSkillToggleCount(total);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Initialization
  // ═══════════════════════════════════════════════════════════════════════════

  function setupAudioTour() {
    const tourButton = document.getElementById('startTour');
    if (tourButton && window.AudioManager) {
      tourButton.addEventListener('click', () => {
        window.AudioManager.start();
      });
    }
  }

  // Re-render all content (called on language change)
  function renderAll() {
    if (typeof PORTFOLIO_DATA !== 'undefined') {
      if (PORTFOLIO_DATA.meta) {
        renderHero(PORTFOLIO_DATA.meta);
      }
      if (PORTFOLIO_DATA.timeline) {
        // Preserve scroll position
        const scrollY = window.scrollY;

        renderTimeline(PORTFOLIO_DATA.timeline);

        // Restore scroll position after render
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
          // Re-trigger visibility and era detection
          STATE.isInitialized = false;
          setTimeout(() => {
            STATE.isInitialized = true;
            STATE.currentNodeIndex = -1; // Force rebuild
            updateSkillsForCurrentScroll();
          }, 100);
        });
      }

      // Update era label if currently set
      if (STATE.currentEra) {
        const eraLabel = document.getElementById('eraLabel');
        if (eraLabel) {
          eraLabel.textContent = getEraName(STATE.currentEra);
        }
      }
    }
  }

  function init() {
    setupVideoModal();
    setupLanguageToggle();

    // PORTFOLIO_DATA is defined in data.js (loaded before this script)
    if (typeof PORTFOLIO_DATA !== 'undefined') {
      if (PORTFOLIO_DATA.meta) {
        renderHero(PORTFOLIO_DATA.meta);
      }
      if (PORTFOLIO_DATA.timeline) {
        renderTimeline(PORTFOLIO_DATA.timeline);
        setupEraTracking();
        setupSkillPanel();
        setupSkillToggle();
      }
      setupAudioTour();
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
