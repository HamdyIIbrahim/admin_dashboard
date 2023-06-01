import Layout from "@/components/layout/layout";
import ProductForm from "@/components/productForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct() {
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

  return (
    <Layout>
      <h1>Edit Product</h1>
      {product && <ProductForm {...product} />}
    </Layout>
  );
}