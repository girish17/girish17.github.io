import { motion } from 'framer-motion'

const services = [
  {
    title: 'Server-side Software Development',
    description: 'Custom backend development using modern technologies.',
    tech: ['TypeScript', 'JavaScript', 'Java', 'Go'],
  },
  {
    title: 'Software Deployment & Orchestration',
    description: 'GNU/Linux OS and free software installation, deployment, configuration and maintenance.',
    tech: ['Linux', 'Docker', 'DevOps'],
  },
  {
    title: 'AI/ML Software Development',
    description: 'Custom AI/ML solutions using modern frameworks and cloud platforms.',
    tech: ['Azure ML', 'Python', 'Jupyter'],
  },
  {
    title: 'Open Source Consulting',
    description: 'Open source software development, integration, and advisory services. Experienced in navigating strict EU data privacy, GDPR-compliant environments, and secure communications.',
    tech: ['OpenProject', 'Mattermost', 'Community'],
  },
]

export default function Services() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Services
      </motion.h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
        Professional software development and consulting services.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-600/50 dark:hover:border-cyan-500/50 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-200">{service.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{service.description}</p>
            <div className="flex flex-wrap gap-2">
              {service.tech.map(t => (
                <span 
                  key={t}
                  className="px-3 py-1 text-sm font-medium bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

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
    </div>
  )
}