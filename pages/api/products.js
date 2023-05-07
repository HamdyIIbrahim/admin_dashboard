import axios from "axios";

export default async function handle(req, res) {
  const { method } = req;
  const data = JSON.parse(JSON.stringify(req.body));
  if (method === "POST") {
    axios.post(
      `${process.env.DOMAIN_URL}/products/newproduct`,data
    ).then((result)=>{
        res.json(result);
    }).catch((err)=>{
        console.log(err)
    });
  }
  if (method === "PUT") {
    axios
      .put(
        `https://admin-dashboard-backend-rnc4.onrender.com/products/editproduct`,
        data
      )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (method === "DELETE") {
    axios
      .delete(
        `https://admin-dashboard-backend-rnc4.onrender.com/products/delete/${Id}`
      )
      .then((result) => {
        res.send(result);
      });
  }
  res.json(req.body);
}
