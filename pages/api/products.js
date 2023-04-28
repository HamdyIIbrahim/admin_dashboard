import axios from "axios";
export default async function handle(req, res) {
  const { method } = req;
  if (method === "POST") {
    const { title, description, price } = req.body;
    const data =JSON.parse(JSON.stringify(req.body))
    axios.post(
      "https://admin-dashboard-backend-rnc4.onrender.com/products/newproduct",data
    ).then((result)=>{
        res.json(result);
    }).catch((err)=>{
        console.log(err)
    });
    
  }
  res.json(req.body)
}
