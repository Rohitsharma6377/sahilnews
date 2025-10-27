import { Schema, model, models } from 'mongoose'

const TagSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
)

export const TagModel = models.Tag || model('Tag', TagSchema)
