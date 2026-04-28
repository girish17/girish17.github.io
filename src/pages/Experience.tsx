import { motion } from 'framer-motion'
import { useState } from 'react'

const currentExperience = {
  role: 'Software Consultant (Backend Architecture & Open Source)',
  period: 'August 2019 - Present',
  company: 'Independent',
  highlights: [
    'Architecting scalable multi-tenant infrastructure for AI/ML SaaS platform',
    'OpenProject integrations - Matrix/Element and Mattermost for enterprise collaboration',
    'Building Yojana - Open source portfolio management software for small enterprises',
    'Open source software development and consulting for European ecosystem',
  ],
  tech: ['TypeScript', 'Go', 'Python', 'Azure ML', 'Node.js', 'Flask'],
}

const recentExperience = [
  {
    role: 'Software Developer',
    period: 'January 2019 - July 2019',
    company: '42Hz (acquired by Cisco)',
    highlights: [
      'Developed microservices for Cisco WebEx Teams',
      'Pair programming, bug fixing, code review',
      'RESTful API development for CRUD operations',
    ],
    tech: ['JavaScript ES6', 'Java 8', 'Spring Boot', 'Postgres', 'Docker'],
  },
]

const archivedExperience = [
  {
    role: 'Project Engineer - I (Software)',
    period: 'December 2017 - December 2018',
    company: 'Indian Institute of Astrophysics',
    highlights: [
      'Member of the India Thirty Meter Telescope (TMT) Software team',
      'Quality assurance and vendor coordination',
      'Test automation using shell scripts',
    ],
    tech: ['Java 8', 'Scala', 'Bash', 'Redis', 'Kafka', 'Jira'],
  },
  {
    role: 'Teaching Assistant',
    period: 'August 2017 - December 2017',
    company: 'Indian Institute of Science',
    highlights: [
      'Teaching assistant for Algorithms and Programming course',
      'Course administration and evaluation',
    ],
    tech: ['C', 'Bash', 'Vim', 'GDB'],
  },
  {
    role: 'Software Engineer',
    period: 'November 2012 - November 2016',
    company: 'Bharat Electronics Limited',
    highlights: [
      'Requirements elicitation and software design',
      'JavaScript/jQuery frontend development',
      'RESTful web services with Spring MVC, Hibernate',
    ],
    tech: ['Java 7', 'JavaScript', 'Spring MVC', 'Hibernate', 'jQuery', 'Oracle'],
  },
]

export default function Experience() {
  const [showArchived, setShowArchived] = useState(false)

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h1>
      
      <div className="space-y-12">
        {/* Current Role */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative pl-8 border-l-2 border-cyan-600 dark:border-cyan-500"
        >
          <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-600 dark:bg-cyan-500 rounded-full" />
          
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-200">{currentExperience.role}</h2>
            <p className="text-slate-600 dark:text-slate-400">
              {currentExperience.company} — <span className="text-cyan-600 dark:text-cyan-400">{currentExperience.period}</span>
            </p>
          </div>
          
          <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700 dark:text-slate-300">
            {currentExperience.highlights.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ul>
          
          <div className="flex flex-wrap gap-2">
            {currentExperience.tech.map(t => (
              <span 
                key={t}
                className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Recent Experience */}
        {recentExperience.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative pl-8 border-l-2 border-slate-300 dark:border-slate-700"
          >
            <div className="absolute -left-2 top-0 w-4 h-4 bg-slate-400 dark:bg-slate-600 rounded-full" />
            
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-200">{exp.role}</h2>
              <p className="text-slate-600 dark:text-slate-400">
                {exp.company} — <span className="text-slate-500 dark:text-slate-500">{exp.period}</span>
              </p>
            </div>
            
            <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700 dark:text-slate-300">
              {exp.highlights.map((item, i) => (
                <li key={i} className="leading-relaxed">{item}</li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2">
              {exp.tech.map(t => (
                <span 
                  key={t}
                  className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Archived Experience */}
        <section>
          <button 
            onClick={() => setShowArchived(!showArchived)}
            className="flex items-center gap-2 text-lg font-medium text-slate-500 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors mb-6"
          >
            <span className={`transform transition-transform duration-300 ${showArchived ? 'rotate-90' : ''}`}>▶</span>
            Earlier Experience
          </button>
          
          {showArchived && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {archivedExperience.map((exp, index) => (
                <div 
                  key={index}
                  className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-slate-300 dark:bg-slate-700 rounded-full opacity-50" />
                  
                  <div className="mb-4">
                    <h2 className="text-lg font-medium text-slate-600 dark:text-slate-500">{exp.role}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-600">
                      {exp.company} — {exp.period}
                    </p>
                  </div>
                  
                  <ul className="list-disc list-inside space-y-1 mb-3 text-slate-500 dark:text-slate-600 text-sm">
                    {exp.highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map(t => (
                      <span 
                        key={t}
                        className="px-2 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  )
}