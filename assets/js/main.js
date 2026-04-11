// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

// Pagination & Tag filter
const allArticles = [
  {
    title: '逆転交渉術 まずは「ノー」を引き出せ',
    author: 'クリス・ヴォス',
    category: '心理・行動',
    summary: '元FBI交渉人が、人質交渉の現場で磨いた心理術をビジネスや日常に応用する本。',
    verdict: '買い ◎',
    isNew: false,
    file: '/articles/gyakukan-koshojutsu',
    tags: ['交渉術', '心理学', 'ビジネス', 'コミュニケーション']
  },
  {
    title: '体力おばけへの道',
    author: '澤木一貴',
    category: '健康・運動',
    summary: '疲れにくい体は才能じゃなくて習慣。行動体力と防衛体力の2種類を知るだけで、体への向き合い方が変わる。',
    verdict: '買い ◎',
    isNew: true,
    file: '/articles/tairyoku-obake',
    tags: ['健康', '運動', '習慣', 'セルフケア']
  },
  // ↓ 新しい記事はここに追加
];

const PER_PAGE = 20;
let currentPage = 1;
let activeTag = '';

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('tag')) activeTag = urlParams.get('tag');

function getAllTags() {
  const tagSet = new Set();
  allArticles.forEach(a => a.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

function getFiltered() {
  if (!activeTag) return allArticles;
  return allArticles.filter(a => a.tags.includes(activeTag));
}

function renderTagFilter() {
  const container = document.getElementById('tag-filter');
  if (!container) return;
  const tags = getAllTags();
  const btns = tags.map(t =>
    `<button class="filter-tag ${activeTag === t ? 'active' : ''}" data-tag="${t}">${t}</button>`
  ).join('');
  container.innerHTML = `<button class="filter-tag ${!activeTag ? 'active' : ''}" data-tag="">すべて</button>${btns}`;

  container.querySelectorAll('.filter-tag').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTag = btn.dataset.tag;
      currentPage = 1;
      renderTagFilter();
      renderCards(currentPage);
      renderPagination();
      const sectionTitle = document.getElementById('section-title');
      if (sectionTitle) sectionTitle.textContent = activeTag ? `# ${activeTag}` : '最新のレビュー';
    });
  });
}

function renderCards(page) {
  const grid = document.querySelector('.books-grid');
  if (!grid) return;
  const filtered = getFiltered();
  const pageArticles = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  if (pageArticles.length === 0) {
    grid.innerHTML = `<p style="color:var(--mist);opacity:0.6;font-size:14px;padding:20px 0;">該当する記事がありません。</p>`;
    return;
  }

  grid.innerHTML = pageArticles.map(a => `
    <div class="book-card ${a.isNew ? 'is-new' : ''} reveal">
      <div class="book-card-inner">
        <p class="book-category">${a.category}</p>
        <h3 class="book-title">${a.title}</h3>
        <p class="book-author">${a.author} 著</p>
        <p class="book-summary">${a.summary}</p>
        <div class="book-tags">
          ${a.tags.map(t => `<span class="card-tag" data-tag="${t}">${t}</span>`).join('')}
        </div>
        <div class="book-meta">
          <span class="book-verdict verdict-buy">${a.verdict}</span>
          <a href="${a.file}" class="read-more">続きを読む</a>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.card-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      activeTag = tag.dataset.tag;
      currentPage = 1;
      renderTagFilter();
      renderCards(1);
      renderPagination();
      const sectionTitle = document.getElementById('section-title');
      if (sectionTitle) sectionTitle.textContent = `# ${activeTag}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  grid.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 80);
  });
}

function renderPagination() {
  const container = document.querySelector('.pagination');
  if (!container) return;
  const totalPages = Math.ceil(getFiltered().length / PER_PAGE);
  if (totalPages <= 1) { container.style.display = 'none'; return; }
  container.style.display = 'flex';

  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 2) {
      html += `<span class="page-dots">…</span>`;
    }
  }
  if (currentPage < totalPages) {
    html += `<button class="page-btn page-next" data-page="${currentPage + 1}">次へ →</button>`;
  }
  container.innerHTML = html;

  container.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPage = parseInt(btn.dataset.page);
      renderCards(currentPage);
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// トップページのみ実行
if (document.querySelector('.books-grid')) {
  renderTagFilter();
  renderCards(1);
  renderPagination();
  if (activeTag) {
    const sectionTitle = document.getElementById('section-title');
    if (sectionTitle) sectionTitle.textContent = `# ${activeTag}`;
  }
}