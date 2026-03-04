import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Book {
  title: string
  author: string
}

const booksByCategory: Record<string, Book[]> = {
  'Computer Science & Math': [
    { title: 'Discrete Mathematics for Computer Scientists', author: 'Joe L. Mott, Abraham Kandel, Theodore P. Baker' },
    { title: 'Topics in Algebra', author: 'I.N. Herstein' },
    { title: 'Linear Algebra', author: 'Kenneth Hoffman, Ray Kunze' },
    { title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest, Stein' },
    { title: 'The Algorithm Design Manual', author: 'Steven Skiena' },
    { title: 'Discrete Maths', author: 'Kenneth Rosen' },
    { title: 'Computer Networking', author: 'Andrew Tanenbaum' },
    { title: 'Object-Oriented Modeling and Design', author: 'James Rumbaugh et al.' },
    { title: 'Design Patterns', author: 'Gang of Four' },
    { title: 'Programming Language Pragmatics', author: 'Michael Scott' },
  ],
  'Philosophy': [
    { title: 'The Republic', author: 'Plato' },
    { title: 'World as Will and Representation', author: 'Arthur Schopenhauer' },
    { title: 'Being and Nothingness', author: 'Jean-Paul Sartre' },
    { title: 'Nausea', author: 'Jean-Paul Sartre' },
    { title: 'The Rebel', author: 'Albert Camus' },
    { title: 'Man\'s Search for Meaning', author: 'Viktor Frankl' },
    { title: '1984', author: 'George Orwell' },
    { title: 'Critique of Pure Reason', author: 'Immanuel Kant' },
  ],
  'Literature': [
    { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky' },
    { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky' },
    { title: 'War and Peace', author: 'Leo Tolstoy' },
    { title: 'The Idiot', author: 'Fyodor Dostoevsky' },
    { title: 'Animal Farm', author: 'George Orwell' },
    { title: 'An Essay on the Principle of Population', author: 'Thomas Malthus' },
    { title: 'Thinking Fast and Slow', author: 'Daniel Kahneman' },
    { title: 'The Book of Disquiet', author: 'Fernando Pessoa' },
  ],
}

export default function Books() {
  const [openCategories, setOpenCategories] = useState<string[]>(Object.keys(booksByCategory))

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const allOpen = () => setOpenCategories(Object.keys(booksByCategory))
  const allClose = () => setOpenCategories([])

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold">Antilibrary</h1>
        <div className="flex gap-4 text-sm">
          <button 
            onClick={allOpen}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Expand All
          </button>
          <span className="text-slate-600">|</span>
          <button 
            onClick={allClose}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </motion.div>
      
      {Object.entries(booksByCategory).map(([category, books]) => (
        <div key={category} className="mb-4">
          <button 
            onClick={() => toggleCategory(category)}
            className="w-full text-left p-5 bg-slate-900 rounded-xl flex justify-between items-center hover:bg-slate-800 transition-colors duration-300 border border-slate-800 hover:border-cyan-500/30"
          >
            <span className="text-lg font-semibold text-slate-200">{category}</span>
            <span className="text-slate-500">({books.length})</span>
          </button>
          
          <AnimatePresence>
            {openCategories.includes(category) && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid md:grid-cols-2 gap-3">
                  {books.map((book, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="p-4 rounded-lg border border-slate-800 bg-slate-900/50"
                    >
                      <h3 className="font-medium text-slate-300">{book.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">{book.author}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
