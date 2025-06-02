import React, { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_PORT_SOCKET_URL, {
  withCredentials: true,
});

const ManageOrders: React.FC = () => {
  useEffect(() => {
    socket.connect();
    socket.emit("join-admin");

    socket.on("new-order", (data) => {
      console.log("New order received:", data.order);
      // Add state update or toast here
    });

    return () => {
      socket.off("new-order");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-xl font-semibold">Manage Orders</h1>
      {/* Render order list here */}
    </div>
  );
};

export default ManageOrders;
