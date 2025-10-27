import { Schema, model, models } from 'mongoose'

const MediaAssetSchema = new Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true, unique: true, index: true },
    resource_type: { type: String, default: 'image' },
    format: { type: String },
    bytes: { type: Number },
    width: { type: Number },
    height: { type: Number },
    folder: { type: String, default: 'FlashNews' },
  },
  { timestamps: true }
)

export const MediaAssetModel =
  models.MediaAsset || model('MediaAsset', MediaAssetSchema)
