import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Books from './pages/Books'
import Writings from './pages/Writings'
import Photos from './pages/Photos'
import BlogPost from './pages/blog/MarkdownBlogPost'
import routes from './data/routes.json'
import { posts } from './data/posts'

/** Keep the document title and description in step with the current route. */
function DocumentMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const current = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/'
    const route = routes.find((r) => r.path === current)
    let title = route?.title ?? routes[0].title
    let description = route?.description ?? routes[0].description

    const slug = current.startsWith('/writings/') ? current.split('/')[2] : undefined
    const post = slug ? posts.find((p) => p.slug === slug) : undefined
    if (post) {
      title = `${post.title} - Girish M`
      description = post.excerpt
    }

    document.title = title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description)
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', title)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', description)
  }, [pathname])

  return null
}

function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-3">
        404
      </p>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">That page does not exist</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">
        The link may be old, or the address may have a typo.
      </p>
      <Link
        to="/"
        className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        Back to the home page
      </Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <DocumentMeta />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experience" element={<Experience />} />
          <Route path="books" element={<Books />} />
          <Route path="writings" element={<Writings />} />
          <Route path="writings/:slug" element={<BlogPost />} />
          <Route path="photos" element={<Photos />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
