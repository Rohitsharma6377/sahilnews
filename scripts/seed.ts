import 'dotenv/config'
import { dbConnect } from '@/lib/db/mongoose'
import { ArticleModel } from '@/lib/models/Article'
import { sampleArticles } from '@/lib/data'

async function main() {
  await dbConnect()
  for (const a of sampleArticles) {
    await ArticleModel.updateOne(
      { slug: a.slug },
      {
        $setOnInsert: {
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt,
          content: a.content,
          featured: a.featured,
          featuredImg: a.featuredImage?.url,
          category: a.category,
          tags: a.tags,
          authorName: a.author?.name || 'Unknown',
          authorAvatar: a.author?.avatar,
        },
      },
      { upsert: true }
    )
  }
  console.log('Seed complete')
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
