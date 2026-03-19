import { Link } from 'react-router-dom'

interface BlogPostProps {
  title: string
  category: string
  children: React.ReactNode
}

export default function BlogPost({ title, category, children }: BlogPostProps) {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link 
        to="/writings" 
        className="inline-flex items-center gap-2 text-cyan-400 hover:underline mb-8"
      >
        ← Back to Blog
      </Link>
      
      <article>
        <header className="mb-8">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full mb-4">
            {category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        </header>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>
      </article>
    </div>
  )
}
