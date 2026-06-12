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
        
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            Girish is a <span className="font-semibold text-cyan-600 dark:text-cyan-400">Backend Architect</span> and <span className="font-semibold text-cyan-600 dark:text-cyan-400">Open Source Integration Specialist</span>. Currently architecting scalable multi-tenant infrastructure for{' '}
            Aether at{' '}
            <a href="https://matteralchemy.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline">matteralchemy.ai</a>, alongside maintaining integrations for the openDesk European open-source ecosystem.
          </p>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-800 dark:text-green-400 font-semibold">
              🟢 Currently available for B2B remote contracts | €25/hour
            </p>
          </div>
          <p className="mt-6">
            He is also a maintainer of several community projects, including
            OpenProject integrations and Mattermost plugins. Currently, he is building{' '}
            Yojana—an open source portfolio management 
            platform for small enterprises.
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
            className="inline-flex items-center px-8 py-4 bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-semibold rounded-lg hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors duration-300"
          >
            View Projects
          </Link>
          <a 
            href="https://www.linkedin.com/in/girish-m-a1b09b333/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 border border-cyan-600 dark:border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors duration-300"
          >
            LinkedIn Profile
          </a>
        </motion.div>

        <motion.div 
          className="mt-16 p-8 bg-slate-100 dark:bg-slate-800/50 rounded-2xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
            Looking for reliable backend integration bandwidth?
          </p>
          <a 
            href="mailto:contact@girishm.info"
            className="inline-flex items-center px-8 py-4 bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-semibold rounded-lg hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors duration-300"
          >
            Email Me Directly
          </a>
        </motion.div>
      </motion.section>
    </div>
  )
}