// import connectMongo from "@/lib/mongoose";
// import Product from "@/models/product";

// export default async function handle(req, res) {
//   const { method } = req;
//   console.log("a7la mesa");

//   await connectMongo();
//   const data =JSON.parse(JSON.stringify(req.body))
//     if(method === 'GET'){
//     const {id} =req.params;
//     const getProduct = await Product.findById(id);
//   }
//   if(method === 'POST'){
//     const {Id} = data;
//     console.log('this id is '+Id);
//     const deleteProduct = await Product.findByIdAndDelete(Id);
//     if(deleteProduct){
//       res.json("Product deleted Successfully");
//     }
//   }
//   res.json(req.body)
// }
