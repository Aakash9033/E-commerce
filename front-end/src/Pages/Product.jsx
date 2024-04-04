import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Breadcrums from "../Components/Breadcrums/Breadcrums";
import { useParams } from "react-router-dom";
import Productdisplay from "../Components/Productdisplay/Productdisplay";
import Discriptionbox from "../Components/Discriptionbox/Discriptionbox";
import Relatedproducts from "../Components/Relatedproducts/Relatedproducts";
const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  // console.log(productId);
  const product = all_product.find((e) => e.id === Number(productId));
  // console.log(product);
  return (
    <div>
      <Breadcrums product={product} />
      <Productdisplay product={product} />
      <Discriptionbox />
      <Relatedproducts />
    </div>
  );
};

export default Product;
