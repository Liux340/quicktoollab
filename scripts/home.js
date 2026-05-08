/* ═══════════════════════════════════════════════════════════
   QuickToolLab — Homepage Logic
   ═══════════════════════════════════════════════════════════ */

let currentAiCat = 'all';
let currentToolCat = 'all';
let searchItems = [];
let activeSearchIndex = 0;

function homeUiText(key) {
    const copy = {
        zh: {
            searchPlaceholder: '\u641c\u7d22\u5de5\u5177\u3001AI \u5e94\u7528\u548c\u7cbe\u9009\u63a8\u8350',
            noResults: '\u6682\u65f6\u6ca1\u6709\u5339\u914d\u7684\u5de5\u5177',
            recent: '\u6700\u8fd1\u4f7f\u7528',
            favorite: '\u5df2\u6536\u85cf',
            quickPick: '\u7cbe\u9009',
            tool: '\u5de5\u5177',
            continueTitle: '\u7ee7\u7eed\u4e0a\u6b21\u4f7f\u7528',
            resultCount: '\u4e2a\u7ed3\u679c',
            keyboardHint: '\u4e0a\u4e0b\u9009\u62e9\u3001Enter \u6253\u5f00',
            ai: 'AI',
            friendEmpty: '\u6682\u672a\u6dfb\u52a0\u53cb\u60c5\u94fe\u63a5',
            friendLoadError: '\u53cb\u94fe\u52a0\u8f7d\u5931\u8d25'
        },
        en: {
            searchPlaceholder: 'Search tools, AI apps, and quick picks',
            noResults: 'No matching tools yet',
            recent: 'Recently used',
            favorite: 'Favorite',
            quickPick: 'Quick pick',
            tool: 'Tool',
            continueTitle: 'Continue where you left off',
            resultCount: 'results',
            keyboardHint: 'Arrow keys + Enter',
            ai: 'AI',
            friendEmpty: 'No friend links yet',
            friendLoadError: 'Could not load friend links'
        },
        ja: {
            searchPlaceholder: '\u30c4\u30fc\u30eb\u3001AI\u30a2\u30d7\u30ea\u3001\u63a8\u5968\u3092\u691c\u7d22',
            noResults: '\u4e00\u81f4\u3059\u308b\u30c4\u30fc\u30eb\u306f\u307e\u3060\u3042\u308a\u307e\u305b\u3093',
            recent: '\u6700\u8fd1\u4f7f\u7528',
            favorite: '\u304a\u6c17\u306b\u5165\u308a',
            quickPick: '\u63a8\u5968',
            tool: '\u30c4\u30fc\u30eb',
            continueTitle: '\u524d\u56de\u306e\u7d9a\u304d',
            resultCount: '\u4ef6\u306e\u7d50\u679c',
            keyboardHint: '\u4e0a\u4e0b\u3067\u9078\u629e\u3001Enter \u3067\u958b\u304f',
            ai: 'AI',
            friendEmpty: '\u53cb\u60c5\u30ea\u30f3\u30af\u306f\u307e\u3060\u3042\u308a\u307e\u305b\u3093',
            friendLoadError: '\u53cb\u60c5\u30ea\u30f3\u30af\u3092\u8aad\u307f\u8fbc\u3081\u307e\u305b\u3093'
        }
    };
    return (copy[lang] && copy[lang][key]) || copy.en[key] || key;
}

function normalizeSearchText(value) {
    return String(value || '').toLowerCase().trim();
}

function buildSearchItems() {
    const items = [];
    const seen = new Set();
    const pushItem = item => {
        if (!item || !item.href || seen.has(item.href)) return;
        seen.add(item.href);
        items.push({
            icon: item.icon || '#',
            title: item.title || item.name || item.href,
            meta: item.meta || item.brand || item.tag || '',
            kind: item.kind || homeUiText('tool'),
            href: item.href,
            internal: item.internal || item.int || item.href.startsWith('/')
        });
    };

    getFavs().forEach(x => pushItem({ ...x, meta: homeUiText('favorite'), kind: homeUiText('favorite') }));
    getHist().forEach(x => pushItem({ ...x, meta: homeUiText('recent'), kind: homeUiText('recent') }));
    PINNED.forEach(x => pushItem({ ...x, title: x.name, meta: x.brand, kind: homeUiText('quickPick') }));
    AI_TOOLS.forEach(x => pushItem({ ...x, title: x.name, meta: x.tag, kind: homeUiText('ai') }));

    const cats = TOOLS[lang] || TOOLS.en;
    cats.forEach(cat => (cat.items || []).forEach(x => {
        pushItem({ ...x, meta: cat.title, kind: homeUiText('tool'), internal: x.int });
    }));

    searchItems = items;
    return items;
}

