import React from "react";

import useAxios from "axios-hooks";

export const Products = () => {
  console.log(`Products rendering@${new Date().getTime()}`);
  const { data, loading, error } = useAxios(
    {
      url: "https://dummyjson.com/products",
    },
    { manual: false }
  );
  console.log(data && data);

  return <div>Products</div>;
};

export default Products;
