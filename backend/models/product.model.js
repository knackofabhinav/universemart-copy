const mongoose = require('mongoose')
require('mongoose-type-url');


const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: mongoose.SchemaTypes.Url, required: true},
    url: {type: mongoose.SchemaTypes.Url, required: true},
    inStock: {type: Boolean, required: true},
    fastDelivery: {type: Boolean, required: true},
    description: {
        author: {
            name: {type: String},
            about: {type: String}
        },
        review: [String]
    }
},{
    timestamps: true,
  })

const Product = mongoose.model("Product", ProductSchema)

module.exports = { Product }