import { Schema, model, models } from 'mongoose';

const CategoriesSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    parentCategory:{
        type:Schema.Types.ObjectId,
        ref:'Categories'
    },
})


const Categories = models?.Categories ||model('Categories',CategoriesSchema);
export default Categories;