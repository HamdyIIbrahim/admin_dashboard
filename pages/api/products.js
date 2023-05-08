import connectMongo from "@/lib/mongoose";
import Product from "@/models/product";
import axios from "axios";


export default async function handle(req, res) {
  const { method } = req;
  await connectMongo();
  const data = JSON.parse(JSON.stringify(req.body));
  if(method === 'GET'){
    const result = await Product.find();
        res.json(result);
      
  }
  if (method === "POST") {
    const product = await Product.create(data);
    console.log(product);
    res.json(result);
  }
  // if (method === "POST") {
  //   axios.post(
  //     `${process.env.DOMAIN_URL}/products/newproduct`,data
  //   ).then((result)=>{
  //       res.json(result);
  //   }).catch((err)=>{
  //       console.log(err)
  //   });
  // }
  if (method === "PUT") {
    // axios
    //   .put(
    //     `https://admin-dashboard-backend-rnc4.onrender.com/products/editproduct`,
    //     data
    //   )
    //   .then((result) => {
    //     res.json(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const {title , description ,price,images,id,parentCategory}=req.body;
    const updateProduct =await Product.findByIdAndUpdate(id,{title,description,price,images,parentCategory});
    res.json("Product update successfully")
  }
  if (method === "DELETE") {
    // axios
    //   .delete(
    //     `https://admin-dashboard-backend-rnc4.onrender.com/products/delete/${Id}`
    //   )
    //   .then((result) => {
    //     res.send(result);
    //   });
    const {_id}=req.query;
    const product = await Product.findByIdAndDelete(_id);
    res.status(200).json("Product deleted successfully")
  }
  
  res.json(req.body);
}
