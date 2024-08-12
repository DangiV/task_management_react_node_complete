import mongoose from "mongoose";

const ProductDetails = mongoose.Schema({
    Title: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    createdBy: {
        type: String,
        require: true
    },
})

const ProductModel = mongoose.model('productData', ProductDetails);

export default ProductModel;