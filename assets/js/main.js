
const DEFAULT_DATA = {
  author: {
    name: "Your Name",
    role: "Researcher in Microplastic Detection and Environmental Monitoring",
    affiliation: "Your Department / University / Organization",
    email: "your.email@example.com",
    location: "Your City, Country",
    bio: "Replace this paragraph with your own author profile. You can edit data/site.json and this page will update when the site is served through a local server.",
    researchInterests: ["Microplastic detection", "Electrical sensing zone methods", "Signal processing and machine learning", "Environmental monitoring"]
  },
  references: [],
  detectionTechnologies: [],
  userPublications: []
};

async function loadSiteData() {
  try {
    const res = await fetch('data/site.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('JSON not loaded');
    return await res.json();
  } catch (err) {
    return DEFAULT_DATA;
  }
}

function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });
}

function setupNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

function renderReferences(data) {
  const list = document.querySelector('[data-render="references"]');
  if (!list || !data.references) return;
  list.innerHTML = data.references.map(ref => `
    <li>
      <a href="${ref.url}" target="_blank" rel="noopener">${ref.short} (${ref.year}). ${ref.title}</a>
      <span>${ref.note || ''}</span>
    </li>
  `).join('');
}

function renderAuthor(data) {
  const author = data.author || DEFAULT_DATA.author;
  const map = {
    '[data-author-name]': author.name,
    '[data-author-role]': author.role,
    '[data-author-affiliation]': author.affiliation,
    '[data-author-email]': author.email,
    '[data-author-location]': author.location,
    '[data-author-bio]': author.bio
  };
  Object.entries(map).forEach(([selector, value]) => {
    document.querySelectorAll(selector).forEach(el => el.textContent = value || '');
  });
  const tags = document.querySelector('[data-author-interests]');
  if (tags && author.researchInterests) {
    tags.innerHTML = author.researchInterests.map(item => `<span class="tag">${item}</span>`).join('');
  }
}

function renderTechnologyCards(data) {
  const host = document.querySelector('[data-render="technology-cards"]');
  if (!host || !data.detectionTechnologies) return;
  host.innerHTML = data.detectionTechnologies.map((tech, i) => `
    <article class="card ${['accent-a','accent-b','accent-c'][i % 3]}">
      <h3>${tech.name}</h3>
      <p><strong>Best for:</strong> ${tech.bestFor}</p>
      <p><strong>Strength:</strong> ${tech.strength}</p>
      <p><strong>Limitation:</strong> ${tech.limitation}</p>
    </article>
  `).join('');
}

function renderPublicationCards(data) {
  const host = document.querySelector('[data-render="publications"]');
  if (!host || !data.userPublications) return;
  host.innerHTML = data.userPublications.map(pub => `
    <article class="card">
      <h3>${pub.title}</h3>
      <p><strong>${pub.authors}</strong></p>
      <p>${pub.venue} (${pub.year})</p>
      <p>${pub.summary}</p>
      ${pub.url && pub.url !== '#' ? `<a class="button secondary" href="${pub.url}" target="_blank" rel="noopener">Open publication</a>` : ''}
    </article>
  `).join('');
}

loadSiteData().then(data => {
  setActiveNav();
  setupNav();
  renderReferences(data);
  renderAuthor(data);
  renderTechnologyCards(data);
  renderPublicationCards(data);
});
