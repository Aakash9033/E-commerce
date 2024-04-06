import React, { useEffect, useState } from "react";
import "./Listproduct.css";
// import Product from "../../../../backend/model/product";
import cross_icon from "../../assets/cross_icon.png";
const Listproduct = () => {
  const [allproucts, setAllProducts] = useState([]);
  const fetchinfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };
  useEffect(() => {
    fetchinfo();
  }, []);
  const remove_Product = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchinfo();
  };
  return (
    <div className="list-product">
      <h1>All products list</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproucts.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  src={item.image}
                  alt=""
                  className="listproduct-product-icon"
                />
                <p>{item.name}</p>
                <p>${item.old_price}</p>
                <p>${item.new_price}</p>
                <p>{item.category}</p>
                <img
                  src={cross_icon}
                  alt=""
                  className="listproduct-remove-icon"
                  onClick={() => {
                    remove_Product(item.id);
                  }}
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Listproduct;
