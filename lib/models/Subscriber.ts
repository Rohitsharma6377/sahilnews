import { Schema, model, models } from 'mongoose'

const SubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
)

export const SubscriberModel =
  models.Subscriber || model('Subscriber', SubscriberSchema)
