import readingTime from 'reading-time'
import { slugify } from '@/lib/utils'

export type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: { id: string; name: string; avatar?: string }
  featured: boolean
  featuredImage?: { url: string }
  publishedAt: string
  readingTime: string
  /** Optional YouTube video ID for video posts */
  videoId?: string
  /** Optional MP4 video URL for video posts */
  videoUrl?: string
}

// Realistic image pools per category for varied visuals
const imagePools: Partial<Record<string, string[]>> = {
  national: [
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop', // press conference mics
    'https://images.unsplash.com/photo-1533557201800-17fc62a5e27f?q=80&w=1400&auto=format&fit=crop', // parliament
    'https://images.unsplash.com/photo-1581093458791-9e9b4b86d0f2?q=80&w=1400&auto=format&fit=crop', // election ink
    'https://images.unsplash.com/photo-1584036561584-b03c19da874c?q=80&w=1400&auto=format&fit=crop', // vaccination
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop', // rainy monsoon
    'https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1400&auto=format&fit=crop', // police car
  ],
  international: [
    'https://images.unsplash.com/photo-1520975922284-5f1f70dcd9df?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop', // summit
    'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1400&auto=format&fit=crop', // globe
    'https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1400&auto=format&fit=crop', // markets
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1400&auto=format&fit=crop', // aid trucks
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop',
  ],
  'state-news': [
    'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1400&auto=format&fit=crop', // ribbon cut
    'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=1400&auto=format&fit=crop', // budget doc
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1400&auto=format&fit=crop', // metro
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop', // farmers
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1400&auto=format&fit=crop', // marathon
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1400&auto=format&fit=crop', // classroom
  ],
  sports: [
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1400&auto=format&fit=crop', // stadium
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1400&auto=format&fit=crop', // soccer
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1400&auto=format&fit=crop', // basketball
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1400&auto=format&fit=crop', // cricket
    'https://images.unsplash.com/photo-1502810190503-830027c1b31e?q=80&w=1400&auto=format&fit=crop', // athletics
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1400&auto=format&fit=crop',
  ],
  technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop', // smartphone
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop', // circuits
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop', // coding
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop', // server
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop',
  ],
  lifestyle: [
    'https://images.unsplash.com/photo-1484981138541-b1f0cf3f0c07?q=80&w=1400&auto=format&fit=crop', // breakfast
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1400&auto=format&fit=crop', // decor
    'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1400&auto=format&fit=crop', // street food
    'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1400&auto=format&fit=crop', // yoga
    'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1400&auto=format&fit=crop', // beach
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop', // monsoon
  ],
  entertainment: [
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1400&auto=format&fit=crop', // cinema
    'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1400&auto=format&fit=crop', // awards
    'https://images.unsplash.com/photo-1518894781321-630e638d0742?q=80&w=1400&auto=format&fit=crop', // director
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1400&auto=format&fit=crop', // music
    'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=1400&auto=format&fit=crop', // OTT
    'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=1400&auto=format&fit=crop', // interview
  ],
  world: [
    'https://images.unsplash.com/photo-1502920917128-1aa500764ce7?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1451188502541-13943edb6acb?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=1400&auto=format&fit=crop',
  ],
  business: [
    'https://images.unsplash.com/photo-1554224155-3a589877462f?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1400&auto=format&fit=crop',
  ],
  science: [
    'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1451188502541-13943edb6acb?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517976487492-576ea6b2936d?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?q=80&w=1400&auto=format&fit=crop',
  ],
}

