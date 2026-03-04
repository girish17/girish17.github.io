import { motion } from 'framer-motion'

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
            Girish is an <span className="font-semibold text-cyan-400">AI/ML engineer</span> specializing in 
            software-as-a-service solutions. He is a maintainer of several open source projects, including 
            OpenProject integrations and Mattermost plugins. Currently, he is building{' '}
            <span className="font-semibold text-slate-200">Yojana</span> — an open source portfolio management software 
            for small enterprises.
          </p>
          <p>
            Beyond technology, Girish pursues <span className="font-semibold text-slate-200">philosophy and literature</span> as 
            lifelong passions. He writes about his readings and experiences, exploring the intersection of 
            technology, thought, and culture.
          </p>
        </div>
        
        <motion.div 
          className="mt-12 flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a 
            href="/projects" 
            className="inline-flex items-center px-8 py-4 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors duration-300"
          >
            View Projects
          </a>
          <a 
            href="/writings" 
            className="inline-flex items-center px-8 py-4 border border-slate-600 font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-300"
          >
            Read Blog
          </a>
        </motion.div>
      </motion.section>
    </div>
  )
}
