import axios from "axios";

export default function handle(req, res) {
  const { method } = req;
  const Data = JSON.parse(JSON.stringify(req.body));
  if (method === "POST") {
    // const {name , parentCategory} =req.body;
    // const newParentCategory= new ObjectId(parentCategory)
    axios
      .post(`https://admin-dashboard-backend-rnc4.onrender.com/newcategory`, Data)
      .then(() => {
        res.json("categoriy added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if(method === "DELETE"){
    const {_id}=req.query;
    axios.delete(`${process.env.DOMAIN_URL}/deletecategory/${_id}`).then(()=>{
      res.json('OK');
    })
  }
}
