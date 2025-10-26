import { Schema, model, models } from 'mongoose'

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String },
    content: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    featuredImg: { type: String },
    category: { type: String, default: 'general', index: true },
    tags: { type: [String], default: [], index: true },
    authorName: { type: String, default: 'Unknown', index: true },
    authorAvatar: { type: String },
  },
  { timestamps: true }
)

export const ArticleModel = models.Article || model('Article', ArticleSchema)
