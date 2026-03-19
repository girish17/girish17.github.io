import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { getPostContent } from '../../data/postsContent'
import { posts } from '../../data/posts'

interface PostMetadata {
  title: string
  category: string
  excerpt: string
}

interface NavPost {
  slug: string
  title: string
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [content, setContent] = useState<string>('')
  const [metadata, setMetadata] = useState<PostMetadata>({ title: '', category: '', excerpt: '' })
  const [prevPost, setPrevPost] = useState<NavPost | null>(null)
  const [nextPost, setNextPost] = useState<NavPost | null>(null)
  
  useEffect(() => {
    if (content && (window as any).MathJax) {
      setTimeout(() => {
        (window as any).MathJax.typesetPromise?.()
      }, 100)
    }
  }, [content])
  
  useEffect(() => {
    window.scrollTo(0, 0)
    const result = getPostContent(slug || '')
    if (result) {
      setMetadata(result.metadata)
      setContent(result.content)
      
      const currentIndex = posts.findIndex(p => p.slug === slug)
      if (currentIndex > 0) {
        setPrevPost(posts[currentIndex - 1])
      } else {
        setPrevPost(null)
      }
      if (currentIndex < posts.length - 1) {
        setNextPost(posts[currentIndex + 1])
      } else {
        setNextPost(null)
      }
    }
  }, [slug])
  
  if (!content) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6">
        <Link to="/writings" className="text-cyan-400 hover:underline">← Back to Blog</Link>
        <h1 className="text-2xl mt-8">Post not found</h1>
      </div>
    )
  }
  
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          to="/writings" 
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
        >
          ← Back to Blog
        </Link>
        
        <article>
          <header className="mb-10">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-cyan-900/30 text-cyan-400 rounded-full mb-4">
              {metadata.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-100 leading-tight">{metadata.title}</h1>
          </header>
          
          <div className="prose-lg max-w-none text-slate-300">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          
          <nav className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center">
            {prevPost ? (
              <Link 
                to={`/writings/${prevPost.slug}`}
                className="group flex flex-col items-start"
              >
                <span className="text-sm text-slate-500 mb-1">← Previous</span>
                <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            
            {nextPost ? (
              <Link 
                to={`/writings/${nextPost.slug}`}
                className="group flex flex-col items-end text-right"
              >
                <span className="text-sm text-slate-500 mb-1">Next →</span>
                <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>
      </motion.div>
    </div>
  )
}
