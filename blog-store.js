export const BLOG_STORAGE_KEY = 'qtl_blog_posts_v2';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizePost(post) {
  return {
    id: String(post.id || '').trim(),
    slug: String(post.slug || post.id || '').trim(),
    date: String(post.date || '').trim(),
    readTime: String(post.readTime || '5 min').trim(),
    cover: String(post.cover || 'linear-gradient(135deg, rgba(249,115,22,.22), rgba(20,184,166,.18))').trim(),
    category: {
      zh: String(post.category?.zh || ''),
      en: String(post.category?.en || ''),
      ja: String(post.category?.ja || '')
    },
    tags: {
      zh: Array.isArray(post.tags?.zh) ? post.tags.zh.map(String) : [],
      en: Array.isArray(post.tags?.en) ? post.tags.en.map(String) : [],
      ja: Array.isArray(post.tags?.ja) ? post.tags.ja.map(String) : []
    },
    title: {
      zh: String(post.title?.zh || ''),
      en: String(post.title?.en || ''),
      ja: String(post.title?.ja || '')
    },
    excerpt: {
      zh: String(post.excerpt?.zh || ''),
      en: String(post.excerpt?.en || ''),
      ja: String(post.excerpt?.ja || '')
    },
    contentHtml: {
      zh: String(post.contentHtml?.zh || ''),
      en: String(post.contentHtml?.en || ''),
      ja: String(post.contentHtml?.ja || '')
    }
  };
}

function sortPosts(posts) {
  return posts.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(a.id).localeCompare(String(b.id)));
}

export function getLocalized(field, lang) {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field.zh || field.en || field.ja || '';
}

export function stripHtml(value) {
  const div = document.createElement('div');
  div.innerHTML = value || '';
  return (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim();
}

export async function loadDefaultPosts() {
  const response = await fetch('/blog-posts.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to load default blog posts');
  const posts = await response.json();
  return sortPosts(posts.map(normalizePost));
}

export async function loadBlogPosts() {
  const raw = localStorage.getItem(BLOG_STORAGE_KEY);
  if (!raw) return loadDefaultPosts();
  try {
    const parsed = JSON.parse(raw);
    return sortPosts(parsed.map(normalizePost));
  } catch (error) {
    console.warn('Invalid local blog data, falling back to defaults', error);
    return loadDefaultPosts();
  }
}

export async function saveBlogPosts(posts) {
  const normalized = sortPosts(posts.map(normalizePost));
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(normalized, null, 2));
  return clone(normalized);
}

export async function resetBlogPosts() {
  localStorage.removeItem(BLOG_STORAGE_KEY);
  return loadDefaultPosts();
}

export function exportBlogPosts(posts) {
  return JSON.stringify(sortPosts(posts.map(normalizePost)), null, 2);
}

export async function importBlogPosts(rawText) {
  const parsed = JSON.parse(rawText);
  if (!Array.isArray(parsed)) throw new Error('JSON must be an array of posts');
  return saveBlogPosts(parsed);
}