// Realistic title pools per category
const titlePools: Partial<Record<string, string[]>> = {
  national: [
    'Prime Minister Addresses Press Conference on Reforms',
    'Parliament Debates New Budget Proposals',
    'Election Commission Announces Poll Schedule',
    'Nationwide Vaccination Drive Scales Up',
    'Monsoon Session: Key Highlights and Bills',
    'Police Briefing on Nationwide Security Measures',
  ],
  international: [
    'UN Summit Concludes with Historic Climate Deal',
    'Global Markets Rally Amid Renewed Optimism',
    'Peace Talks Resume in Conflict-hit Region',
    'G20 Ministers Meet in Delhi for Policy Roadmap',
    'Space Agency Announces Ambitious Lunar Mission',
    'International Aid Reaches Flood-hit Areas',
  ],
  'state-news': [
    'Chief Minister Launches Development Projects',
    'State Budget Focuses on Infrastructure Push',
    'Metro Extension Opens to Commuters',
    'Farmers Hold Talks with Officials',
    'City Marathon Draws Thousands of Runners',
    'Education Reforms Rolled Out Across Schools',
  ],
  sports: [
    'National Team Clinches Series Win',
    'Championship Finals Set for Sunday',
    'Star Striker Nets Spectacular Hat-trick',
    'Record Broken at National Athletics Meet',
    'Coach Announces World Cup Squad',
    'Fans Celebrate Historic Victory',
  ],
  technology: [
    'Tech Giant Unveils Next‑gen Smartphone',
    'AI Breakthrough Promises Faster Training',
    'Cybersecurity Alert for Major Vulnerability',
    'Startup Raises Series B Funding',
    'EV Maker Launches Affordable Model',
    'Cloud Provider Expands Data Centers in India',
  ],
  lifestyle: [
    'Healthy Morning Routines That Actually Work',
    'Minimalist Home Decor Trends of the Year',
    'Chef Shares Street Food Secrets',
    'Yoga for Daily Stress Relief',
    'Travel Guide: Hidden Beaches Near You',
    'Monsoon Fashion Essentials',
  ],
  entertainment: [
    'Blockbuster Trailer Breaks View Records',
    'Awards Season: Top Contenders to Watch',
    'Director Announces New Epic Trilogy',
    'Music Festival Lineup Revealed',
    'OTT Release Dominates Weekend Charts',
    'Actor Opens Up in Exclusive Interview',
  ],
  world: [
    'Global Elections Trigger Policy Shifts',
    'Humanitarian Corridors Open Amid Crisis',
    'Major Trade Pact Enters Into Force',
    'New Sanctions Target Rogue Networks',
    'Ceasefire Holds as Talks Progress',
    'Scientists Warn of Rapid Ice Melt',
  ],
  business: [
    'RBI Keeps Rates Unchanged, Markets React',
    'IPO Opens to Strong Investor Demand',
    'Manufacturing PMI Shows Robust Expansion',
    'Startups Eye Profitability Amid Cost Cuts',
    'Rupee Gains Against Dollar on Inflows',
    'E-commerce Giant Posts Record Sales',
  ],
  science: [
    'Researchers Map New Exoplanet Atmosphere',
    'Breakthrough in Quantum Communication',
    'Vaccine Shows Promise in Early Trials',
    'Ocean Study Finds Microplastics Surge',
    'Astronomers Capture Rare Cosmic Event',
    'Archaeologists Unearth Ancient City',
  ],
  videos: [
    'Top Headlines: Morning Bulletin',
    'Explainer: Inflation in 3 Minutes',
    'On Ground: Monsoon Updates',
    'Interview: Startup Founder on AI',
    'Report: Match Highlights',
    'Weekly Recap: What You Missed',
  ],
}

const demoImages: Record<string, string> = {
  technology:
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop',
  world:
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop',
  business:
    'https://images.unsplash.com/photo-1554224155-3a589877462f?q=80&w=1400&auto=format&fit=crop',
  sports:
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1400&auto=format&fit=crop',
  science:
    'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1400&auto=format&fit=crop',
  entertainment:
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1400&auto=format&fit=crop',
  national:
    'https://images.unsplash.com/photo-1520975922284-5f1f70dcd9df?q=80&w=1400&auto=format&fit=crop',
  international:
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1400&auto=format&fit=crop',
  'state-news':
    'https://images.unsplash.com/photo-1520974735194-1b2c646d1b5b?q=80&w=1400&auto=format&fit=crop',
  lifestyle:
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop',
  videos:
    'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1400&auto=format&fit=crop',
}

