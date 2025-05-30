import React from "react";
import { useGetAllProductsQuery } from "../apiQueries/adminRelatedApiCalls";

const ProductManagement: React.FC = () => {
  const { data, error, isLoading } = useGetAllProductsQuery({});

  console.log(data)

  return <>Manage Products</>;
};

export default ProductManagement;
