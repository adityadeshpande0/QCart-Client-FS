import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "@/admin-related/apiQueries/adminRelatedApiCalls";
import ProductCard from "@/components/reusables/cards/ProductCard";

const MainScreen: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetAllProductsQuery({});
  console.log(data);
  return (
    <Box p="4" maxW="1200px" mx="auto">
      <ProductCard
        title="Living Room Sofa"
        price={450}
        image="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1770&q=80"
        onAddToCart={(qty) => console.log(`Added ${qty} to cart`)}
      />
    </Box>
  );
};

export default MainScreen;
