import { Schema, model, models } from 'mongoose'

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
)

export const CategoryModel =
  models.Category || model('Category', CategorySchema)
