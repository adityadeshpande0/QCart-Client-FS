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
      <div
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="overflow-x-auto"
      >
        <Tabs.List className="flex whitespace-nowrap space-x-4 pb-2 min-w-full">
          {categories.map((category) => (
            <Tabs.Trigger
              key={category}
              value={category}
              className="px-4 py-2 shrink-0 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:font-semibold"
            >
              {category
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())
              .replace(/Ice Creams/i, "Ice Cream")}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>
    </Tabs.Root>
  );
};

export default CategoryTabs;
