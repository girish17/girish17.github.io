import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
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

interface ImageNote {
  url: string
  alt: string
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [content, setContent] = useState<string>('')
  const [metadata, setMetadata] = useState<PostMetadata>({ title: '', category: '', excerpt: '' })
  const [prevPost, setPrevPost] = useState<NavPost | null>(null)
  const [nextPost, setNextPost] = useState<NavPost | null>(null)
  
  // Lightbox state
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  // Extract images from content for navigation
  const images = useMemo(() => {
    const imgRegex = /\[([^\]]*)\]\(([^)]+\.(?:jpg|jpeg|png|gif))\)/g
    const foundImages: ImageNote[] = []
    let match
    while ((match = imgRegex.exec(content)) !== null) {
      foundImages.push({ alt: match[1], url: match[2] })
    }
    return foundImages
  }, [content])

  useEffect(() => {
    if (content) {
      window.scrollTo(0, 0);
      // MathJax 3 typesetting
      const postContent = document.getElementById('post-content');
      if (postContent && (window as any).MathJax && (window as any).MathJax.typesetPromise) {
        // Clear previous typesetting if any and typeset new content
        (window as any).MathJax.typesetPromise([postContent])
          .catch((err: any) => console.error('MathJax typeset failed:', err));
      }
    }
  }, [content])
  
  useEffect(() => {
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

  const openLightbox = (url: string) => {
    const index = images.findIndex(img => img.url === url)
    if (index !== -1) {
      setSelectedImageIndex(index)
    }
  }

  const navigateImage = (direction: 'next' | 'prev', e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedImageIndex === null) return
    
    if (direction === 'next') {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length)
    } else {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length)
    }
  }
  
  if (!content) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6">
        <Link to="/writings" className="text-cyan-600 dark:text-cyan-400 hover:underline">← Back to Blog</Link>
        <h1 className="text-2xl mt-8 text-slate-900 dark:text-slate-100">Post not found</h1>
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
          className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors mb-8"
        >
          ← Back to Blog
        </Link>
        
        <article>
          <header className="mb-10">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded-full mb-4">
              {metadata.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">{metadata.title}</h1>
          </header>
          
          <div id="post-content" className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                a: ({ node, ...props }) => {
                  const isImage = props.href?.match(/\.(?:jpg|jpeg|png|gif)$/)
                  if (isImage) {
                    return (
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          openLightbox(props.href || '')
                        }}
                        className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors underline decoration-cyan-500/30 underline-offset-4"
                      >
                        {props.children}
                      </button>
                    )
                  }
                  return <a {...props} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors" />
                },
                img: ({ src, alt, title }) => {
                  return (
                    <div className="flex flex-col items-center my-8">
                      <motion.img 
                        src={src}
                        alt={alt}
                        title={title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-cyan-500/50 transition-all shadow-lg"
                        onClick={() => openLightbox(src || '')}
                      />
                      {title && (
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 italic text-center">
                          {title}
                        </p>
                      )}
                    </div>
                  );
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
          
          <nav className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            {prevPost ? (
              <Link 
                to={`/writings/${prevPost.slug}`}
                className="group flex flex-col items-start"
              >
                <span className="text-sm text-slate-500 mb-1">← Previous</span>
                <span className="text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors text-left font-medium">
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
                <span className="text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors font-medium">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 text-slate-400 hover:text-white text-4xl z-50 p-2"
              onClick={() => setSelectedImageIndex(null)}
            >
              ×
            </button>

            {images.length > 1 && (
              <>
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
                  onClick={(e) => navigateImage('prev', e)}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
                  onClick={(e) => navigateImage('next', e)}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 text-sm bg-slate-900/50 px-4 py-2 rounded-full backdrop-blur-md">
                  {selectedImageIndex + 1} / {images.length}: {images[selectedImageIndex].alt}
                </div>
              </>
            )}

            <motion.img 
              key={selectedImageIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={images[selectedImageIndex].url} 
              alt={images[selectedImageIndex].alt}
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
