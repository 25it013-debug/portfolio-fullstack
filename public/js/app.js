document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const filterControls = document.getElementById('filter-controls');
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');

  let allProjects = [];

  // Update Copyright Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile Menu Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Navbar background glass on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // Fetch all dynamic portfolio data from REST APIs
  fetchProfile();
  fetchSkills();
  fetchProjects();

  // ---------------------------------------------------------
  // 1. FETCH & RENDER PROFILE DATA
  // ---------------------------------------------------------
  async function fetchProfile() {
    try {
      const res = await fetch('/api/profile');
      const json = await res.json();
      if (json.success && json.data) {
        const p = json.data;
        document.getElementById('nav-brand-name').textContent = p.name.replace(/\s+/g, '.');
        document.getElementById('hero-name').textContent = p.name;
        document.getElementById('hero-subtitle').innerHTML = `Hi, I'm <span class="text-gradient">${p.name}</span>. ${p.title}.`;
        document.getElementById('hero-bio').textContent = p.bio;
        document.getElementById('footer-name').textContent = p.name;
        document.getElementById('contact-email').textContent = p.email;
        document.getElementById('contact-email').href = `mailto:${p.email}`;
        document.getElementById('contact-location').textContent = p.location;

        if (p.avatarUrl) document.getElementById('hero-avatar').src = p.avatarUrl;

        // Populate Stats
        if (p.stats) {
          document.getElementById('stat-experience').textContent = `${p.stats.yearsExperience}+`;
          document.getElementById('stat-years').textContent = `${p.stats.yearsExperience}+`;
          document.getElementById('stat-projects').textContent = `${p.stats.projectsCompleted}+`;
          document.getElementById('stat-clients').textContent = `${p.stats.happyClients}+`;
        }

        // Render Social Buttons
        const socialContainer = document.getElementById('hero-socials');
        socialContainer.innerHTML = `
          <a href="${p.github}" target="_blank" rel="noopener" class="social-icon-btn" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="${p.linkedin}" target="_blank" rel="noopener" class="social-icon-btn" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="${p.twitter}" target="_blank" rel="noopener" class="social-icon-btn" aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
          </a>
        `;
      }
    } catch (err) {
      console.error('Error loading profile:', err);
    }
  }

  // ---------------------------------------------------------
  // 2. FETCH & RENDER TECHNICAL SKILLS
  // ---------------------------------------------------------
  async function fetchSkills() {
    const container = document.getElementById('skills-container');
    try {
      const res = await fetch('/api/skills');
      const json = await res.json();
      if (json.success && json.data) {
        const skills = json.data;
        // Group skills by category
        const categories = {};
        skills.forEach(s => {
          if (!categories[s.category]) categories[s.category] = [];
          categories[s.category].push(s);
        });

        container.innerHTML = Object.keys(categories).map(catName => `
          <div class="glass-card skill-category-card">
            <h3 class="category-title">
              <span>⚡</span> ${catName}
            </h3>
            <div class="skills-list">
              ${categories[catName].map(s => `
                <div class="skill-item">
                  <div class="skill-item-info">
                    <span class="skill-name">${s.name}</span>
                    <span class="skill-percentage">${s.proficiency}%</span>
                  </div>
                  <div class="skill-bar-bg">
                    <div class="skill-bar-fill" data-percentage="${s.proficiency}"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('');

        // Trigger smooth progress bar width animation
        setTimeout(() => {
          document.querySelectorAll('.skill-bar-fill').forEach(bar => {
            const pct = bar.getAttribute('data-percentage');
            bar.style.width = `${pct}%`;
          });
        }, 200);
      }
    } catch (err) {
      container.innerHTML = `<div class="loading-spinner">Failed to load skills from server.</div>`;
    }
  }

  // ---------------------------------------------------------
  // 3. FETCH & RENDER PROJECTS WITH FILTERING
  // ---------------------------------------------------------
  async function fetchProjects() {
    const container = document.getElementById('projects-container');
    try {
      const res = await fetch('/api/projects');
      const json = await res.json();
      if (json.success && json.data) {
        allProjects = json.data;
        renderProjects(allProjects);
      }
    } catch (err) {
      container.innerHTML = `<div class="loading-spinner">Failed to load projects from server.</div>`;
    }
  }

  function renderProjects(projectsToRender) {
    const container = document.getElementById('projects-container');
    if (projectsToRender.length === 0) {
      container.innerHTML = `<div class="loading-spinner">No projects found in this category.</div>`;
      return;
    }

    container.innerHTML = projectsToRender.map(p => `
      <div class="glass-card project-card">
        <div class="project-thumb-wrapper">
          <img src="${p.imageUrl}" alt="${p.title}" class="project-thumb">
          <span class="project-category-tag">${p.category}</span>
        </div>
        <div class="project-details">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-description">${p.description}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${p.liveUrl}" target="_blank" rel="noopener" class="project-link">
              <span>Live Demo</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
            <a href="${p.githubUrl}" target="_blank" rel="noopener" class="project-link">
              <span>GitHub</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Filter Event Listeners
  if (filterControls) {
    filterControls.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const selectedCat = e.target.getAttribute('data-category');

        if (selectedCat === 'All') {
          renderProjects(allProjects);
        } else {
          const filtered = allProjects.filter(p => p.category === selectedCat);
          renderProjects(filtered);
        }
      }
    });
  }

  // ---------------------------------------------------------
  // 4. INTERACTIVE CONTACT FORM SUBMISSION WITH VALIDATION
  // ---------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Simple client-side check
      let hasError = false;
      if (!name) { showError('name', 'Name is required'); hasError = true; }
      if (!email) { showError('email', 'Email is required'); hasError = true; }
      if (!subject) { showError('subject', 'Subject is required'); hasError = true; }
      if (!message) { showError('message', 'Message is required'); hasError = true; }

      if (hasError) return;

      // Toggle submit loading state
      const btnText = document.getElementById('btn-text');
      const btnSpinner = document.getElementById('btn-spinner');
      const submitBtn = document.getElementById('submit-btn');
      
      btnText.textContent = 'Sending...';
      btnSpinner.classList.remove('hidden');
      submitBtn.disabled = true;

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });

        const json = await res.json();

        if (json.success) {
          showAlert('success', json.message);
          contactForm.reset();
        } else {
          if (json.errors) {
            json.errors.forEach(err => {
              showError(err.path || err.param, err.msg);
            });
          }
          showAlert('error', json.message || 'Failed to send message.');
        }
      } catch (err) {
        showAlert('error', 'Network error. Please check your connection and try again.');
      } finally {
        btnText.textContent = 'Send Message';
        btnSpinner.classList.add('hidden');
        submitBtn.disabled = false;
      }
    });
  }

  function showError(fieldId, msg) {
    const errorSpan = document.getElementById(`error-${fieldId}`);
    if (errorSpan) errorSpan.textContent = msg;
  }

  function clearErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    formAlert.className = 'form-alert hidden';
    formAlert.textContent = '';
  }

  function showAlert(type, msg) {
    formAlert.className = `form-alert ${type}`;
    formAlert.textContent = msg;
  }
});
