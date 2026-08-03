import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetails(){

const {id} = useParams();

const [product, setProduct] = useState(null);


useEffect(()=>{

  const savedProducts = localStorage.getItem("products");

  if(savedProducts){

    const products = JSON.parse(savedProducts);

    const foundProduct = products.find(
      (p)=>p.id === Number(id)
    );

    setProduct(foundProduct);

  }

},[id]);



if (!product) {
  return <h2>Product not found</h2>;
}



return(
<div>

<h1>Product Details</h1>


<img
  src={product.image}
  alt={product.name}
  width="250"
  style={{ borderRadius: "10px" }}
/>


<h3>
Product ID : {product.id}
</h3>


<p>
Product Name : {product.name}
</p>


<p>
Price : ₹{product.price}
</p>


<p>
Stock : {product.stock}
</p>


<br />
<br />


<Link to="/">
  <button>
    ⬅ Back to Products
  </button>
</Link>


</div>
)

}

export default ProductDetails;