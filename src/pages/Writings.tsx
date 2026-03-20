import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { posts } from '../data/posts'
import type { Post } from '../data/posts'

const archivedPosts = [
  { title: 'An Affair with C++', slug: 'affair-with-cpp', reason: 'Outdated tech' },
  { title: 'A Critique of C++', slug: 'critique-of-cpp', reason: 'Outdated tech' },
  { title: 'Forever without Facebook', slug: 'without-fb', reason: 'Outdated' },
  { title: 'Why you should give up Apple products', slug: 'give-up-apple', reason: 'Outdated' },
  { title: 'My computer', slug: 'my-computer', reason: 'Outdated' },
]

export default function Writings() {
  const [showArchived, setShowArchived] = useState(false)
  
  // Group and sort posts by category
  const categorizedPosts = useMemo(() => {
    const groups: Record<string, Post[]> = {}
    posts.forEach(post => {
      if (!groups[post.category]) {
        groups[post.category] = []
      }
      groups[post.category].push(post)
    })
    
    // Sort categories: Philosophy/AI, Philosophy, others alphabetical, Personal last
    return Object.entries(groups).sort(([a], [b]) => {
      const priority: Record<string, number> = {
        'Philosophy/AI': 1,
        'Philosophy': 2,
        'Personal': 100
      }
      
      const aPriority = priority[a] ?? 50
      const bPriority = priority[b] ?? 50
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority
      }
      
      return a.localeCompare(b)
    })
  }, [])

  const [openCategories, setOpenCategories] = useState<string[]>(
    categorizedPosts.map(([cat]) => cat)
  )

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const allOpen = () => setOpenCategories(categorizedPosts.map(([cat]) => cat))
  const allClose = () => setOpenCategories([])

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
        <div className="flex gap-4 text-sm">
          <button 
            onClick={allOpen}
            className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
          >
            Expand All
          </button>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <button 
            onClick={allClose}
            className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </motion.div>

      <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-2xl">
        Reflections on technology, philosophy, and the pursuit of software freedom.
      </p>
      
      <div className="space-y-6 mb-16">
        {categorizedPosts.map(([category, categoryPosts]) => (
          <div key={category} className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <button 
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between py-2 group"
            >
              <h2 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors flex items-center gap-3">
                <span className={`text-sm transition-transform duration-300 ${openCategories.includes(category) ? 'rotate-90' : ''}`}>
                  ▶
                </span>
                {category}
              </h2>
              <span className="text-slate-500 text-sm">{categoryPosts.length} posts</span>
            </button>

            <AnimatePresence>
              {openCategories.includes(category) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {categoryPosts.map((post, index) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link 
                          to={`/writings/${post.slug}`}
                          className="block p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-600/50 dark:hover:border-cyan-500/50 hover:bg-white dark:hover:bg-slate-900/50 transition-all duration-300 group h-full"
                        >
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors text-slate-900 dark:text-slate-200">{post.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <section>
        <button 
          onClick={() => setShowArchived(!showArchived)}
          className="flex items-center gap-2 text-lg font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors mb-6"
        >
          <span className={`transform transition-transform duration-300 ${showArchived ? 'rotate-90' : ''}`}>▶</span>
          Archived Posts ({archivedPosts.length})
        </button>
        
        <AnimatePresence>
          {showArchived && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
                {archivedPosts.map(post => (
                  <div key={post.slug} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
                    <h2 className="font-medium text-slate-800 dark:text-slate-300 mb-1">{post.title}</h2>
                    <p className="text-xs text-slate-500">{post.reason}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}
