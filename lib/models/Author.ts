import { Schema, model, models } from 'mongoose'

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    email: { type: String },
    role: {
      type: String,
      enum: ['admin', 'editor'],
      default: 'editor',
      index: true,
    },
    bio: { type: String, default: '' },
    avatar: { type: String },
  },
  { timestamps: true }
)

export const AuthorModel = models.Author || model('Author', AuthorSchema)
