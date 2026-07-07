import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import csvText from '../../assets/library.csv?raw'

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
  { label: 'Computer Science: Architecture, Systems, & Theory' },
  { label: 'Mathematics & Sciences' },
  { label: 'Non-Fiction', children: ['Philosophy', 'Psychology & Business', 'Self Help', 'Economics & Society'] },
  { label: 'Literature & Fiction' },
]

const allCategoryNames = categoryTree.flatMap(g =>
  g.children ? [g.label, ...g.children] : [g.label]
)

function parseCSV(text: string): Book[] {
  const lines = text.trim().split('\n')
  const books: Book[] = []
  for (let i = 1; i < lines.length; i++) {
    const fields: string[] = []
    let current = ''
    let inQuotes = false
    for (const ch of lines[i]) {
      if (ch === '"') { inQuotes = !inQuotes; continue }
      if (ch === ',' && !inQuotes) { fields.push(current); current = ''; continue }
      current += ch
    }
    fields.push(current)
    const [title, author, category, subcategory, edition, year] = fields
    const categories: string[] = [subcategory ? `${category}: ${subcategory}` : category]
    books.push({ title, author, edition: edition || undefined, year: year || undefined, categories })
  }
  return books
}

const bookSlugs: Record<string, string> = {
  'Topics in Algebra': 'topics-in-algebra',
  'Linear Algebra': 'fields',
  'An Essay on the Principle of Population': 'essay-on-population',
}

const books: Book[] = parseCSV(csvText).map(book => ({
  ...book,
  slug: bookSlugs[book.title],
}))

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
        A collection of physical books I own, have read, or intend to read. Some include personal notes and reflections.
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
