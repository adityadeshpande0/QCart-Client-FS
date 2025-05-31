// components/CategoryTabs.tsx
import { Tabs } from "@chakra-ui/react";
import React from "react";

type CategoryTabsProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <Tabs.Root
      value={selectedCategory}
      onValueChange={(details) => onCategoryChange(details.value)}
      className="mb-6"
    >
      <Tabs.List className="flex space-x-4 border-b border-gray-300 mb-4">
        {categories.map((category) => (
          <Tabs.Trigger
            key={category}
            value={category}
            className="px-4 py-2 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:font-semibold"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};

export default CategoryTabs;
