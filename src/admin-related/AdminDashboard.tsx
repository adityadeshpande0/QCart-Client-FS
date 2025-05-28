import React from "react";
import ClickableCard from "@/components/reusables/cards/ClickableCard";

const cardData = [
  {
    to: "/manage-products",
    title: "Manage Products",
    body: "Add, update, or remove products from your store.",
  },
  {
    to: "/manage-orders",
    title: "Manage Orders",
    body: "View and process customer orders efficiently.",
  },
  {
    to: "/manage-delivery-partners",
    title: "Manage Delivery partners",
    body: "Add, update, or remove delivery partners for your store.",
  },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-2xl font-bold text-indigo-700 mb-8">
        Admin Dashboard
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

export default AdminDashboard;
