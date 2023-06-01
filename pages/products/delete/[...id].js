import Layout from "@/components/layout/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if(id){
      axios
      .get(`/api/products?id=`+id)
      .then((result) => {
        console.log(result.data);
        setProduct(result.data);
      });
    }
  }, [id]);
  function GoBack() {
    router.push("/products");
  }
  function DeleteProduct(e) {
    e.preventDefault();
    axios
      .delete(`/api/products?id=`+id)
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
