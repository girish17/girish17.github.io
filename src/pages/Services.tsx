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
    description: 'Open source software development, integration, and advisory services.',
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
      <p className="text-lg text-slate-400 mb-12">
        Professional software development and consulting services.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/50 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-4 text-slate-200">{service.title}</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">{service.description}</p>
            <div className="flex flex-wrap gap-2">
              {service.tech.map(t => (
                <span 
                  key={t}
                  className="px-3 py-1 text-sm font-medium bg-slate-800 text-cyan-400 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
