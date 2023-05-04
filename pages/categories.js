import Layout from "@/components/layout/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios.get("https://admin-dashboard-backend-rnc4.onrender.com/category/allcategories").then((result) => {
      setCategories(result.data);
      console.log(categories);
    });
  }, []);
  function saveCatrgories(ev) {
    ev.preventDefault();
    axios
      .post("/api/categories", { name })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
    setName("");
    router.push('/categories')
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
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
    </Layout>
  );
}
