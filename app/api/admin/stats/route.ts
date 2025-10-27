import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db/mongoose'
import { requireAdmin } from '@/lib/api/session'
import { ArticleModel } from '@/lib/models/Article'
import { CategoryModel } from '@/lib/models/Category'
import { TagModel } from '@/lib/models/Tag'
import { AuthorModel } from '@/lib/models/Author'
import { SubscriberModel } from '@/lib/models/Subscriber'
import { MediaAssetModel } from '@/lib/models/MediaAsset'

export async function GET() {
  const admin = await requireAdmin()
  if (!admin)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  await dbConnect()
  const [articles, categories, tags, authors, subscribers, media] =
    await Promise.all([
      ArticleModel.countDocuments({}),
      CategoryModel.countDocuments({}),
      TagModel.countDocuments({}),
      AuthorModel.countDocuments({}),
      SubscriberModel.countDocuments({}),
      MediaAssetModel.countDocuments({}),
    ])
  return NextResponse.json({
    articles,
    categories,
    tags,
    authors,
    subscribers,
    media,
  })
}
