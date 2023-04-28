import Layout from "@/components/layout/layout";
import Link from "next/link";

function Products(){
    return(
        <Layout>
            <Link href='/products/new' className="btn-primary">Add new product</Link>
        </Layout>
    )
}
export default Products;