const authors = [
  { id: 'author-alex', name: 'Alex Doe' },
  { id: 'author-sam', name: 'Sam Lee' },
  { id: 'author-rin', name: 'Rin Patel' },
  { id: 'author-mia', name: 'Mia Chen' },
]

const categories = [
  'national',
  'international',
  'state-news',
  'sports',
  'technology',
  'lifestyle',
  'entertainment',
  'videos',
  'world',
  'business',
  'science',
] as const

function make(p: Partial<Article> & Pick<Article, 'title' | 'slug'>): Article {
  const content =
    p.content ||
    `${p.title}. This is a sample article body with enough words to compute reading time. `.repeat(
      8
    )
  return {
    id: p.id || p.slug,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || content.slice(0, 160),
    content,
    category: p.category || 'technology',
    tags: p.tags || ['news', p.category || 'tech'],
    author: p.author || authors[Math.abs(hashCode(p.slug)) % authors.length],
    featured: p.featured ?? false,
    featuredImage: p.featuredImage || {
      url: demoImages[p.category || 'technology'],
    },
    publishedAt: p.publishedAt || new Date().toISOString(),
    readingTime: readingTime(content).text,
    videoId: p.videoId,
    videoUrl: p.videoUrl,
  }
}

function hashCode(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return h
}

function buildArticles(): Article[] {
  const list: Article[] = []
  let index = 0
  for (const cat of categories) {
    for (let i = 1; i <= 6; i++) {
      const titles = titlePools[cat as string] || [
        `${cat[0].toUpperCase()}${cat.slice(1)} Story #${i}`,
      ]
      const title = titles[(i - 1) % titles.length]
      const slug = slugify(title)
      const featured = i === 1 // first of each category featured (6 featured total)
      const publishedAt = new Date(
        Date.now() - index * 1000 * 60 * 60 * 8
      ).toISOString()
      const videoIds = [
        'dQw4w9WgXcQ',
        'aqz-KE-bpKQ',
        'ysz5S6PUM-U',
        'ScMzIvxBSi4',
      ]
      const payload: Partial<Article> & Pick<Article, 'title' | 'slug'> = {
        title,
        slug,
        category: cat,
        tags: [
          cat,
          i % 2 === 0 ? 'analysis' : 'breaking',
          i % 3 === 0 ? 'opinion' : 'update',
        ],
        featured,
        publishedAt,
      }
      if (cat === 'videos') {
        payload.videoId = videoIds[(i - 1) % videoIds.length]
      }
      const pool = imagePools[cat as string]
      if (pool && pool.length) {
        payload.featuredImage = { url: pool[(i - 1) % pool.length] }
      } else if (!payload.featuredImage && demoImages[cat as string]) {
        payload.featuredImage = { url: demoImages[cat as string] }
      }
      list.push(make(payload))
      index++
    }
  }
  // Add a few special tech posts
  list.unshift(
    make({
      title: 'Introducing FlashNews',
      slug: 'introducing-FlashNews',
      category: 'technology',
      featured: true,
    }),
    make({
      title: 'Next.js 15 and Turbopack',
      slug: 'nextjs-15-and-turbopack',
      category: 'technology',
      featured: true,
    })
  )
  return list
}

export const sampleArticles: Article[] = buildArticles()

export function getFeatured() {
  return sampleArticles.filter((a) => a.featured).slice(0, 6)
}
export function getLatest() {
  return [...sampleArticles]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 12)
}
export function getBySlug(slug: string) {
  return sampleArticles.find((a) => a.slug === slug)
}
export function getByCategory(category: string) {
  return sampleArticles.filter((a) => a.category === category)
}
export function getByAuthor(name: string) {
  return sampleArticles.filter((a) => a.author.name === name)
}