function openSearchItem(item) {
    if (!item) return;
    addHist(item.href, item.title, item.icon);
    renderContinueSection();
    if (item.internal) window.location.href = item.href;
    else window.open(item.href, '_blank', 'noopener,noreferrer');
}

function renderSearchResults(query) {
    const box = document.getElementById('home-search-results');
    const clear = document.getElementById('home-search-clear');
    if (!box) return;
    const q = normalizeSearchText(query);
    if (clear) clear.classList.toggle('show', Boolean(q));
    if (!q) {
        box.classList.remove('open');
        box.innerHTML = '';
        box.__results = [];
        return;
    }
    const results = buildSearchItems().filter(item => {
        return [item.title, item.meta, item.kind, item.href].some(part => normalizeSearchText(part).includes(q));
    }).slice(0, 9);
    activeSearchIndex = 0;
    box.classList.add('open');
    if (!results.length) {
        box.innerHTML = `<div class="search-empty">${escapeHtml(homeUiText('noResults'))}</div>`;
        return;
    }
    box.innerHTML = `
        <div class="search-head">
            <span>${results.length} ${escapeHtml(homeUiText('resultCount'))}</span>
            <span>${escapeHtml(homeUiText('keyboardHint'))}</span>
        </div>
    ` + results.map((item, index) => `
        <a class="search-result ${index === 0 ? 'active' : ''}" href="${item.href}" ${item.internal ? '' : 'target="_blank" rel="noopener noreferrer"'} data-search-index="${index}" role="option">
            <span class="search-result-icon">${escapeHtml(item.icon)}</span>
            <span>
                <span class="search-result-title">${escapeHtml(item.title)}</span>
                <span class="search-result-meta">${escapeHtml(item.meta || item.href)}</span>
            </span>
            <span class="search-result-kind">${escapeHtml(item.kind)}</span>
        </a>
    `).join('');
    box.querySelectorAll('.search-result').forEach((el, index) => {
        el.addEventListener('click', e => {
            e.preventDefault();
            openSearchItem(results[index]);
        });
    });
    box.__results = results;
}

function setActiveSearchResult(nextIndex) {
    const box = document.getElementById('home-search-results');
    if (!box || !box.__results || !box.__results.length) return;
    activeSearchIndex = (nextIndex + box.__results.length) % box.__results.length;
    box.querySelectorAll('.search-result').forEach((el, index) => {
        el.classList.toggle('active', index === activeSearchIndex);
    });
}

function initHomeSearch() {
    const input = document.getElementById('home-search-input');
    const box = document.getElementById('home-search-results');
    const clear = document.getElementById('home-search-clear');
    if (!input || !box) return;
    input.placeholder = homeUiText('searchPlaceholder');
    input.addEventListener('input', () => renderSearchResults(input.value));
    input.addEventListener('focus', () => renderSearchResults(input.value));
    if (clear) {
        clear.addEventListener('click', () => {
            input.value = '';
            renderSearchResults('');
            input.focus();
        });
    }
    input.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setActiveSearchResult(activeSearchIndex + 1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveSearchResult(activeSearchIndex - 1); }
        else if (e.key === 'Enter') {
            const item = box.__results && box.__results[activeSearchIndex];
            if (item) { e.preventDefault(); openSearchItem(item); }
        } else if (e.key === 'Escape') {
            box.classList.remove('open');
            input.blur();
        }
    });
    document.addEventListener('click', e => {
        if (!e.target.closest('.home-search')) box.classList.remove('open');
    });
    document.addEventListener('keydown', e => {
        const target = e.target;
        const isTyping = target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
        if (e.key === '/' && !isTyping && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            input.focus();
        }
    });
}

