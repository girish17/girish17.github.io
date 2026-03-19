export interface Post {
  slug: string
  title: string
  category: string
  excerpt: string
}

export const posts: Post[] = [
  {
    slug: 'telltale-of-typewriter',
    title: 'Telltale of a typewriter',
    category: 'Personal',
    excerpt: 'Out of all the random happenings of the world, I somehow land on this documentary called California Typewriter...',
  },
  {
    slug: 'craft-with-free-will',
    title: 'Craft with free will',
    category: 'Philosophy',
    excerpt: 'It feels so surreal after all isn\'t it, when the world conjures around us...',
  },
  {
    slug: 'existential-experience',
    title: 'Existential experience',
    category: 'Philosophy',
    excerpt: 'There are only so many things to be envious about...',
  },
  {
    slug: 'lost-in-thoughts',
    title: 'Lost in thoughts',
    category: 'Philosophy',
    excerpt: 'Living an ecstasy is a dream for the unfulfilled...',
  },
  {
    slug: 'blissful-being',
    title: 'Blissful being',
    category: 'Philosophy',
    excerpt: 'It\'s nauseating to keep going...',
  },
  {
    slug: 'that-magic-moment',
    title: 'That magic moment',
    category: 'Philosophy',
    excerpt: 'Just want to stay there for a while...',
  },
  {
    slug: 'day-well-spent',
    title: 'A day well spent?',
    category: 'Philosophy',
    excerpt: 'I wake up one morning reminiscing...',
  },
  {
    slug: 'can-computer-think',
    title: 'Can computers think?',
    category: 'Philosophy/AI',
    excerpt: 'Thinking is a non-trivial process...',
  },
  {
    slug: 'godel',
    title: 'AI and Gödel',
    category: 'Philosophy/AI',
    excerpt: 'Gödel\'s undecideability theorem states...',
  },
  {
    slug: 'evaluate-software-lib',
    title: 'How to evaluate a software library?',
    category: 'Tech',
    excerpt: 'Very often we depend on a lot of software libraries...',
  },
  {
    slug: 'essay-on-population',
    title: 'An Essay on the Principle of Population',
    category: 'Literature/Economics',
    excerpt: 'Understanding how human population functions and their impact on natural resources through Malthus\'s classic theory.',
  },
  {
    slug: 'topics-in-algebra',
    title: 'Topics in Algebra',
    category: 'Mathematics',
    excerpt: 'A collection of handwritten notes and diagrams covering key concepts in abstract algebra from Herstein\'s classic text.',
  },
  {
    slug: 'free-software-journey',
    title: 'My Free Software Journey',
    category: 'FLOSS',
    excerpt: 'A personal account of transitioning to free software, the challenges of software freedom, and using 100% free software for business.',
  },
  {
    slug: 'free-or-not-free',
    title: 'Software Philosophy – Free or Not Free?',
    category: 'FLOSS',
    excerpt: 'Exploring the spectrum between free (as in freedom) and proprietary software.',
  },
  {
    slug: 'do-users-control-software',
    title: 'Do users control the software they use?',
    category: 'FLOSS',
    excerpt: 'Exploring the concept of \'playful cleverness\' and the ethical implications of software control.',
  },
  {
    slug: 'reviving-ol-machina',
    title: 'Reviving an ol’ machina',
    category: 'Tech',
    excerpt: 'A story of upgrading and bringing back to life a desktop assembled in 2010.',
  },
  {
    slug: 'my-computer',
    title: 'How do you build a computer like mine?',
    category: 'Tech',
    excerpt: 'Building a computer running completely on freedom respecting software without any proprietary binary blobs.',
  },
]
