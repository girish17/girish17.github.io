import { Link } from 'react-router-dom'

export default function FlossPost() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <Link to="/writings" className="text-cyan-400 hover:underline mb-6 block">← Back to Blog</Link>
      
      <article>
        <h1 className="text-4xl font-bold mb-4">Coming soon with updated views</h1>
        <p className="text-gray-500 mb-8">Open Source</p>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>
            This post is being updated to reflect my current views on open source software.
            As a maintainer of several open source projects including OpenProject integrations,
            Mattermost plugins, and Yojana, I am working on new perspectives to share.
          </p>
          <p>
            Check back soon for the updated version.
          </p>
        </div>
      </article>
    </div>
  )
}