function renderContinueSection() {
    const section = document.getElementById('continue-section');
    const grid = document.getElementById('continue-grid');
    if (!section || !grid) return;
    const title = section.querySelector('.section-title span:last-child');
    if (title) title.textContent = homeUiText('continueTitle');
    const hist = getHist().slice(0, 6);
    section.classList.toggle('show', hist.length > 0);
    if (!hist.length) {
        grid.innerHTML = '';
        return;
    }
    grid.innerHTML = hist.map(x => `
        <a class="continue-card" href="${x.href}" ${x.href.startsWith('/') ? '' : 'target="_blank" rel="noopener noreferrer"'} onclick="addHist('${x.href}','${escapeHtml(x.name)}','${escapeHtml(x.icon)}')">
            <span class="continue-icon">${escapeHtml(x.icon)}</span>
            <span style="min-width:0;">
                <span class="continue-name">${escapeHtml(x.name)}</span>
                <span class="continue-sub">${escapeHtml(homeUiText('recent'))}</span>
            </span>
        </a>
    `).join('');
}

/* ── Render Pinned ── */
function renderPinned() {
    const grid = document.getElementById('pinned-grid');
    if (!grid) return;
    grid.innerHTML = PINNED.map(p => `
        <a class="pinned-card" href="${p.href}" target="_blank" rel="noopener noreferrer"
           onclick="addHist('${p.href}','${escapeHtml(p.name)}','${escapeHtml(p.icon)}')">
            <div class="pinned-card-top">
                <div class="pinned-icon">${escapeHtml(p.icon)}</div>
                <div>
                    <div class="pinned-name">${escapeHtml(p.name)}</div>
                    <div class="pinned-brand">${escapeHtml(p.brand)}</div>
                </div>
            </div>
            <div class="pinned-desc">${escapeHtml(p.desc[lang] || p.desc.zh)}</div>
        </a>
    `).join('');
}

/* ── Render AI Tools ── */
function renderAiTools(cat) {
    currentAiCat = cat;
    const grid  = document.getElementById('ai-grid');
    if (!grid) return;
    const items = cat === 'all' ? AI_TOOLS : AI_TOOLS.filter(x => x.cat === cat);
    grid.innerHTML = items.map(x => `
        <a class="ai-card" href="${x.href}" target="_blank" rel="noopener noreferrer"
           onclick="addHist('${x.href}','${escapeHtml(x.name)}','${escapeHtml(x.icon)}')">
            <div class="ic">${escapeHtml(x.icon)}</div>
            <h3>${escapeHtml(x.name)}</h3>
            <span class="tag">${escapeHtml(x.tag)}</span>
            <button class="fav-btn ${isFav(x.href)?'saved':''}" data-href="${x.href}"
                onclick="event.preventDefault();event.stopPropagation();toggleFav('${x.href}','${escapeHtml(x.name)}','${escapeHtml(x.icon)}')"
                title="${isFav(x.href)?'取消收藏':'收藏'}">${isFav(x.href)?'⭐':'☆'}</button>
        </a>
    `).join('');
}

/* ── Render Tools ── */
function renderTools(toolCat) {
    if (toolCat !== undefined) currentToolCat = toolCat;
    const host = document.getElementById('tools-host');
    if (!host) return;
    const cats = TOOLS[lang] || TOOLS.en;
    const filtered = currentToolCat === 'all' ? cats : cats.filter(cat => {
        const matchers = TOOL_CAT_MAP[currentToolCat] || [];
        return matchers.some(m => cat.title.includes(m) || m.includes(cat.title));
    });
    if (!filtered.length) {
        host.innerHTML = `<div class="loading" style="padding:32px;text-align:center;">无匹配分类</div>`;
        return;
    }
    host.innerHTML = filtered.map(cat => `
        <div class="tools-category">
            <h3 class="tools-cat-title">${escapeHtml(cat.title)}</h3>
            <div class="tools-grid">
                ${cat.items.map(x => `
        <a class="tool-card" href="${x.href}" ${x.int ? '' : 'target="_blank" rel="noopener noreferrer"'}
           onclick="addHist('${x.href}','${escapeHtml(x.title)}','${escapeHtml(x.icon)}')">
            <div class="ic">${escapeHtml(x.icon)}</div>
            <h3>${escapeHtml(x.title)}</h3>
            <span class="tag">${escapeHtml(x.tag)}</span>
            <button class="fav-btn ${isFav(x.href)?'saved':''}" data-href="${x.href}"
                onclick="event.preventDefault();event.stopPropagation();toggleFav('${x.href}','${escapeHtml(x.title)}','${escapeHtml(x.icon)}')"
                title="${isFav(x.href)?'取消收藏':'收藏'}">${isFav(x.href)?'⭐':'☆'}</button>
        </a>`).join('')}
            </div>
        </div>
    `).join('');
}

