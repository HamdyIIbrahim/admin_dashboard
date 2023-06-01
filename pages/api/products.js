import connectMongo from "@/lib/mongoose";
import Product from "@/models/product";


export default async function handle(req, res) {
  const { method } = req;
  await connectMongo();
  
  const data = JSON.parse(JSON.stringify(req.body));
  if(method === 'GET'){
    if(req.query?.id){
      res.json(await Product.findOne({_id:req.query.id}).populate("parentCategory"));
    }else{
      const response = await Product.find().populate("parentCategory");
      console.log("✨✨",response)
      res.json(response);
    }
  }
  if (method === "POST") {
    const {title , description ,price,images,parentCategory}=req.body;
    const product = await Product.create({title , description ,price,images,parentCategory});
    console.log(product);

    res.json(result);
  }
  if (method === "PUT") {
    if(req.query?.id){
      const {title , description ,price,images,parentCategory}=req.body;
      const updateProduct =await Product.findByIdAndUpdate({_id:req.query.id},{title,description,price,images,parentCategory});
      res.json("Product update successfully")
    }
  }
  if (method === "DELETE") {
    if(req.query?.id){
    const product = await Product.findByIdAndDelete({_id:req.query.id});
    res.status(200).json("Product deleted successfully")
  }
}
  res.json(req.body);
}
