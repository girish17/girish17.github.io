import { useState } from 'react'
import { motion } from 'framer-motion'

const currentProjects = [
  {
    name: 'matteralchemy.ai',
    description: 'AI/ML project for material discovery using MatterGen and MatterSim models. Features a material designer with periodic table UI.',
    tech: 'Azure ML, Python, Jupyter, Bash',
    link: 'https://matteralchemy.ai',
  },
  {
    name: 'Yojana',
    description: 'Open source portfolio management software for small enterprises and teams. No vendor lock-in, free and open source.',
    tech: 'Open source',
    link: 'https://github.com/girish17/yojana',
  },
  {
    name: 'OpenProject Integrations',
    description: 'Matrix/Element and Mattermost integrations for OpenProject project management software.',
    tech: 'TypeScript, Go, Python',
    link: 'https://github.com/girish17/op-matrix',
  },
  {
    name: 'op-mattermost',
    description: 'OpenProject integration for Mattermost - slash commands and plugin.',
    tech: 'Go, TypeScript',
    link: 'https://github.com/girish17/op-mattermost',
  },
]

const pastProjects = [
  {
    name: 'Thirty Meter Telescope (TMT)',
    description: 'Observatory software development for the TMT project.',
    link: 'https://www.tmt.org',
  },
  {
    name: 'Cisco WebEx Teams',
    description: 'Microservices development for Cisco WebEx Teams.',
    link: 'https://webex.com',
  },
  {
    name: 'CIDSS',
    description: 'Command Information and Decision Support System for Bharat Electronics.',
    link: 'https://bel-india.in',
  },
]

export default function Projects() {
  const [showPast, setShowPast] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h1>
      
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-6 text-cyan-400">Current Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {currentProjects.map((project, index) => (
            <motion.a 
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="block p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/50 transition-all duration-300 group"
            >
              <h3 className="text-xl font-semibold mb-4 group-hover:text-cyan-400 transition-colors">
                {project.name}
              </h3>
              <p className="mb-4 text-slate-400 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.split(', ').map(t => (
                  <span 
                    key={t}
                    className="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section>
        <button 
          onClick={() => setShowPast(!showPast)}
          className="flex items-center gap-2 text-lg font-medium text-slate-400 hover:text-cyan-400 transition-colors mb-6"
        >
          <span className={`transform transition-transform duration-300 ${showPast ? 'rotate-90' : ''}`}>▶</span>
          Past Projects
        </button>
        
        {showPast && (
          <motion.div 
            className="grid md:grid-cols-3 gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            {pastProjects.map(project => (
              <a 
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors bg-slate-900/30"
              >
                <h3 className="font-medium mb-2 text-slate-300">{project.name}</h3>
                <p className="text-sm text-slate-500">{project.description}</p>
              </a>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  )
}