/* ── Favorites Drawer ── */
function renderFavDrawer() {
    const body = document.getElementById('fav-body');
    if (!body) return;
    const t = I18N[lang];
    const favs = getFavs();
    if (!favs.length) { body.innerHTML = `<div class="drawer-empty">${escapeHtml(t.drawer_empty_fav || '还没有收藏任何工具')}</div>`; return; }
    body.innerHTML = favs.map(x => `
        <a class="drawer-item" href="${x.href}" target="_blank" rel="noopener noreferrer"
           onclick="addHist('${x.href}','${escapeHtml(x.name)}','${escapeHtml(x.icon)}')">
            <span class="drawer-item-icon">${escapeHtml(x.icon)}</span>
            <div class="drawer-item-info">
                <div class="drawer-item-name">${escapeHtml(x.name)}</div>
            </div>
            <button class="drawer-item-del" onclick="event.preventDefault();event.stopPropagation();toggleFav('${x.href}','${escapeHtml(x.name)}','${escapeHtml(x.icon)}')">✕</button>
        </a>
    `).join('') + `<button class="drawer-clear" onclick="setFavs([]);renderFavDrawer();updateBadges();">${escapeHtml(t.drawer_clear || '清空收藏')}</button>`;
}

/* ── History Drawer ── */
function renderHistDrawer() {
    const body = document.getElementById('hist-body');
    if (!body) return;
    const t = I18N[lang];
    const hist = getHist();
    if (!hist.length) { body.innerHTML = `<div class="drawer-empty">${escapeHtml(t.drawer_empty_hist || '暂无使用记录')}</div>`; return; }
    body.innerHTML = hist.map(x => {
        const ago = Math.round((Date.now() - x.time) / 60000);
        const agoStr = ago < 60 ? ago + (lang === 'zh' ? ' 分钟前' : lang === 'ja' ? ' 分前' : ' min ago')
                     : ago < 1440 ? Math.floor(ago/60) + (lang === 'zh' ? ' 小时前' : lang === 'ja' ? ' 時間前' : ' hr ago')
                     : Math.floor(ago/1440) + (lang === 'zh' ? ' 天前' : lang === 'ja' ? ' 日前' : ' days ago');
        return `
        <a class="drawer-item" href="${x.href}" target="_blank" rel="noopener noreferrer"
           onclick="addHist('${x.href}','${escapeHtml(x.name)}','${escapeHtml(x.icon)}')">
            <span class="drawer-item-icon">${escapeHtml(x.icon)}</span>
            <div class="drawer-item-info">
                <div class="drawer-item-name">${escapeHtml(x.name)}</div>
                <div class="drawer-item-sub">${agoStr}</div>
            </div>
        </a>`;
    }).join('') + `<button class="drawer-clear" onclick="setHist([]);renderHistDrawer();updateBadges();">${escapeHtml(t.drawer_clear || '清空记录')}</button>`;
}

