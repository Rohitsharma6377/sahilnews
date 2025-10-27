import { Schema, model, models } from 'mongoose'

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String },
    shortDescription: { type: String, default: '' },
    longDescriptionHtml: { type: String, default: '' },
    content: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false, index: true },
    featuredImg: { type: String },
    images: { type: [String], default: [] },
    category: { type: String, default: 'general', index: true },
    tags: { type: [String], default: [], index: true },
    authorName: { type: String, default: 'Unknown', index: true },
    authorAvatar: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    videoId: { type: String },
    videoUrl: { type: String },
  },
  { timestamps: true }
)

ArticleSchema.index({
  title: 'text',
  excerpt: 'text',
  content: 'text',
  tags: 'text',
})

export const ArticleModel = models.Article || model('Article', ArticleSchema)
