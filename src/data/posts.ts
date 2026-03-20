export interface Post {
  slug: string
  title: string
  category: string
  excerpt: string
  date: string
}

export const posts: Post[] = [
  // Philosophy/AI
  {
    slug: 'can-computer-think',
    title: 'Can computers think?',
    category: 'Philosophy/AI',
    excerpt: 'Thinking is a non-trivial process...',
    date: '2021-04-05',
  },
  {
    slug: 'godel',
    title: 'AI and Gödel',
    category: 'Philosophy/AI',
    excerpt: 'Gödel\'s undecideability theorem states...',
    date: '2021-05-12',
  },
  // Philosophy
  {
    slug: 'craft-with-free-will',
    title: 'Craft with free will',
    category: 'Philosophy',
    excerpt: 'It feels so surreal after all isn\'t it, when the world conjures around us...',
    date: '2020-07-20',
  },
  {
    slug: 'existential-experience',
    title: 'Existential experience',
    category: 'Philosophy',
    excerpt: 'There are only so many things to be envious about...',
    date: '2020-06-15',
  },
  {
    slug: 'lost-in-thoughts',
    title: 'Lost in thoughts',
    category: 'Philosophy',
    excerpt: 'Living an ecstasy is a dream for the unfulfilled...',
    date: '2021-04-05',
  },
  {
    slug: 'blissful-being',
    title: 'Blissful being',
    category: 'Philosophy',
    excerpt: 'It\'s nauseating to keep going...',
    date: '2021-04-05',
  },
  {
    slug: 'that-magic-moment',
    title: 'That magic moment',
    category: 'Philosophy',
    excerpt: 'Just want to stay there for a while...',
    date: '2020-08-10',
  },
  {
    slug: 'day-well-spent',
    title: 'A day well spent?',
    category: 'Philosophy',
    excerpt: 'I wake up one morning reminiscing...',
    date: '2021-04-05',
  },
  // Literature/Economics
  {
    slug: 'essay-on-population',
    title: 'An Essay on the Principle of Population',
    category: 'Literature/Economics',
    excerpt: 'Understanding how human population functions and their impact on natural resources through Malthus\'s classic theory.',
    date: '2021-09-18',
  },
  // FLOSS
  {
    slug: 'free-software-journey',
    title: 'My Free Software Journey',
    category: 'FLOSS',
    excerpt: 'A personal account of transitioning to free software, the challenges of software freedom, and using 100% free software for business.',
    date: '2022-12-09',
  },
  {
    slug: 'free-or-not-free',
    title: 'Software Philosophy – Free or Not Free?',
    category: 'FLOSS',
    excerpt: 'Exploring the spectrum between free (as in freedom) and proprietary software.',
    date: '2021-07-20',
  },
  {
    slug: 'do-users-control-software',
    title: 'Do users control the software they use?',
    category: 'FLOSS',
    excerpt: 'Exploring the concept of \'playful cleverness\' and the ethical implications of software control.',
    date: '2021-02-14',
  },
  // Mathematics
  {
    slug: 'topics-in-algebra',
    title: 'Topics in Algebra',
    category: 'Mathematics',
    excerpt: 'A collection of handwritten notes and diagrams covering key concepts in abstract algebra from Herstein\'s classic text.',
    date: '2025-09-04',
  },
  {
    slug: 'fields',
    title: 'Fields',
    category: 'Mathematics',
    excerpt: 'Definition and properties of fields in linear algebra.',
    date: '2025-09-04',
  },
  // Tech
  {
    slug: 'evaluate-software-lib',
    title: 'How to evaluate a software library?',
    category: 'Tech',
    excerpt: 'Very often we depend on a lot of software libraries...',
    date: '2021-04-05',
  },
  {
    slug: 'reviving-ol-machina',
    title: 'Reviving an ol’ machina',
    category: 'Tech',
    excerpt: 'A story of upgrading and bringing back to life a desktop assembled in 2010.',
    date: '2020-04-05',
  },
  {
    slug: 'my-computer',
    title: 'How do you build a computer like mine?',
    category: 'Tech',
    excerpt: 'Building a computer running completely on freedom respecting software without any proprietary binary blobs.',
    date: '2019-12-01',
  },
  // Personal (Last)
  {
    slug: 'telltale-of-typewriter',
    title: 'Telltale of a typewriter',
    category: 'Personal',
    excerpt: 'Out of all the random happenings of the world, I somehow land on this documentary called California Typewriter...',
    date: '2021-03-01',
  },
]
