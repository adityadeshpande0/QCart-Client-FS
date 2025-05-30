import React from "react";
import ClickableCard from "@/components/reusables/cards/ClickableCard";

const cardData = [
  {
    to: "/manage-products/add",
    title: "Add Products",
    body: "Add new products to your inventory with essential details.",
  },
  {
    to: "/manage-products/manage",
    title: "Manage Products",
    body: "Update product information, prices, and availability.",
  },
];

const ManageProductsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-2xl font-bold text-indigo-700 mb-8">
        Manage Products Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cardData.map(({ to, title, body }) => (
          <ClickableCard
            key={to}
            to={to}
            title={title}
            body={body}
            size="md"
            variant="elevated"
          />
        ))}
      </div>
    </div>
  );
};

export default ManageProductsDashboard;
