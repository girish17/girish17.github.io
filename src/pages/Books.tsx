import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

interface Book {
  title: string
  author: string
  edition?: string
  year?: string
  slug?: string
}

const booksByCategory: Record<string, Book[]> = {
  'Computer Science: Programming & Languages': [
    { title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', edition: '3rd Edition' },
    { title: 'The C Programming Language', author: 'Kernighan, Ritchie', edition: '2nd Edition' },
    { title: 'Effective Java', author: 'Bloch', edition: '3rd Edition' },
    { title: 'JavaScript: The Good Parts', author: 'Crockford' },
    { title: 'Introducing Python', author: 'Lubanovic' },
    { title: 'J2ME: The Complete Reference', author: 'Keogh, James' },
    { title: 'Object Oriented Programming in Turbo C++', author: 'Robert Lafore' },
    { title: 'C++ FAQs', author: 'Cline, Lomow, Girou', edition: '2nd Edition' },
    { title: 'Java Complete Reference', author: 'Schildt', edition: '7th Edition' },
    { title: 'Full Stack Javascript', author: 'Mardan' },
    { title: 'Visual Basic 6 Programming Black Book', author: 'Holzner' },
  ],
  'Computer Science: Algorithms & Data Structures': [
    { title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest, Stein', edition: '3rd Edition' },
    { title: 'Introduction to Design and Analysis of Algorithms', author: 'Levitin', edition: '2nd Edition' },
    { title: 'Data Structures using C and C++', author: 'Langsam, Augenstein, Tenenbaum', edition: '2nd Edition' },
    { title: 'Data Structures and Algorithm Analysis in C++', author: 'Weiss', edition: '3rd Edition' },
    { title: 'Algorithm Design Manual', author: 'Skiena', edition: '2nd Edition' },
    { title: 'Fundamentals of Data Structures in C', author: 'Horowitz, Sahni, Anderson-Freed', edition: '2nd Edition' },
    { title: 'Data Structure and Algorithm Analysis in C', author: 'Weiss', edition: '2nd Edition' },
    { title: 'Data Structures Through C', author: 'Yashavant Kanetkar' },
    { title: 'Data Structures and Algorithms Made Easy', author: 'Narasimha Karumanchi' },
  ],
  'Computer Science: Architecture, Systems & Theory': [
    { title: 'The 8051 Microcontroller', author: 'Ayala', edition: '3rd Edition' },
    { title: 'Microcomputer Systems: The 8086/8088 Family', author: 'Liu, Gibson', edition: '2nd Edition' },
    { title: 'Computer Networking', author: 'Kurose, Ross', edition: '6th Edition' },
    { title: 'Design Patterns', author: 'Gamma, Helm, Johnson, Vlissides' },
    { title: 'Object Oriented Modeling and Design with UML', author: 'Blaha, Rumbaugh', edition: '2nd Edition' },
    { title: 'Database Management Systems', author: 'Ramakrishnan, Gehrke', edition: '3rd Edition' },
    { title: 'Digital Design', author: 'Mano, Ciletti', edition: '4th Edition' },
    { title: 'An Introduction to Formal Languages and Automata', author: 'Linz', edition: '4th Edition' },
    { title: 'Introduction to Automata Theory, Languages and Computation', author: 'Hopcroft, Motwani, Ullman', edition: '3rd Edition' },
    { title: 'An Embedded Software Primer', author: 'Simon' },
    { title: 'The Quality Toolbox', author: 'Nancy R. Tague', edition: '2nd Edition' },
    { title: 'The Magic Garden Explained', author: 'Goodheart, Cox' },
    { title: 'The Magic Garden Explained Solution Manual', author: 'Goodheart' },
    { title: 'Computer Organization', author: 'Hamacher, Vranesic, Zaky', edition: '5th Edition' },
    { title: 'Operating System Principles', author: 'Silberschatz, Galvin, Gagne', edition: '7th Edition' },
    { title: 'The Art of Computer Systems Performance Analysis', author: 'Jain' },
  ],
  'Mathematics & Sciences': [
    { title: 'Graph Theory and Combinatorics', author: 'Dr. D.S.C' },
    { title: 'Topics in Algebra', author: 'Herstein', slug: 'topics-in-algebra', edition: '2nd Edition', year: '1964' },
    { title: 'Higher Engineering Mathematics', author: 'Dr. B.S. Grewal' },
    { title: 'Discrete Mathematics for Computer Scientists and Mathematicians', author: 'Mott, Kandel, Baker', edition: '2nd Edition', year: '1986' },
    { title: 'Advanced Engineering Mathematics', author: 'Kreyszig', edition: '8th Edition', year: '1962' },
    { title: 'Advanced Engineering Mathematics Student Solution Manual', author: 'Kreyszig' },
    { title: 'Discrete and Combinatorial Mathematics', author: 'Grimaldi, Ramana', edition: '5th Edition', year: '1985' },
    { title: 'Operations Research', author: 'S.D. Sharma' },
    { title: 'Linear Algebra', author: 'Hoffman, Kunze', slug: 'fields', edition: '2nd Edition', year: '1961' },
    { title: 'How to Solve It', author: 'George Polya', year: '1945' },
    { title: 'Principles of Electronics', author: 'V.K Mehta, Rohit Mehta' },
    { title: 'Engineering Chemistry', author: 'R.V Gadag, A.N Shetty' },
    { title: 'Fundamentals of Physics', author: 'Halliday, Resnick, Walker', edition: '6th Edition', year: '1960' },
  ],
  'Philosophy': [
    { title: 'The Trouble with Being Born', author: 'E.M. Cioran', year: '1973' },
    { title: 'Nausea', author: 'Jean-Paul Sartre', year: '1938' },
    { title: 'The Rebel', author: 'Albert Camus', year: '1951' },
    { title: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche', year: '1883' },
    { title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche', year: '1886' },
    { title: 'Meditations', author: 'Marcus Aurelius', year: '180 CE' },
    { title: 'The Republic', author: 'Plato', year: '375 BCE' },
    { title: 'The Essential Rumi', author: 'Coleman Barks', year: '1995' },
  ],
  'Literature & Fiction': [
    { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', year: '1866' },
    { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', year: '1880' },
    { title: 'The Idiot', author: 'Fyodor Dostoevsky', year: '1869' },
    { title: 'White Nights', author: 'Fyodor Dostoevsky', year: '1848' },
    { title: 'War and Peace', author: 'Leo Tolstoy', year: '1869' },
    { title: 'Anna Karenina', author: 'Leo Tolstoy', year: '1878' },
    { title: '50 Greatest Short Stories', author: 'Terry O\'Brien', year: '2015' },
    { title: 'Women in Love', author: 'D.H. Lawrence', year: '1920' },
    { title: 'Atlas Shrugged', author: 'Ayn Rand', year: '1957' },
    { title: 'The Fountainhead', author: 'Ayn Rand', year: '1943' },
    { title: 'Moby-Dick', author: 'Herman Melville', year: '1851' },
    { title: 'Metamorphosis', author: 'Franz Kafka', year: '1915' },
    { title: 'Animal Farm', author: 'George Orwell', year: '1945' },
    { title: '1984', author: 'George Orwell', year: '1949' },
    { title: 'Far from the Madding Crowd', author: 'Thomas Hardy', year: '1874' },
    { title: 'Pride and Prejudice', author: 'Jane Austen', year: '1813' },
    { title: 'American Notes', author: 'Charles Dickens', year: '1842' },
    { title: 'Complete Works', author: 'Charles Dickens' },
    { title: 'Master Humphrey\'s Clock and Life of Dickens', author: 'John Forster', year: '1872' },
    { title: 'Wuthering Heights', author: 'Emily Brontë', year: '1847' },
    { title: 'The Shining', author: 'Stephen King', year: '1977' },
    { title: 'Lolita', author: 'Vladimir Nabokov', year: '1955' },
    { title: 'Kafka on the Shore', author: 'Haruki Murakami', year: '2002' },
  ],
  'Psychology & Business': [
    { title: 'The Black Swan - The Impact of the Highly Improbable', author: 'Nassim Nicholas Taleb', year: '2007' },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: '2011' },
    { title: 'The Psychology of Money', author: 'Morgan Housel', year: '2020' },
    { title: 'How Buffet Does It', author: 'James Pardoe', year: '2005' },
    { title: 'How to Read a Book', author: 'Mortimer J. Adler and Charles Van Doren', year: '1940' },
  ],
  'Self Help': [
    { title: '7 Habits of Highly Effective People', author: 'Stephen R. Covey', year: '1989' },
    { title: 'Kaizen', author: 'Sarah Harvey', year: '2019' },
    { title: 'The Power of Positive Thinking', author: 'Norman Vincent Peale', year: '1952' },
    { title: 'As a Man Thinketh', author: 'James Allen', year: '1903' },
    { title: 'You Can Win', author: 'Shiv Khera', year: '1998' },
    { title: 'The Complete Mental Fitness Book', author: 'Tom Wujec', year: '1988' },
    { title: 'The Go-Giver', author: 'Bob Burg and John David Mann', year: '2007' },
  ],
  'Economics & Society': [
    { title: 'Wealth of Nations', author: 'Adam Smith', year: '1776' },
    { title: 'An Essay on the Principle of Population', author: 'Thomas Robert Malthus', slug: 'essay-on-population', year: '1798' },
    { title: 'Consequences of Capitalism', author: 'Noam Chomsky and Marv Waterstone', year: '2021' },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', year: '1976' },
    { title: 'The Singularity is Near', author: 'Ray Kurzweil', year: '2005' },
    { title: 'Permanent Record', author: 'Edward Snowden', year: '2019' },
    { title: 'Freud', author: 'Richard Webster', year: '2003' },
    { title: 'The Pocket Essential: Steven Soderbergh', author: 'Jason Wood', year: '2002' },
  ],
}

export default function Books() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openCategories, setOpenCategories] = useState<string[]>(Object.keys(booksByCategory))

  const filteredBooksByCategory = useMemo(() => {
    if (!searchTerm) return booksByCategory

    const lowerTerm = searchTerm.toLowerCase()
    const filtered: Record<string, Book[]> = {}

    Object.entries(booksByCategory).forEach(([category, books]) => {
      const matchingBooks = books.filter(
        book => 
          book.title.toLowerCase().includes(lowerTerm) || 
          book.author.toLowerCase().includes(lowerTerm) ||
          book.edition?.toLowerCase().includes(lowerTerm) ||
          book.year?.toLowerCase().includes(lowerTerm)
      )
      if (matchingBooks.length > 0) {
        filtered[category] = matchingBooks
      }
    })

    return filtered
  }, [searchTerm])

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
            className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
          >
            Expand All
          </button>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <button 
            onClick={allClose}
            className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
          >
            Collapse All
          </button>
        </div>
      </motion.div>
      
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
        A collection of physical books I own, read, or intend to read. Some include personal notes and reflections.
      </p>

      {/* Search Bar */}
      <div className="mb-12 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search by title, author, edition, or year..."
          className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-cyan-600/50 dark:focus:ring-cyan-500/50 focus:border-cyan-600 dark:focus:border-cyan-500 outline-none transition-all duration-300 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {Object.entries(filteredBooksByCategory).length > 0 ? (
        Object.entries(filteredBooksByCategory).map(([category, books]) => (
          <div key={category} className="mb-4">
            <button 
              onClick={() => toggleCategory(category)}
              className="w-full text-left p-5 bg-white dark:bg-slate-900 rounded-xl flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 border border-slate-200 dark:border-slate-800 hover:border-cyan-600/30 dark:hover:border-cyan-500/30 group"
            >
              <span className="text-lg font-semibold text-slate-900 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{category}</span>
              <span className="text-slate-500">({books.length})</span>
            </button>
            
            <AnimatePresence>
              {(openCategories.includes(category) || searchTerm) && (
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
                        key={`${category}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.01 }}
                        className={`p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex flex-col justify-between ${book.slug ? 'ring-1 ring-cyan-600/30 dark:ring-cyan-500/30 hover:ring-cyan-600/60 dark:hover:ring-cyan-500/60' : ''}`}
                      >
                        <div>
                          <h3 className="font-medium text-slate-900 dark:text-slate-200 leading-tight">{book.title}</h3>
                          <div className="flex flex-wrap items-center gap-x-2 mt-1">
                            <p className="text-sm text-slate-500">{book.author}</p>
                            {(book.edition || book.year) && (
                              <>
                                <span className="text-slate-300 dark:text-slate-700 text-xs">•</span>
                                <div className="flex gap-2">
                                  {book.edition && (
                                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">{book.edition}</span>
                                  )}
                                  {book.edition && book.year && (
                                    <span className="text-slate-300 dark:text-slate-700 text-xs">•</span>
                                  )}
                                  {book.year && (
                                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 tracking-wider">{book.year}</span>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        {book.slug && (
                          <Link 
                            to={`/writings/${book.slug}`}
                            className="mt-3 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 flex items-center gap-1"
                          >
                            Read Notes →
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-400 text-lg">No books found matching "{searchTerm}"</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-4 text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  )
}