/* ── Dynamic Content (Dev.to + GitHub) ── */
async function loadDynamicContent() {
    const t = I18N[lang];
    const libHost = document.getElementById('library-host');
    const ossHost = document.getElementById('oss-host');
    const slidesHost = document.getElementById('slides-host');
    const softHost = document.getElementById('soft-host');

    if (libHost) libHost.innerHTML = `<div class="loading">${escapeHtml(t.loading)}</div>`;
    if (ossHost) ossHost.innerHTML = `<div class="loading">${escapeHtml(t.loading)}</div>`;
    if (slidesHost) slidesHost.innerHTML = `<div class="loading skeleton" style="height:120px;border-radius:14px;"></div>`;
    if (softHost) softHost.innerHTML = `<div class="loading skeleton" style="height:100px;border-radius:14px;grid-column:1/-1;"></div>`;

    try {
        const articles = await fetchDevTo('?per_page=12&top=7');
        const lib = articles.slice(0, 8);
        if (libHost) {
            libHost.innerHTML = lib.map(a => `
                <a class="list-item" href="${a.url}" target="_blank" rel="noopener noreferrer">
                    <img class="thumb" src="${a.cover_image || 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><rect fill="%2318181f" width="56" height="56"/><text x="28" y="32" text-anchor="middle" fill="%235a5a72" font-size="10">DEV</text></svg>')}" alt="" width="56" height="56" loading="lazy" decoding="async">
                    <div class="body">
                        <div class="t">${escapeHtml(a.title)}</div>
                        <div class="meta">${escapeHtml(a.user.name)} · ${relDate(a.published_at)}</div>
                    </div>
                </a>
            `).join('') || `<div class="loading">${escapeHtml(t.load_err)}</div>`;
        }
        if (slidesHost) {
            const withCover = articles.filter(a => a.cover_image).slice(0, 10);
            const slides = withCover.length >= 4 ? withCover : articles.slice(0, 8);
            slidesHost.innerHTML = `<div class="slides-scroll">
                ${slides.map(a => `
                    <a class="slide-card" href="${a.url}" target="_blank" rel="noopener noreferrer">
                        <div class="slide-cover-wrap">
                            <img src="${a.cover_image || 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="220" height="138"><rect fill="%2318181f" width="220" height="138"/></svg>')}" alt="" loading="lazy" decoding="async">
                            <span class="slide-badge">${a.reading_time_minutes != null ? a.reading_time_minutes + (lang === 'zh' ? ' 分钟' : lang === 'ja' ? ' 分' : ' min') : (a.public_reactions_count != null ? '♥ ' + a.public_reactions_count : 'DEV')}</span>
                        </div>
                        <div class="cap">${escapeHtml(a.title)}</div>
                    </a>
                `).join('')}
            </div>`;
        }
    } catch (e) {
        if (libHost) errBox('library-host', loadDynamicContent);
        if (slidesHost) errBox('slides-host', loadDynamicContent);
    }

    try {
        const data = await fetchGitHub('/search/repositories?q=stars:%3E3000&sort=stars&order=desc&per_page=8');
        renderOssList(data.items || []);
    } catch (e) {
        renderOssList(OSS_FALLBACK);
    }

    try {
        const soft = await fetchGitHub('/search/repositories?q=topic:cli+stars:%3E400&sort=stars&order=desc&per_page=9');
        renderSoftList(soft.items || []);
    } catch (e) {
        renderSoftList(SOFT_FALLBACK);
    }
}

function renderOssList(items) {
    const t = I18N[lang];
    const host = document.getElementById('oss-host');
    if (!host) return;
    host.innerHTML = (items || []).map(r => {
        const col = langColor(r.language);
        const desc = pickLocaleText(r.description || '');
        return `
            <a class="gh-item" href="${r.html_url}" target="_blank" rel="noopener noreferrer">
                <img class="gh-avatar" src="${r.owner.avatar_url}" alt="" width="40" height="40" loading="lazy" decoding="async">
                <div style="flex:1;min-width:0;">
                    <div class="gh-repo">${escapeHtml(r.full_name)}</div>
                    <div class="gh-desc">${escapeHtml(desc)}</div>
                    <div class="gh-foot">
                        ${r.language ? `<span style="display:inline-flex;align-items:center;gap:6px;"><span class="lang-dot" style="background:${col}"></span>${escapeHtml(r.language)}</span>` : ''}
                        ${r.stargazers_count ? `<span>★ ${fmtStars(r.stargazers_count)}</span>` : ''}
                    </div>
                </div>
            </a>`;
    }).join('') || `<div class="loading">${escapeHtml(t.load_err)}</div>`;
}

