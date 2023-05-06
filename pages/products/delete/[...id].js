import Layout from "@/components/layout/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const ID = router.query.id;
  useEffect(() => {
    axios
      .get(`https://admin-dashboard-backend-rnc4.onrender.com/products/${ID[0]}`)
      .then((result) => {
        setProduct(result.data);
      });
  }, []);
  function GoBack() {
    router.push("/products");
  }
  function DeleteProduct(e) {
    e.preventDefault();
    axios
      .post(`/api/delete/`, {
        Id: id,
      })
      .then((response) => console.log((response.statusText==="OK"?"product deleted successfully":"can't delete product") ), GoBack())
      .catch((error) => console.error(error));
  }

  return (
    <Layout>
      <h1 className="text-center">
        Do you want to Delete {product ? product.title : ""} ?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-primary" onClick={(e)=>DeleteProduct(e)}>
          Yes
        </button>
        <button className="btn-red" onClick={GoBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
