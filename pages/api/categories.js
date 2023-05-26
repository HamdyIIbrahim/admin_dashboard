import connectMongo from "@/lib/mongoose";
import Categories from "@/models/categories";
import axios from "axios";

export default async function handle(req, res) {
  const { method } = req;
  await connectMongo();
  const Data = JSON.parse(JSON.stringify(req.body));
  if (method === "GET") {
    const data = await Categories.find().populate("parentCategory").exec();
        res.status(200).send(data);
  }
  if (method === "POST") {
    const { name, parentCategory } = req.body;
    const response = await Categories.create({ name: name, parentCategory: parentCategory })
        if(response){
          res.status(200).json("category created successfully");
        }
  }
  if (method === "DELETE") {
    const { _id } = req.query;
    axios.delete(`${process.env.DOMAIN_URL}/deletecategory/${_id}`).then(() => {
      res.json("OK");
    });
    // Categories.findByIdAndDelete(_id).then((data) => {
    //   res.status(200).json(data);
    // })
    // .catch((err) => {
    //   res.status(500).json(err.message);
    // });
  }
}
