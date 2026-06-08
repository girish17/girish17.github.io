import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

interface Book {
  title: string
  author: string
  edition?: string
  year?: string
  slug?: string
  categories: string[]
}

interface CategoryGroup {
  label: string
  children?: string[]
}

const categoryTree: CategoryGroup[] = [
  { label: 'Computer Science: Programming & Languages' },
  { label: 'Computer Science: Algorithms & Data Structures' },
  { label: 'Computer Science: Architecture, Systems & Theory' },
  { label: 'Mathematics & Sciences' },
  { label: 'Non-Fiction', children: ['Philosophy', 'Psychology & Business', 'Self Help', 'Economics & Society'] },
  { label: 'Literature & Fiction' },
]

const allCategoryNames = categoryTree.flatMap(g =>
  g.children ? [g.label, ...g.children] : [g.label]
)

const books: Book[] = [
  { title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', edition: '3rd Edition', categories: ['Computer Science: Programming & Languages'] },
  { title: 'The C Programming Language', author: 'Kernighan, Ritchie', edition: '2nd Edition', categories: ['Computer Science: Programming & Languages'] },
  { title: 'Effective Java', author: 'Bloch', edition: '3rd Edition', categories: ['Computer Science: Programming & Languages'] },
  { title: 'JavaScript: The Good Parts', author: 'Crockford', categories: ['Computer Science: Programming & Languages'] },
  { title: 'Introducing Python', author: 'Lubanovic', categories: ['Computer Science: Programming & Languages'] },
  { title: 'J2ME: The Complete Reference', author: 'Keogh, James', categories: ['Computer Science: Programming & Languages'] },
  { title: 'Object Oriented Programming in Turbo C++', author: 'Robert Lafore', categories: ['Computer Science: Programming & Languages'] },
  { title: 'C++ FAQs', author: 'Cline, Lomow, Girou', edition: '2nd Edition', categories: ['Computer Science: Programming & Languages'] },
  { title: 'Java Complete Reference', author: 'Schildt', edition: '7th Edition', categories: ['Computer Science: Programming & Languages'] },
  { title: 'Full Stack Javascript', author: 'Mardan', categories: ['Computer Science: Programming & Languages'] },
  { title: 'Visual Basic 6 Programming Black Book', author: 'Holzner', categories: ['Computer Science: Programming & Languages'] },

  { title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest, Stein', edition: '3rd Edition', categories: ['Computer Science: Algorithms & Data Structures'] },
  { title: 'Introduction to Design and Analysis of Algorithms', author: 'Levitin', edition: '2nd Edition', categories: ['Computer Science: Algorithms & Data Structures'] },
  { title: 'Data Structures using C and C++', author: 'Langsam, Augenstein, Tenenbaum', edition: '2nd Edition', categories: ['Computer Science: Algorithms & Data Structures'] },
  { title: 'Data Structures and Algorithm Analysis in C++', author: 'Weiss', edition: '3rd Edition', categories: ['Computer Science: Algorithms & Data Structures'] },
  { title: 'Algorithm Design Manual', author: 'Skiena', edition: '2nd Edition', categories: ['Computer Science: Algorithms & Data Structures'] },
  { title: 'Fundamentals of Data Structures in C', author: 'Horowitz, Sahni, Anderson-Freed', edition: '2nd Edition', categories: ['Computer Science: Algorithms & Data Structures'] },
  { title: 'Data Structure and Algorithm Analysis in C', author: 'Weiss', edition: '2nd Edition', categories: ['Computer Science: Algorithms & Data Structures'] },
  { title: 'Data Structures Through C', author: 'Yashavant Kanetkar', categories: ['Computer Science: Algorithms & Data Structures'] },
  { title: 'Data Structures and Algorithms Made Easy', author: 'Narasimha Karumanchi', categories: ['Computer Science: Algorithms & Data Structures'] },
  { title: 'Pattern Classification', author: 'Duda, Hart, Stork', categories: ['Computer Science: Algorithms & Data Structures'] },
  { title: 'Pattern Recognition', author: 'Theodoridis, Koutroumbas', categories: ['Computer Science: Algorithms & Data Structures'] },

  { title: 'The 8051 Microcontroller', author: 'Ayala', edition: '3rd Edition', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'Microcomputer Systems: The 8086/8088 Family', author: 'Liu, Gibson', edition: '2nd Edition', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'Computer Networking', author: 'Kurose, Ross', edition: '6th Edition', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'Design Patterns', author: 'Gamma, Helm, Johnson, Vlissides', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'Object Oriented Modeling and Design with UML', author: 'Blaha, Rumbaugh', edition: '2nd Edition', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'Database Management Systems', author: 'Ramakrishnan, Gehrke', edition: '3rd Edition', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'Digital Design', author: 'Mano, Ciletti', edition: '4th Edition', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'An Introduction to Formal Languages and Automata', author: 'Linz', edition: '4th Edition', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'Introduction to Automata Theory, Languages and Computation', author: 'Hopcroft, Motwani, Ullman', edition: '3rd Edition', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'An Embedded Software Primer', author: 'Simon', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'The Quality Toolbox', author: 'Nancy R. Tague', edition: '2nd Edition', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'The Magic Garden Explained', author: 'Goodheart, Cox', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'The Magic Garden Explained Solution Manual', author: 'Goodheart', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'Computer Organization', author: 'Hamacher, Vranesic, Zaky', edition: '5th Edition', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'Operating System Principles', author: 'Silberschatz, Galvin, Gagne', edition: '7th Edition', categories: ['Computer Science: Architecture, Systems & Theory'] },
  { title: 'The Art of Computer Systems Performance Analysis', author: 'Jain', categories: ['Computer Science: Architecture, Systems & Theory'] },

  { title: 'Graph Theory and Combinatorics', author: 'Dr. D.S.C', categories: ['Mathematics & Sciences'] },
  { title: 'Topics in Algebra', author: 'Herstein', edition: '2nd Edition', year: '1964', slug: 'topics-in-algebra', categories: ['Mathematics & Sciences'] },
  { title: 'Higher Engineering Mathematics', author: 'Dr. B.S. Grewal', categories: ['Mathematics & Sciences'] },
  { title: 'Discrete Mathematics for Computer Scientists and Mathematicians', author: 'Mott, Kandel, Baker', edition: '2nd Edition', year: '1986', categories: ['Mathematics & Sciences'] },
  { title: 'Advanced Engineering Mathematics', author: 'Kreyszig', edition: '8th Edition', year: '1962', categories: ['Mathematics & Sciences'] },
  { title: 'Advanced Engineering Mathematics Student Solution Manual', author: 'Kreyszig', categories: ['Mathematics & Sciences'] },
  { title: 'Discrete and Combinatorial Mathematics', author: 'Grimaldi, Ramana', edition: '5th Edition', year: '1985', categories: ['Mathematics & Sciences'] },
  { title: 'Operations Research', author: 'S.D. Sharma', categories: ['Mathematics & Sciences'] },
  { title: 'Linear Algebra', author: 'Hoffman, Kunze', edition: '2nd Edition', year: '1961', slug: 'fields', categories: ['Mathematics & Sciences'] },
  { title: 'How to Solve It', author: 'George Polya', year: '1945', categories: ['Mathematics & Sciences'] },
  { title: 'Principles of Electronics', author: 'V.K Mehta, Rohit Mehta', categories: ['Mathematics & Sciences'] },
  { title: 'Engineering Chemistry', author: 'R.V Gadag, A.N Shetty', categories: ['Mathematics & Sciences'] },
  { title: 'Fundamentals of Physics', author: 'Halliday, Resnick, Walker', edition: '6th Edition', year: '1960', categories: ['Mathematics & Sciences'] },
  { title: 'The Art of Statistics', author: 'David Spiegelhalter', year: '2019', categories: ['Mathematics & Sciences'] },
  { title: 'A First Course in Probability', author: 'Sheldon Ross', categories: ['Mathematics & Sciences'] },
  { title: 'Linear Algebra and Its Applications', author: 'Gilbert Strang', categories: ['Mathematics & Sciences'] },

  { title: 'The Trouble with Being Born', author: 'E.M. Cioran', year: '1973', categories: ['Philosophy'] },
  { title: 'Nausea', author: 'Jean-Paul Sartre', year: '1938', categories: ['Philosophy'] },
  { title: 'The Rebel', author: 'Albert Camus', year: '1951', categories: ['Philosophy'] },
  { title: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche', year: '1883', categories: ['Philosophy'] },
  { title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche', year: '1886', categories: ['Philosophy'] },
  { title: 'Essays and Aphorisms', author: 'Arthur Schopenhauer', year: '1851', categories: ['Philosophy'] },
  { title: 'Meditations', author: 'Marcus Aurelius', year: '180 CE', categories: ['Philosophy'] },
  { title: 'The Republic', author: 'Plato', year: '375 BCE', categories: ['Philosophy'] },
  { title: 'The Essential Rumi', author: 'Coleman Barks', year: '1995', categories: ['Philosophy'] },
  { title: 'The Myth of Sisyphus', author: 'Albert Camus', year: '1942', categories: ['Philosophy'] },

  { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', year: '1866', categories: ['Literature & Fiction'] },
  { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', year: '1880', categories: ['Literature & Fiction'] },
  { title: 'The Idiot', author: 'Fyodor Dostoevsky', year: '1869', categories: ['Literature & Fiction'] },
  { title: 'White Nights', author: 'Fyodor Dostoevsky', year: '1848', categories: ['Literature & Fiction'] },
  { title: 'War and Peace', author: 'Leo Tolstoy', year: '1869', categories: ['Literature & Fiction'] },
  { title: 'Anna Karenina', author: 'Leo Tolstoy', year: '1878', categories: ['Literature & Fiction'] },
  { title: '50 Greatest Short Stories', author: "Terry O'Brien", year: '2015', categories: ['Literature & Fiction'] },
  { title: 'Women in Love', author: 'D.H. Lawrence', year: '1920', categories: ['Literature & Fiction'] },
  { title: 'Atlas Shrugged', author: 'Ayn Rand', year: '1957', categories: ['Literature & Fiction'] },
  { title: 'The Fountainhead', author: 'Ayn Rand', year: '1943', categories: ['Literature & Fiction'] },
  { title: 'Moby-Dick', author: 'Herman Melville', year: '1851', categories: ['Literature & Fiction'] },
  { title: 'Metamorphosis', author: 'Franz Kafka', year: '1915', categories: ['Literature & Fiction'] },
  { title: 'Animal Farm', author: 'George Orwell', year: '1945', categories: ['Literature & Fiction'] },
  { title: '1984', author: 'George Orwell', year: '1949', categories: ['Literature & Fiction'] },
  { title: 'Far from the Madding Crowd', author: 'Thomas Hardy', year: '1874', categories: ['Literature & Fiction'] },
  { title: 'Pride and Prejudice', author: 'Jane Austen', year: '1813', categories: ['Literature & Fiction'] },
  { title: 'American Notes', author: 'Charles Dickens', year: '1842', categories: ['Literature & Fiction'] },
  { title: 'Complete Works', author: 'Charles Dickens', categories: ['Literature & Fiction'] },
  { title: "Master Humphrey's Clock and Life of Dickens", author: 'John Forster', year: '1872', categories: ['Literature & Fiction'] },
  { title: 'Wuthering Heights', author: 'Emily Brontë', year: '1847', categories: ['Literature & Fiction'] },
  { title: 'The Shining', author: 'Stephen King', year: '1977', categories: ['Literature & Fiction'] },
  { title: 'Lolita', author: 'Vladimir Nabokov', year: '1955', categories: ['Literature & Fiction'] },
  { title: 'Kafka on the Shore', author: 'Haruki Murakami', year: '2002', categories: ['Literature & Fiction'] },
  { title: 'Sense and Sensibility', author: 'Jane Austen', year: '1811', categories: ['Literature & Fiction'] },
  { title: 'The Trial', author: 'Franz Kafka', year: '1925', categories: ['Literature & Fiction'] },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', categories: ['Literature & Fiction'] },

  { title: 'The Black Swan - The Impact of the Highly Improbable', author: 'Nassim Nicholas Taleb', year: '2007', categories: ['Psychology & Business'] },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: '2011', categories: ['Psychology & Business'] },
  { title: 'The Psychology of Money', author: 'Morgan Housel', year: '2020', categories: ['Psychology & Business'] },
  { title: 'How Buffet Does It', author: 'James Pardoe', year: '2005', categories: ['Psychology & Business'] },
  { title: 'How to Read a Book', author: 'Mortimer J. Adler and Charles Van Doren', year: '1940', categories: ['Psychology & Business'] },

  { title: '7 Habits of Highly Effective People', author: 'Stephen R. Covey', year: '1989', categories: ['Self Help'] },
  { title: 'Kaizen', author: 'Sarah Harvey', year: '2019', categories: ['Self Help'] },
  { title: 'The Power of Positive Thinking', author: 'Norman Vincent Peale', year: '1952', categories: ['Self Help'] },
  { title: 'As a Man Thinketh', author: 'James Allen', year: '1903', categories: ['Self Help'] },
  { title: 'You Can Win', author: 'Shiv Khera', year: '1998', categories: ['Self Help'] },
  { title: 'The Complete Mental Fitness Book', author: 'Tom Wujec', year: '1988', categories: ['Self Help'] },
  { title: 'The Go-Giver', author: 'Bob Burg and John David Mann', year: '2007', categories: ['Self Help'] },

  { title: 'Wealth of Nations', author: 'Adam Smith', year: '1776', categories: ['Economics & Society'] },
  { title: 'An Essay on the Principle of Population', author: 'Thomas Robert Malthus', slug: 'essay-on-population', year: '1798', categories: ['Economics & Society'] },
  { title: 'Consequences of Capitalism', author: 'Noam Chomsky and Marv Waterstone', year: '2021', categories: ['Economics & Society'] },
  { title: 'The Selfish Gene', author: 'Richard Dawkins', year: '1976', categories: ['Economics & Society'] },
  { title: 'The Singularity is Near', author: 'Ray Kurzweil', year: '2005', categories: ['Economics & Society'] },
  { title: 'Permanent Record', author: 'Edward Snowden', year: '2019', categories: ['Economics & Society'] },
  { title: 'Freud', author: 'Richard Webster', year: '2003', categories: ['Economics & Society'] },
  { title: 'The Pocket Essential: Steven Soderbergh', author: 'Jason Wood', year: '2002', categories: ['Economics & Society'] },

  { title: 'Tsundoku', author: 'Taiki Raito Pym', year: '2026', categories: ['Non-Fiction'] },
  { title: 'The Origin of Species', author: 'Charles Darwin', categories: ['Non-Fiction'] },
]

export default function Books() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openCategories, setOpenCategories] = useState<string[]>(allCategoryNames)

  const booksByCategory = useMemo(() => {
    const grouped: Record<string, Book[]> = {}

    for (const book of books) {
      const matchesSearch = !searchTerm ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.edition && book.edition.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (book.year && book.year.toLowerCase().includes(searchTerm.toLowerCase()))

      if (!matchesSearch) continue

      for (const category of book.categories) {
        if (!grouped[category]) grouped[category] = []
        grouped[category].push(book)
      }
    }

    return grouped
  }, [searchTerm])

  const toggleCategory = (name: string) => {
    setOpenCategories(prev => {
      const group = categoryTree.find(g => g.label === name)
      if (group?.children) {
        const isOpen = prev.includes(name)
        if (isOpen) {
          return prev.filter(c => c !== name && !group.children!.includes(c))
        } else {
          return [...prev, name, ...group.children]
        }
      } else {
        return prev.includes(name)
          ? prev.filter(c => c !== name)
          : [...prev, name]
      }
    })
  }

  const allOpen = () => setOpenCategories([...allCategoryNames])
  const allClose = () => setOpenCategories([])

  const hasResults = categoryTree.some(group => {
    if (group.children) {
      const directBooks = (booksByCategory[group.label] || []).filter(
        b => !group.children!.some(c => b.categories.includes(c))
      )
      const childrenHaveBooks = group.children.some(c => (booksByCategory[c]?.length ?? 0) > 0)
      return directBooks.length > 0 || childrenHaveBooks
    }
    return (booksByCategory[group.label]?.length ?? 0) > 0
  })

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

      {hasResults ? (
        categoryTree.map(group => {
          if (group.children) {
            const directBooks = (booksByCategory[group.label] || []).filter(
              b => !group.children!.some(c => b.categories.includes(c))
            )
            const activeChildren = group.children.filter(c => (booksByCategory[c]?.length ?? 0) > 0)
            const totalCount = directBooks.length + activeChildren.reduce((sum, c) => sum + (booksByCategory[c]?.length || 0), 0)

            if (totalCount === 0 && searchTerm) return null

            return (
              <div key={group.label} className="mb-4">
                <button
                  onClick={() => toggleCategory(group.label)}
                  className="w-full text-left p-5 bg-white dark:bg-slate-900 rounded-xl flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 border border-slate-200 dark:border-slate-800 hover:border-cyan-600/30 dark:hover:border-cyan-500/30 group"
                >
                  <span className="text-lg font-semibold text-slate-900 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{group.label}</span>
                  <span className="text-slate-500">({totalCount})</span>
                </button>

                <AnimatePresence>
                  {(openCategories.includes(group.label) || searchTerm) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-6 mt-4 space-y-4">
                        {directBooks.length > 0 && (
                          <div className="grid md:grid-cols-2 gap-3">
                            {directBooks.map((book, index) => (
                              <BookCard key={`nf-direct-${index}`} book={book} index={index} />
                            ))}
                          </div>
                        )}

                        {activeChildren.map(child => {
                          const childBooks = booksByCategory[child]!
                          return (
                            <div key={child}>
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleCategory(child); }}
                                className="w-full text-left flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                              >
                                <span className="font-medium text-slate-800 dark:text-slate-300">{child}</span>
                                <span className="text-xs text-slate-500">({childBooks.length})</span>
                              </button>
                              <AnimatePresence>
                                {(openCategories.includes(child) || searchTerm) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-3 grid md:grid-cols-2 gap-3">
                                      {childBooks.map((book, index) => (
                                        <BookCard key={`${child}-${index}`} book={book} index={index} />
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          }

          const catBooks = booksByCategory[group.label]
          if (!catBooks || catBooks.length === 0) return null

          return (
            <div key={group.label} className="mb-4">
              <button
                onClick={() => toggleCategory(group.label)}
                className="w-full text-left p-5 bg-white dark:bg-slate-900 rounded-xl flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 border border-slate-200 dark:border-slate-800 hover:border-cyan-600/30 dark:hover:border-cyan-500/30 group"
              >
                <span className="text-lg font-semibold text-slate-900 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{group.label}</span>
                <span className="text-slate-500">({catBooks.length})</span>
              </button>

              <AnimatePresence>
                {(openCategories.includes(group.label) || searchTerm) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 grid md:grid-cols-2 gap-3">
                      {catBooks.map((book, index) => (
                        <BookCard key={`${group.label}-${index}`} book={book} index={index} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })
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

function BookCard({ book, index }: { book: Book; index: number }) {
  return (
    <motion.div
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
  )
}
