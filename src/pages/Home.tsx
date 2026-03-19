import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
          Hello World!
        </h1>
        
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-slate-300">
          <p>
            Girish is an <span className="font-semibold text-cyan-400">AI/ML Engineer</span> focused on
            SaaS solutions and open source. Since October 2025, he has been leading the development of{' '}
            <span className="font-semibold text-slate-200">Aether</span> at{' '}
            <span className="font-semibold text-slate-200">matteralchemy.ai</span>, an AI-driven platform for 
            material discovery. 
          </p>
          <p>
            He is also a maintainer of several community projects, including
            OpenProject integrations and Mattermost plugins. Currently, he is building{' '}
            <span className="font-semibold text-slate-200">Yojana</span>—an open source portfolio management 
            platform for small enterprises.
          </p>
          <p>
            Beyond engineering, Girish is deeply passionate about <span className="font-semibold text-slate-200">philosophy and literature</span>. 
            He writes about his readings and experiences, exploring the intersections of 
            technology, thought, and culture.
          </p>
        </div>
        
        <motion.div 
          className="mt-12 flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link 
            to="/projects" 
            className="inline-flex items-center px-8 py-4 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors duration-300"
          >
            View Projects
          </Link>
          <Link 
            to="/writings" 
            className="inline-flex items-center px-8 py-4 border border-slate-600 font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-300"
          >
            Read Blog
          </Link>
        </motion.div>
      </motion.section>
    </div>
  )
}
