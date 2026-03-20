import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

interface Book {
  title: string
  author: string
  slug?: string
}

const booksByCategory: Record<string, Book[]> = {
  'Computer Science: Programming & Languages': [
    { title: 'The C++ Programming Language', author: 'Bjarne Stroustrup' },
    { title: 'The C Programming Language', author: 'Kernighan, Ritchie' },
    { title: 'Effective Java', author: 'Bloch' },
    { title: 'JavaScript: The Good Parts', author: 'Crockford' },
    { title: 'Introducing Python', author: 'Lubanovic' },
    { title: 'J2ME: The Complete Reference', author: 'Keogh, James' },
    { title: 'Object Oriented Programming in Turbo C++', author: 'Robert Lafore' },
    { title: 'C++ FAQs', author: 'Cline, Lomow, Girou' },
    { title: 'Java Complete Reference', author: 'Schildt' },
    { title: 'Full Stack Javascript', author: 'Mardan' },
    { title: 'Visual Basic 6 Programming Black Book', author: 'Holzner' },
  ],
  'Computer Science: Algorithms & Data Structures': [
    { title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest, Stein' },
    { title: 'Introduction to Design and Analysis of Algorithms', author: 'Levitin' },
    { title: 'Data Structures using C and C++', author: 'Langsam, Augenstein, Tenenbaum' },
    { title: 'Data Structures and Algorithm Analysis in C++', author: 'Weiss' },
    { title: 'Algorithm Design Manual', author: 'Skiena' },
    { title: 'Fundamentals of Data Structures in C', author: 'Horowitz, Sahni, Anderson-Freed' },
    { title: 'Data Structure and Algorithm Analysis in C', author: 'Weiss' },
    { title: 'Data Structures Through C', author: 'Yashavant Kanetkar' },
    { title: 'Data Structures and Algorithms Made Easy', author: 'Narasimha Karumanchi' },
  ],
  'Computer Science: Architecture, Systems & Theory': [
    { title: 'The 8051 Microcontroller', author: 'Ayala' },
    { title: 'Microcomputer Systems: The 8086/8088 Family', author: 'Liu, Gibson' },
    { title: 'Computer Networking', author: 'Kurose, Ross' },
    { title: 'Design Patterns', author: 'Gamma, Helm, Johnson, Vlissides' },
    { title: 'Object Oriented Modeling and Design with UML', author: 'Blaha, Rumbaugh' },
    { title: 'Database Management Systems', author: 'Ramakrishnan, Gehrke' },
    { title: 'Digital Design', author: 'Mano, Ciletti' },
    { title: 'An Introduction to Formal Languages and Automata', author: 'Linz' },
    { title: 'Introduction to Automata Theory, Languages and Computation', author: 'Hopcroft, Motwani, Ullman' },
    { title: 'An Embedded Software Primer', author: 'Simon' },
    { title: 'The Quality Toolbox', author: 'Nancy R. Tague' },
    { title: 'The Magic Garden Explained', author: 'Goodheart, Cox' },
    { title: 'The Magic Garden Explained Solution Manual', author: 'Goodheart' },
    { title: 'Computer Organization', author: 'Hamacher, Vranesic, Zaky' },
    { title: 'Operating System Principles', author: 'Silberschatz, Galvin, Gagne' },
    { title: 'The Art of Computer Systems Performance Analysis', author: 'Jain' },
  ],
  'Mathematics & Sciences': [
    { title: 'Graph Theory and Combinatorics', author: 'Dr. D.S.C' },
    { title: 'Topics in Algebra', author: 'Herstein', slug: 'topics-in-algebra' },
    { title: 'Higher Engineering Mathematics', author: 'Dr. B.S. Grewal' },
    { title: 'Discrete Mathematics for Computer Scientists and Mathematicians', author: 'Mott, Kandel, Baker' },
    { title: 'Advanced Engineering Mathematics', author: 'Kreyszig' },
    { title: 'Advanced Engineering Mathematics Student Solution Manual', author: 'Kreyszig' },
    { title: 'Discrete and Combinatorial Mathematics', author: 'Grimaldi, Ramana' },
    { title: 'Operations Research', author: 'S.D. Sharma' },
    { title: 'Linear Algebra', author: 'Hoffman, Kunze', slug: 'fields' },
    { title: 'How to Solve It', author: 'George Polya' },
    { title: 'Principles of Electronics', author: 'V.K Mehta, Rohit Mehta' },
    { title: 'Engineering Chemistry', author: 'R.V Gadag, A.N Shetty' },
    { title: 'Fundamentals of Physics', author: 'Halliday, Resnick, Walker' },
  ],
  'Philosophy': [
    { title: 'The Trouble with Being Born', author: 'E.M. Cioran' },
    { title: 'Nausea', author: 'Jean-Paul Sartre' },
    { title: 'The Rebel', author: 'Albert Camus' },
    { title: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche' },
    { title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche' },
    { title: 'Meditations', author: 'Marcus Aurelius' },
    { title: 'The Republic', author: 'Plato' },
    { title: 'The Essential Rumi', author: 'Coleman Barks' },
  ],
  'Literature & Fiction': [
    { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky' },
    { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky' },
    { title: 'The Idiot', author: 'Fyodor Dostoevsky' },
    { title: 'White Nights', author: 'Fyodor Dostoevsky' },
    { title: 'War and Peace', author: 'Leo Tolstoy' },
    { title: 'Anna Karenina', author: 'Leo Tolstoy' },
    { title: '50 Greatest Short Stories', author: 'Terry O\'Brien' },
    { title: 'Women in Love', author: 'D.H. Lawrence' },
    { title: 'Atlas Shrugged', author: 'Ayn Rand' },
    { title: 'The Fountainhead', author: 'Ayn Rand' },
    { title: 'Moby-Dick', author: 'Herman Melville' },
    { title: 'Metamorphosis', author: 'Franz Kafka' },
    { title: 'Animal Farm', author: 'George Orwell' },
    { title: '1984', author: 'George Orwell' },
    { title: 'Far from the Madding Crowd', author: 'Thomas Hardy' },
    { title: 'Pride and Prejudice', author: 'Jane Austen' },
    { title: 'American Notes', author: 'Charles Dickens' },
    { title: 'Complete Works', author: 'Charles Dickens' },
    { title: 'Master Humphrey\'s Clock and Life of Dickens', author: 'John Forster' },
    { title: 'Wuthering Heights', author: 'Emily Brontë' },
    { title: 'The Shining', author: 'Stephen King' },
    { title: 'Lolita', author: 'Vladimir Nabokov' },
    { title: 'Kafka on the Shore', author: 'Haruki Murakami' },
  ],
  'Psychology & Business': [
    { title: 'The Black Swan - The Impact of the Highly Improbable', author: 'Nassim Nicholas Taleb' },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman' },
    { title: 'The Psychology of Money', author: 'Morgan Housel' },
    { title: 'How Buffet Does It', author: 'James Pardoe' },
    { title: 'How to Read a Book', author: 'Mortimer J. Adler and Charles Van Doren' },
  ],
  'Self Help': [
    { title: '7 Habits of Highly Effective People', author: 'Stephen R. Covey' },
    { title: 'Kaizen', author: 'Sarah Harvey' },
    { title: 'The Power of Positive Thinking', author: 'Norman Vincent Peale' },
    { title: 'As a Man Thinketh', author: 'James Allen' },
    { title: 'You Can Win', author: 'Shiv Khera' },
    { title: 'The Complete Mental Fitness Book', author: 'Tom Wujec' },
    { title: 'The Go-Giver', author: 'Bob Burg and John David Mann' },
  ],
  'Economics & Society': [
    { title: 'Wealth of Nations', author: 'Adam Smith' },
    { title: 'An Essay on the Principle of Population', author: 'Thomas Robert Malthus', slug: 'essay-on-population' },
    { title: 'Consequences of Capitalism', author: 'Noam Chomsky and Marv Waterstone' },
    { title: 'The Selfish Gene', author: 'Richard Dawkins' },
    { title: 'The Singularity is Near', author: 'Ray Kurzweil' },
    { title: 'Permanent Record', author: 'Edward Snowden' },
    { title: 'Freud', author: 'Richard Webster' },
    { title: 'The Pocket Essential: Steven Soderbergh', author: 'Jason Wood' },
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
          book.author.toLowerCase().includes(lowerTerm)
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
        A collection of books I own, read, or intend to read. Some include personal notes and reflections.
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
          placeholder="Search by title or author..."
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
                          <h3 className="font-medium text-slate-900 dark:text-slate-200">{book.title}</h3>
                          <p className="text-sm text-slate-500 mt-1">{book.author}</p>
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
