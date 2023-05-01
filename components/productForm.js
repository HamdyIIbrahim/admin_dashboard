import axios from "axios";
import  useRouter  from "next/router";
import { useState } from "react";

function ProductForm({
  _id,
  title: productTitle,
  description: productDescription,
  price: productPrice,
}) {
    const router = useRouter
  const [title, setTitle] = useState(productTitle || "");
  const [description, setDescription] = useState(productDescription || "");
  const [price, setPrice] = useState(productPrice || "");
  function GoTo() {
    router.push("/products");
  }
  async function createProduct(e) {
    e.preventDefault();
    if (_id) {
        //update product
        await axios
        .put("/api/products", {
          title: title,
          description: description,
          price: price,
          id:_id
        })
        .then((response) => console.log(response.data), GoTo())
        .catch((error) => console.error(error));
    } else {
        //create product
      await axios
        .post("/api/products", {
          title: title,
          description: description,
          price: price,
        })
        .then((response) => console.log(response.data), GoTo())
        .catch((error) => console.error(error));
    }
  }

  return (
    <form onSubmit={createProduct}>
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
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
export default ProductForm;
