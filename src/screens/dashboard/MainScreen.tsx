import React, { useState } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import ProductCard from "@/components/reusables/cards/ProductCard";
import CategoryTabs from "@/components/reusables/tabs/CategoryTabs";
import { useGetAllProductsQuery } from "@/admin-related/apiQueries/adminRelatedApiCalls";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

const MainScreen: React.FC = () => {
  const { data, isLoading } = useGetAllProductsQuery({});

  // Always define hooks at the top level
  const categories = data?.products
    ? Array.from(new Set(data.products.map((d: any) => d.category))) as string[]
    : [];

  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");

  // Keep selectedCategory in sync if categories change
  React.useEffect(() => {
    if (categories.length > 0 && !categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  if (isLoading || !data || !data.products) {
    return (
      <Box p="4" mx="auto">
        <Text>Loading...</Text>
      </Box>
    );
  }

  const filteredProducts = data.products.filter(
    (product: Product) => product.category === selectedCategory
  );

  return (
    <Box p="4" mx="auto">
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      {filteredProducts.length === 0 ? (
        <Text className="text-center text-gray-500 text-sm mt-10">
          No products to display in this category.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="6">
          {filteredProducts.map(({ id, title, price, image }: Product) => (
            <ProductCard
              key={id}
              title={title}
              price={price}
              image={image}
              onAddToCart={(qty) =>
                console.log(`Added ${qty} of ${title} to cart`)
              }
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default MainScreen;