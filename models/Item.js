const { model, Schema } = require('mongoose')

const Item = new Schema({
  product: {
    type: String,
    required: true
  },
  amznUrl: {
    type: String,
    required: true
  },
  youtubeUrl: {
    type: String,
    required: true
  },
  isWatched: {
    type: Boolean,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

module.exports = model('Item', Item)
