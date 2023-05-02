// import mongoose from "mongoose";

// export function mongooseConnect(){
//     if(mongoose.connection.readyState === 1){
//         console.log("connected successfully");
//         return mongoose.connection.asPromise();
//     }else{
//         const uri = process.env.MONGODB_URI;
//         return mongoose.connect(uri);
//     }
// }
// const connectDB = async () => {
//     try {
//     const uri = process.env.MONGODB_URI;
//       await mongoose.connect(uri);
//       console.log(`connect successfully`);
//     } catch (error) {
//       console.error(`Error: ${error.message}`);
//     }
// };
  
// export default connectDB;
  