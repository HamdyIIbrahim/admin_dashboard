import axios from "axios";

export default function handle(req, res) {
  const { method } = req;
  const data = JSON.parse(JSON.stringify(req.body));
  if (method === "POST") {
    // const {name , parentCategory} =data;
    // const newParentCategory= new ObjectId(parentCategory)
    axios
      .post(
        "https://admin-dashboard-backend-rnc4.onrender.com/category/newcategory",data)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // if (method === "GET") {
  //   axios
  //     .get(
  //       "https://admin-dashboard-backend-rnc4.onrender.com/category/allcategories"
  //     )
  //     .then((result) => {
  //       res.json(JSON.parse(JSON.stringify(result.data)));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}
