import craftWithFreeWill from '../posts/craft-with-free-will.md?raw'
import existentialExperience from '../posts/existential-experience.md?raw'
import lostInThoughts from '../posts/lost-in-thoughts.md?raw'
import blissfulBeing from '../posts/blissful-being.md?raw'
import thatMagicMoment from '../posts/that-magic-moment.md?raw'
import dayWellSpent from '../posts/day-well-spent.md?raw'
import canComputerThink from '../posts/can-computer-think.md?raw'
import godel from '../posts/godel.md?raw'
import evaluateSoftwareLib from '../posts/evaluate-software-lib.md?raw'
import telltaleOfTypewriter from '../posts/telltale-of-typewriter.md?raw'

interface PostMetadata {
  title: string
  category: string
  excerpt: string
}

function parseFrontmatter(text: string): { metadata: PostMetadata; content: string } {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    return { 
      metadata: { title: 'Untitled', category: 'Unknown', excerpt: '' }, 
      content: text 
    }
  }
  
  const frontmatter = match[1]
  const content = match[2]
  
  const metadata: PostMetadata = {
    title: 'Untitled',
    category: 'Unknown',
    excerpt: ''
  }
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    const value = valueParts.join(':').trim()
    if (key === 'title') metadata.title = value
    if (key === 'category') metadata.category = value
    if (key === 'excerpt') metadata.excerpt = value
  })
  
  return { metadata, content }
}

const postsContent: Record<string, string> = {
  'telltale-of-typewriter': telltaleOfTypewriter,
  'craft-with-free-will': craftWithFreeWill,
  'existential-experience': existentialExperience,
  'lost-in-thoughts': lostInThoughts,
  'blissful-being': blissfulBeing,
  'that-magic-moment': thatMagicMoment,
  'day-well-spent': dayWellSpent,
  'can-computer-think': canComputerThink,
  'godel': godel,
  'evaluate-software-lib': evaluateSoftwareLib,
}

export function getPostContent(slug: string) {
  const content = postsContent[slug]
  if (!content) return null
  return parseFrontmatter(content)
}
