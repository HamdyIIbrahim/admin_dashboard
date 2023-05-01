import axios from "axios";
export default async function handle(req, res) {
  const { method } = req;
  const data =JSON.parse(JSON.stringify(req.body))
  if(method === 'POST'){
    const {Id} = data;
    console.log('this id is '+Id);
    axios
      .delete(`https://admin-dashboard-backend-rnc4.onrender.com/products/delete/${Id}`)
      .then(() => {
        res.json("product deleted successfully");
      });
  }
  res.json(req.body)
}
