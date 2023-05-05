import Layout from "@/components/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function getAllCategories() {
    console.log('triggered')
    axios
      .get(
        "https://admin-dashboard-backend-rnc4.onrender.com/category/allcategories"
      )
      .then((result) => {
        setCategories(result.data);
        console.log(categories);
      });
  }
  async function saveCatrgories(ev) {
    ev.preventDefault();
    await axios
      .post("/api/categories", { name, parentCategory });
        getAllCategories();
        console.log({"😊😊😊":response.data});
      

    setName("");
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <label> New categories name</label>
      <form className="flex gap-1" onSubmit={saveCatrgories}>
        <input
          type="text"
          className="mb-0"
          placeholder="Category name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(ev) => setParentCategory(ev.target.value)}
        >
          <option value="">no parent category</option>
          {categories?.map((category) => {
            return (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td className="font-semibold">Category name</td>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => {
            return (
              <tr key={category._id}>
                <td>{category.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
}
