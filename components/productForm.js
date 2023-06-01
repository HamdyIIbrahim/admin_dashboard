import axios from "axios";
import useRouter from "next/router";
import { useEffect, useState } from "react";
import * as FileStack from "filestack-js";
import { ReactSortable } from "react-sortablejs";
import Image from "next/image";
function ProductForm({
  _id,
  title: productTitle,
  description: productDescription,
  price: productPrice,
  images,
  parentCategory: categoryName,
}) {
  const router = useRouter;
  const [title, setTitle] = useState(productTitle || "");
  const [photos, setPhotos] = useState(images || []);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState(productDescription || "");
  const [price, setPrice] = useState(productPrice || "");
  const [parentCategory, setParentCategory] = useState(categoryName || "");
  function GoTo() {
    router.push("/products");
  }
  async function createProduct(e) {
    e.preventDefault();
    if (_id) {
      //update product
      await axios
        .put(`/api/products?id=`+_id, {
          title: title,
          description: description,
          price: price,
          images: photos,
          parentCategory,
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
          images: photos,
          parentCategory,
        })
        .then((response) => console.log(response.data), GoTo())
        .catch((error) => console.error(error));
    }
  }
  async function UploadImages(ev) {
    ev.preventDefault();

    const client = FileStack.init("Apuhmeux0SxyydZYZPpKnz");
    client
      .picker({
        imageMax: [1024, 900],
        maxFiles: 1,
        onUploadDone: async (res) => {
          const URL = res.filesUploaded[0].url;
          console.log(URL);
          setPhotos(photos.concat(URL));
          console.log(photos);
        },
      })
      .open();
  }
  function UpdatingImages(photos) {
    setPhotos(photos);
  }
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);
  return (
    <form onSubmit={createProduct}>
      <label>Product Name :</label>
      <input
        type="text"
        placeholder="Product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Category name :</label>
      <select
        className="my-1"
        value={parentCategory}
        onChange={(ev) => {
          setParentCategory(ev.target.value);
          console.log(ev.target.value);
        }}
      >
        <option value="">Uncategorized</option>
        {categories?.map((category) => {
          return (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          );
        })}
      </select>
      <label>photos</label>
      <div className="mb-2 flex flex-wrap gap-2 items-center">
        <ReactSortable
          className="flex flex-wrap gap-2"
          list={photos}
          setList={UpdatingImages}
        >
          {!!photos?.length &&
            photos.map((photo) => (
              <div key={photo} className="h-24">
                <img src={photo} className="rounded-lg" alt="" />
              </div>
            ))}
        </ReactSortable>
        <label className="w-24 h-24 border-2 my-2 border-gray-50 flex flex-col justify-center items-center gap-1 text-center rounded-lg ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cloud-arrow-up"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
            />
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
          </svg>

          {/* <input type="file" onChange={(ev)=>UploadImages(ev)} className="hidden" /> */}
          <button onClick={(ev) => UploadImages(ev)}>upload</button>
        </label>
      </div>
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
