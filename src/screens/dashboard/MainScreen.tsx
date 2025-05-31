import React, { useState } from "react";
import { Box, SimpleGrid, Tabs } from "@chakra-ui/react";
import ProductCard from "@/components/reusables/cards/ProductCard";

// Dummy data
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

// Categories in same order as triggers
const categories = ["furniture", "lighting", "appliances"];

const MainScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <Box p="4" mx="auto">
      <Tabs.Root
        defaultValue={categories[0]}
        onValueChange={(details: { value: string }) =>
          setSelectedCategory(details.value)
        }
        className="mb-6"
      >
        <Tabs.List className="flex space-x-4 border-b border-gray-300 mb-4">
          <Tabs.Trigger
            value="furniture"
            className="px-4 py-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:font-semibold"
          >
            Furniture
          </Tabs.Trigger>
          <Tabs.Trigger
            value="lighting"
            className="px-4 py-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:font-semibold"
          >
            Lighting
          </Tabs.Trigger>
          <Tabs.Trigger
            value="appliances"
            className="px-4 py-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:font-semibold"
          >
            Appliances
          </Tabs.Trigger>
        </Tabs.List>

        {/* Tab Content Panels - optional if you want separate content areas */}
        {/* We don't really need Radix's Tabs.Content if filtering on value change */}

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
      </Tabs.Root>
    </Box>
  );
};

export default MainScreen;
