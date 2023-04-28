import Layout from "@/components/layout/layout";
import axios from "axios";
import { useState } from "react";

function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  async function createProduct(e){
    e.preventDefault();
    // const data = {title , description , price};
    // console.log(data)
    await axios.post('/api/products', {
      title:title,
      description:description,
      price:price,
    }).then(response => console.log(response.data))
    .catch(error => console.error(error));
  }
  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>New Project</h1>
        <label>Product Name :</label>
        <input
          type="text"
          placeholder="Product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description :</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price :</label>
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" className="btn-primary">Save</button>
      </form>
    </Layout>
  );
}
export default NewProduct;
