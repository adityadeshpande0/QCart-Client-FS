// pages/MainScreen.tsx (or wherever)
import React, { useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "@/components/reusables/cards/ProductCard";
import CategoryTabs from "@/components/reusables/tabs/CategoryTabs";


const products = [
  {
    id: 1,
    title: "Living Room Sofa",
    description: "Perfect for modern or baroque-inspired interiors.",
    price: 450,
    category: "furniture",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 2,
    title: "Modern Lamp",
    description: "Stylish lamp to light up your living room.",
    price: 120,
    category: "lighting",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Office Chair",
    description: "Ergonomic chair for your workspace.",
    price: 250,
    category: "furniture",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Ceiling Fan",
    description: "Keep cool with this modern ceiling fan.",
    price: 180,
    category: "appliances",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = ["furniture", "lighting", "appliances"];

const MainScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <Box p="4" mx="auto">
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="6">
        {filteredProducts.map(({ id, title, price, image }) => (
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
    </Box>
  );
};

export default MainScreen;
