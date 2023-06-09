import { Schema, model, models } from 'mongoose';

const ProductSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    price:{
        type:Number,
        required:true
    },
    images:[{type:String}],
    parentCategory:{
        type:Schema.Types.ObjectId,
        ref:'Categories'
    }
})

const Product = models?.Product ||model('Product',ProductSchema)

export default Product;