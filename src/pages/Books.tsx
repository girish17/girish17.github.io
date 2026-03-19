import { useState } from 'react'
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
    { title: 'Computer Organization', author: 'Hamacher, Vranesic, Zaky' },
    { title: 'Operating System Principles', author: 'Silberschatz, Galvin, Gagne' },
    { title: 'The Art of Computer Systems Performance Analysis', author: 'Jain' },
  ],
  'Mathematics & Sciences': [
    { title: 'Topics in Algebra', author: 'Herstein', slug: 'topics-in-algebra' },
    { title: 'Linear Algebra', author: 'Hoffman, Kunze' },
    { title: 'Discrete Mathematics for Computer Scientists and Mathematicians', author: 'Mott, Kandel, Baker' },
    { title: 'Advanced Engineering Mathematics', author: 'Kreyszig' },
    { title: 'Discrete and Combinatorial Mathematics', author: 'Grimaldi, Ramana' },
    { title: 'Operations Research', author: 'S.D. Sharma' },
    { title: 'How to Solve It', author: 'George Polya' },
    { title: 'Principles of Electronics', author: 'V.K Mehta, Rohit Mehta' },
    { title: 'Engineering Chemistry', author: 'R.V Gadag, A.N Shetty' },
    { title: 'Fundamentals of Physics', author: 'Halliday, Resnick, Walker' },
  ],
  'Philosophy': [
    { title: 'The Republic', author: 'Plato' },
    { title: 'The Trouble with Being Born', author: 'E.M. Cioran' },
    { title: 'Nausea', author: 'Jean-Paul Sartre' },
    { title: 'The Rebel', author: 'Albert Camus' },
    { title: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche' },
    { title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche' },
    { title: 'Meditations', author: 'Marcus Aurelius' },
    { title: 'The Essential Rumi', author: 'Coleman Barks' },
  ],
  'Literature & Fiction': [
    { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky' },
    { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky' },
    { title: 'The Idiot', author: 'Fyodor Dostoevsky' },
    { title: 'White Nights', author: 'Fyodor Dostoevsky' },
    { title: 'War and Peace', author: 'Leo Tolstoy' },
    { title: 'Anna Karenina', author: 'Leo Tolstoy' },
    { title: '1984', author: 'George Orwell' },
    { title: 'Animal Farm', author: 'George Orwell' },
    { title: 'The Book of Disquiet', author: 'Fernando Pessoa' },
    { title: 'Metamorphosis', author: 'Franz Kafka' },
    { title: 'The Shining', author: 'Stephen King' },
    { title: 'Lolita', author: 'Vladimir Nabokov' },
    { title: 'Kafka on the Shore', author: 'Haruki Murakami' },
  ],
  'Psychology, Business & Society': [
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman' },
    { title: 'The Psychology of Money', author: 'Morgan Housel' },
    { title: '7 Habits of Highly Effective People', author: 'Stephen R. Covey' },
    { title: 'How to Read a Book', author: 'Mortimer J. Adler and Charles Van Doren' },
    { title: 'An Essay on the Principle of Population', author: 'Thomas Robert Malthus', slug: 'essay-on-population' },
    { title: 'Consequences of Capitalism', author: 'Noam Chomsky and Marv Waterstone' },
    { title: 'Wealth of Nations', author: 'Adam Smith' },
    { title: 'The Selfish Gene', author: 'Richard Dawkins' },
    { title: 'Permanent Record', author: 'Edward Snowden' },
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
      
      <p className="text-slate-400 mb-12 max-w-2xl">
        A collection of books I own, read, or intend to read. Some include personal notes and reflections.
      </p>
      
      {Object.entries(booksByCategory).map(([category, books]) => (
        <div key={category} className="mb-4">
          <button 
            onClick={() => toggleCategory(category)}
            className="w-full text-left p-5 bg-slate-900 rounded-xl flex justify-between items-center hover:bg-slate-800 transition-colors duration-300 border border-slate-800 hover:border-cyan-500/30 group"
          >
            <span className="text-lg font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">{category}</span>
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
                      transition={{ delay: index * 0.01 }}
                      className={`p-4 rounded-lg border border-slate-800 bg-slate-900/50 flex flex-col justify-between ${book.slug ? 'ring-1 ring-cyan-500/30 hover:ring-cyan-500/60' : ''}`}
                    >
                      <div>
                        <h3 className="font-medium text-slate-200">{book.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">{book.author}</p>
                      </div>
                      {book.slug && (
                        <Link 
                          to={`/writings/${book.slug}`}
                          className="mt-3 text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
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
      ))}
    </div>
  )
}
