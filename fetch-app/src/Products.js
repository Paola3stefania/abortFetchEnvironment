import React from "react";
import useAxios from "axios-hook";

export const Products = () => {
  console.log(`Products rendering@${new Date().getTime()}`);
  const { data, loading, error } = useAxios(
    {
      url: "https://dummyjson.com/products"
    },
    { useCache: false }
  );

  return <div>Products</div>;
};

export default Products;
