import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['fruits-vegetables', 'dairy-eggs', 'grains-pulses', 'snacks', 'beverages'],
    },
    unit: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    icon: { type: String, default: '' },
    color: { type: String, default: '#f1eddc' },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
)

productSchema.index({ name: 'text', description: 'text' })

export default mongoose.model('Product', productSchema)
