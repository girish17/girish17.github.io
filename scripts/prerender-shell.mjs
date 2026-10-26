/**
 * GitHub Pages cannot rewrite URLs, so a client-side route like /projects would
 * otherwise be served the 404 page (with an HTTP 404 status, which search
 * engines treat as "does not exist"). This script writes a copy of the built
 * app shell to dist/<route>/index.html for every route, each with its own
 * title, description and canonical URL, so those paths return 200 and are
 * indexable. The SPA then renders the matching view on load.
 *
 * It also emits sitemap.xml and a noindex 404.html fallback.
 */
import fs from 'node:fs'
import path from 'node:path'

const DIST = 'dist'
const ORIGIN = 'https://girishm.info'
const TODAY = new Date().toISOString().slice(0, 10)

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function replaceOnce(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: expected markup not found: ${pattern}`)
  }
  return html.replace(pattern, replacement)
}

const routes = JSON.parse(fs.readFileSync('src/data/routes.json', 'utf8'))

const postsSource = fs.readFileSync('src/data/posts.ts', 'utf8')
const postPattern =
  /slug:\s*'([^']+)',\s*title:\s*'((?:[^'\\]|\\.)*)',\s*category:\s*'((?:[^'\\]|\\.)*)',\s*excerpt:\s*'((?:[^'\\]|\\.)*)',\s*date:\s*'([^']+)'/g
const unescape = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\')

const posts = [...postsSource.matchAll(postPattern)].map((m) => ({
  path: `/writings/${m[1]}`,
  title: `${unescape(m[2])} - Girish M`,
  description: unescape(m[4]),
  lastmod: m[5],
  changefreq: 'yearly',
  priority: '0.6',
}))

if (posts.length === 0) throw new Error('prerender: no posts parsed from src/data/posts.ts')

const shell = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')

function renderShell({ title, description, url, noindex = false }) {
  let html = shell
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  html = replaceOnce(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${esc(description)}" />`,
  )
  html = replaceOnce(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`,
  )
  html = replaceOnce(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${esc(title)}" />`,
  )
  html = replaceOnce(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${esc(description)}" />`,
  )
  html = replaceOnce(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`,
  )
  if (noindex) {
    html = replaceOnce(
      html,
      /<meta name="robots" content="[^"]*" \/>/,
      '<meta name="robots" content="noindex, follow" />',
    )
  }
  return html
}

function writePage(route) {
  const url = route.path === '/' ? `${ORIGIN}/` : `${ORIGIN}${route.path}/`
  let html = renderShell({ ...route, url })
  if (route.path !== '/') {
    // The VideoObject block belongs to the home page only.
    html = html.replace(/\n\s*<!-- Structured Data: introduction video -->[\s\S]*?<\/script>/, '')
  }
  const file =
    route.path === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route.path, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
  return url
}

const urls = routes.map(writePage)

for (const post of posts) urls.push(writePage(post))

fs.writeFileSync(
  path.join(DIST, '404.html'),
  renderShell({
    title: 'Page not found - Girish M',
    description: 'The page you are looking for does not exist.',
    url: `${ORIGIN}/404.html`,
    noindex: true,
  }),
)

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(
    (r) => `  <url>
    <loc>${ORIGIN}${r.path === '/' ? '/' : `${r.path}/`}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  ),
  ...posts.map(
    (p) => `  <url>
    <loc>${ORIGIN}${p.path}/</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  ),
  `  <url>
    <loc>${ORIGIN}/transcript.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>`,
  '</urlset>',
  '',
].join('\n')

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap)

console.log(
  `prerender: ${urls.length} route shells, 404.html and sitemap.xml (${urls.length + 1} URLs)`,
)
