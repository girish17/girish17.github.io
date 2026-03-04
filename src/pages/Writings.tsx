import { useState } from 'react'
import { motion } from 'framer-motion'
import { posts } from '../data/posts'

const flossPosts = [
  { title: 'Free or Proprietary?', slug: 'free-or-proprietary' },
  { title: 'Do users control the software they use?', slug: 'do-users-control-software' },
  { title: 'My Free Software Journey', slug: 'free-software-journey' },
]

const archivedPosts = [
  { title: 'An Affair with C++', slug: 'affair-with-cpp', reason: 'Outdated tech' },
  { title: 'A Critique of C++', slug: 'critique-of-cpp', reason: 'Outdated tech' },
  { title: 'Forever without Facebook', slug: 'without-fb', reason: 'Outdated' },
  { title: 'Why you should give up Apple products', slug: 'give-up-apple', reason: 'Outdated' },
  { title: 'My computer', slug: 'my-computer', reason: 'Outdated' },
]

export default function Writings() {
  const [showArchived, setShowArchived] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Blog
      </motion.h1>
      
      <section className="mb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.a 
              key={post.slug}
              href={`/writings/${post.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="block p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/50 transition-all duration-300 group"
            >
              <span className="inline-block px-2 py-1 text-xs font-medium bg-cyan-900/30 text-cyan-400 rounded mb-3">
                {post.category}
              </span>
              <h2 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">{post.title}</h2>
              <p className="text-sm text-slate-400">{post.excerpt}</p>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-cyan-400">Coming Soon</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {flossPosts.map((post, index) => (
            <motion.a 
              key={post.slug}
              href={`/writings/${post.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="block p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/50 transition-all duration-300"
            >
              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-900/30 text-blue-400 rounded mb-3">
                Coming soon
              </span>
              <h2 className="text-lg font-semibold">{post.title}</h2>
            </motion.a>
          ))}
        </div>
      </section>

      <section>
        <button 
          onClick={() => setShowArchived(!showArchived)}
          className="flex items-center gap-2 text-lg font-medium text-slate-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <span className={`transform transition-transform duration-300 ${showArchived ? 'rotate-90' : ''}`}>▶</span>
          Archived Posts ({archivedPosts.length})
        </button>
        
        {showArchived && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {archivedPosts.map(post => (
              <div key={post.slug} className="p-4 rounded-xl border border-slate-800 bg-slate-900/30">
                <h2 className="font-medium text-slate-300 mb-1">{post.title}</h2>
                <p className="text-xs text-slate-500">{post.reason}</p>
              </div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  )
}