function renderSoftList(items) {
    const t = I18N[lang];
    const host = document.getElementById('soft-host');
    if (!host) return;
    host.innerHTML = (items || []).map(r => `
        <a class="soft-card" href="${r.html_url}" target="_blank" rel="noopener noreferrer">
            <img class="ico" src="${r.owner.avatar_url}" alt="" width="44" height="44" loading="lazy" decoding="async">
            <h4>${escapeHtml(r.name)}</h4>
            <p>${escapeHtml(pickLocaleText(r.description || '').slice(0, 120))}</p>
            <span class="plat">${escapeHtml(r.language || 'OSS')}</span>
        </a>
    `).join('') || `<div class="loading">${escapeHtml(t.load_err)}</div>`;
}

/* ── Language change handler ── */
function normalizeFriendUrl(url) {
    const value = String(url || '').trim();
    if (!value) return '';
    if (/^https?:\/\//i.test(value)) return value;
    return `https://${value}`;
}

function renderFriends(payload) {
    const host = document.getElementById('friends-host');
    if (!host) return;

    const links = ((payload && payload.links) || [])
        .filter(item => item && item.enabled !== false && item.name && item.url)
        .sort((a, b) => (a.order || 100) - (b.order || 100) || String(a.name).localeCompare(String(b.name)));

    if (!links.length) {
        host.innerHTML = `<div class="loading" style="grid-column:1/-1;">${escapeHtml(homeUiText('friendEmpty'))}</div>`;
        return;
    }

    host.innerHTML = links.map(item => {
        const href = normalizeFriendUrl(item.url);
        const desc = pickLocaleText(item.desc || '');
        const tag = item.tag || '';
        const icon = item.icon || String(item.name).trim().slice(0, 1).toUpperCase();
        const iconHtml = /^https?:\/\//i.test(icon)
            ? `<img src="${escapeHtml(icon)}" alt="" loading="lazy" decoding="async">`
            : escapeHtml(icon.slice(0, 4));

        return `
            <a class="friend-card" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">
                <span class="friend-icon">${iconHtml}</span>
                <span class="friend-body">
                    <span class="friend-name">${escapeHtml(item.name)}</span>
                    <span class="friend-desc">${escapeHtml(desc || href)}</span>
                </span>
                ${tag ? `<span class="friend-tag">${escapeHtml(tag)}</span>` : ''}
            </a>
        `;
    }).join('');
}

async function loadFriends() {
    const host = document.getElementById('friends-host');
    if (!host) return;
    try {
        const res = await fetch('/data/friends.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        renderFriends(await res.json());
    } catch (error) {
        host.innerHTML = `<div class="loading" style="grid-column:1/-1;">${escapeHtml(homeUiText('friendLoadError'))}</div>`;
    }
}

function onLangChange() {
    const t = I18N[lang];
    document.title = t.page_title;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.dataset.i18n;
        if (t[k] != null) el.textContent = t[k];
    });
    const searchInput = document.getElementById('home-search-input');
    if (searchInput) searchInput.placeholder = homeUiText('searchPlaceholder');
    renderPinned();
    renderAiTools(currentAiCat);
    renderTools();
    renderContinueSection();
    renderFavDrawer();
    renderHistDrawer();
    loadFriends();
    loadDynamicContent();
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function() {
    applyTheme(theme);
    applyLang(lang);

    const t = I18N[lang];
    document.title = t.page_title;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.dataset.i18n;
        if (t[k] != null) el.textContent = t[k];
    });

    renderPinned();
    renderAiTools('all');
    renderTools();
    renderContinueSection();
    initHomeSearch();
    loadFriends();
    loadDynamicContent();

    // AI tab switch
    const aiTabBar = document.getElementById('ai-tab-bar');
    if (aiTabBar) {
        aiTabBar.addEventListener('click', e => {
            const btn = e.target.closest('.ai-tab');
            if (!btn) return;
            document.querySelectorAll('.ai-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderAiTools(btn.dataset.aicat);
        });
    }

    // Tools tab switch
    const toolsTabBar = document.getElementById('tools-tab-bar');
    if (toolsTabBar) {
        toolsTabBar.addEventListener('click', e => {
            const btn = e.target.closest('.tools-tab');
            if (!btn) return;
            document.querySelectorAll('.tools-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTools(btn.dataset.toolcat);
        });
    }

    // Waline
    if (window.__walineInit) window.__walineInit(lang);
});
