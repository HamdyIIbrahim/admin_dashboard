import mongoose from "mongoose";

const connectMongo = async () => mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('connected successfully');
}).catch(()=>{
    console.log('connection faild');
});

export default connectMongo;
