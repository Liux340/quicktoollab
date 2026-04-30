/* ═══════════════════════════════════════════════════════════
   QuickToolLab — Homepage Logic
   ═══════════════════════════════════════════════════════════ */

let currentAiCat = 'all';
let currentToolCat = 'all';

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
function onLangChange() {
    const t = I18N[lang];
    document.title = t.page_title;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.dataset.i18n;
        if (t[k] != null) el.textContent = t[k];
    });
    renderPinned();
    renderAiTools(currentAiCat);
    renderTools();
    renderFavDrawer();
    renderHistDrawer();
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
