
import axios from "axios";
import { useState } from "react";

function ProductForm({
    title:productTitle,
    description:productDescription,
    price:productPrice
}) {
  const [title, setTitle] = useState(productTitle || "");
  const [description, setDescription] = useState(productDescription|| "");
  const [price, setPrice] = useState(productPrice|| "");
  async function createProduct(e){
    e.preventDefault();
    await axios.post('/api/products', {
      title:title,
      description:description,
      price:price,
    }).then(response => console.log(response.data))
    .catch(error => console.error(error));
  }
  return (
    
      <form onSubmit={createProduct}>
        
        <label>Product Name :</label>
        <input
          type="text"
          placeholder="Product name"
          value={productTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description :</label>
        <textarea
          placeholder="description"
          value={productDescription}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price :</label>
        <input
          type="text"
          placeholder="Price"
          value={productPrice}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" className="btn-primary">Save</button>
      </form>
    
  );
}
export default ProductForm;
