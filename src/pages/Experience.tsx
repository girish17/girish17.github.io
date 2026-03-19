import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Software Consultant (AI/ML & Open Source)',
    period: 'August 2019 - Present',
    company: 'Independent',
    highlights: [
      'Working on matteralchemy.ai - AI/ML project for material discovery using MatterGen and MatterSim',
      'OpenProject integrations - Matrix/Element and Mattermost',
      'Yojana - Open source portfolio management software',
      'Open source software development and consulting',
    ],
    tech: ['TypeScript', 'JavaScript', 'Go', 'Python', 'Azure ML', 'Jupyter', 'Bash', 'Node.js', 'Flask'],
  },
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
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 border-l-2 border-cyan-500/50"
          >
            <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-500 rounded-full" />
            
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-200">{exp.role}</h2>
              <p className="text-slate-400">
                {exp.company} — <span className="text-cyan-400">{exp.period}</span>
              </p>
            </div>
            
            <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300">
              {exp.highlights.map((item, i) => (
                <li key={i} className="leading-relaxed">{item}</li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2">
              {exp.tech.map(t => (
                <span 
                  key={t}
                  className="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-400 rounded-full"
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
