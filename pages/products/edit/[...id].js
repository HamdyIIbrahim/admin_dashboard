import Layout from "@/components/layout/layout";
import ProductForm from "@/components/productForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct(){
    const [product,setProduct]=useState(null);
    const router = useRouter();
    const ID = router.query.id;
    const id = ID[0];
    useEffect(()=>{
        axios.get(`https://admin-dashboard-backend-rnc4.onrender.com/products/${id}`).then((result)=>{
            console.log(result.data);
            setProduct(result.data)
        })
    },[id])
    
    return(
        <Layout>
            <h1>Edit Product</h1>
            {product && (<ProductForm {...product}/>)}
        </Layout>
    )
}