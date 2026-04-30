/* ═══════════════════════════════════════════════════════════
   QuickToolLab — Common JS (theme, lang, favorites, utils)
   ═══════════════════════════════════════════════════════════ */

/* ── Utility ── */
function escapeHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

function relDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    const ms = Date.now() - d.getTime();
    const mins = Math.floor(ms / 60000);
    const hours = Math.floor(ms / 3600000);
    const days = Math.floor(ms / 86400000);
    if (lang === 'zh') {
        if (mins < 60) return Math.max(1, mins) + ' 分钟前';
        if (hours < 24) return hours + ' 小时前';
        if (days < 7) return days + ' 天前';
    } else if (lang === 'ja') {
        if (mins < 60) return Math.max(1, mins) + ' 分前';
        if (hours < 24) return hours + ' 時間前';
        if (days < 7) return days + ' 日前';
    } else {
        if (mins < 60) return Math.max(1, mins) + ' min ago';
        if (hours < 24) return hours + ' hr ago';
        if (days < 7) return days + ' days ago';
    }
    return d.toLocaleDateString(lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : 'en-US');
}

function fmtStars(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return String(n);
}

function langColor(name) {
    const map = { JavaScript:'#f1e05a', TypeScript:'#3178c6', Python:'#3572A5', Go:'#00ADD8', Rust:'#dea584', Ruby:'#701516', 'C++':'#f34b7d', C:'#555555', Swift:'#F05138', Kotlin:'#A97BFF', Java:'#b07219' };
    return map[name] || '#8b949e';
}

function pickLocaleText(value) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value[lang] || value.zh || value.en || value.ja || '';
}

/* ── Theme ── */
let theme = localStorage.getItem('pc_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function applyTheme(t) {
    theme = t;
    localStorage.setItem('pc_theme', t);
    document.documentElement.setAttribute('data-theme', t);
}

/* ── Language ── */
let lang = localStorage.getItem('pc_lang') || (navigator.language.startsWith('ja') ? 'ja' : navigator.language.startsWith('zh') ? 'zh' : 'en');

function applyLang(l) {
    lang = l;
    localStorage.setItem('pc_lang', l);
    document.documentElement.lang = l;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
}

/* ── Favorites & History ── */
function getFavs()  { try { return JSON.parse(localStorage.getItem('qtl_favs_v1')  || '[]'); } catch(_){ return []; } }
function getHist()  { try { return JSON.parse(localStorage.getItem('qtl_hist_v1')  || '[]'); } catch(_){ return []; } }
function setFavs(v) { localStorage.setItem('qtl_favs_v1',  JSON.stringify(v)); }
function setHist(v) { localStorage.setItem('qtl_hist_v1',  JSON.stringify(v)); }

function isFav(href) { return getFavs().some(x => x.href === href); }

function toggleFav(href, name, icon) {
    const favs = getFavs();
    const idx  = favs.findIndex(x => x.href === href);
    if (idx >= 0) favs.splice(idx, 1);
    else favs.unshift({ href, name, icon, time: Date.now() });
    setFavs(favs);
    updateBadges();
    if (typeof renderFavDrawer === 'function') renderFavDrawer();
    document.querySelectorAll(`.fav-btn[data-href="${CSS.escape(href)}"]`).forEach(btn => {
        btn.textContent = isFav(href) ? '⭐' : '☆';
        btn.classList.toggle('saved', isFav(href));
    });
}

function addHist(href, name, icon) {
    const hist = getHist().filter(x => x.href !== href);
    hist.unshift({ href, name, icon, time: Date.now() });
    setHist(hist.slice(0, 30));
    updateBadges();
    if (typeof renderHistDrawer === 'function') renderHistDrawer();
}

function updateBadges() {
    const fc = getFavs().length;
    const hc = getHist().length;
    const fb = document.getElementById('fav-badge');
    const hb = document.getElementById('hist-badge');
    if (fb) { fb.textContent = fc; fb.classList.toggle('show', fc > 0); }
    if (hb) { hb.textContent = hc; hb.classList.toggle('show', hc > 0); }
}

/* ── Drawer ── */
function openDrawer(drawerId, overlayId) {
    document.getElementById(drawerId).classList.add('open');
    document.getElementById(overlayId).classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeDrawer(drawerId, overlayId) {
    document.getElementById(drawerId).classList.remove('open');
    document.getElementById(overlayId).classList.remove('open');
    document.body.style.overflow = '';
}

/* ── API with Cache ── */
const GH_HEADERS = { Accept: 'application/vnd.github+json' };
const CACHE_PREFIX = 'qtl_cache_';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getCached(key) {
    try {
        const raw = localStorage.getItem(CACHE_PREFIX + key);
        if (!raw) return null;
        const { data, ts } = JSON.parse(raw);
        if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(CACHE_PREFIX + key); return null; }
        return data;
    } catch(_) { return null; }
}

function setCache(key, data) {
    try { localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, ts: Date.now() })); } catch(_) {}
}

async function fetchWithCache(key, url, opts) {
    const cached = getCached(key);
    if (cached) return cached;
    const r = await fetch(url, opts);
    if (!r.ok) throw new Error(url + ' ' + r.status);
    const data = await r.json();
    setCache(key, data);
    return data;
}

async function fetchDevTo(path) {
    return fetchWithCache('devto' + path, 'https://dev.to/api/articles' + path, { credentials: 'omit' });
}

async function fetchGitHub(path) {
    return fetchWithCache('gh' + path, 'https://api.github.com' + path, { headers: GH_HEADERS, credentials: 'omit' });
}

function errBox(hostId, onRetry) {
    const t = (typeof I18N !== 'undefined') ? I18N[lang] : {};
    const el = document.getElementById(hostId);
    if (!el) return;
    el.innerHTML = `<div class="error-box">${escapeHtml(t.load_err || '加载失败')}<br><button type="button" class="retry-btn">${escapeHtml(t.retry || '重试')}</button></div>`;
    el.querySelector('.retry-btn').addEventListener('click', onRetry);
}

/* ── Init common bindings ── */
document.addEventListener('DOMContentLoaded', function() {
    // Theme button
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('pc_theme')) applyTheme(e.matches ? 'dark' : 'light');
    });

    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.addEventListener('click', () => {
            applyLang(b.dataset.lang);
            if (typeof onLangChange === 'function') onLangChange();
        });
    });

    // Drawer buttons
    const favFab = document.getElementById('fav-fab');
    const histFab = document.getElementById('hist-fab');
    const favClose = document.getElementById('fav-close');
    const histClose = document.getElementById('hist-close');
    const favOverlay = document.getElementById('fav-overlay');
    const histOverlay = document.getElementById('hist-overlay');
    if (favFab) favFab.addEventListener('click', () => { if (typeof renderFavDrawer === 'function') renderFavDrawer(); openDrawer('fav-drawer','fav-overlay'); });
    if (histFab) histFab.addEventListener('click', () => { if (typeof renderHistDrawer === 'function') renderHistDrawer(); openDrawer('hist-drawer','hist-overlay'); });
    if (favClose) favClose.addEventListener('click', () => closeDrawer('fav-drawer','fav-overlay'));
    if (histClose) histClose.addEventListener('click', () => closeDrawer('hist-drawer','hist-overlay'));
    if (favOverlay) favOverlay.addEventListener('click', () => closeDrawer('fav-drawer','fav-overlay'));
    if (histOverlay) histOverlay.addEventListener('click', () => closeDrawer('hist-drawer','hist-overlay'));

    // Footer year
    const yearEl = document.getElementById('y');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    applyTheme(theme);
    applyLang(lang);
    updateBadges();
});
