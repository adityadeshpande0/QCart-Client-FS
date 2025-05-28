import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const StoreLanding: React.FC = () => {
  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-10">
      <Box className="max-w-2xl text-center bg-white shadow-xl rounded-2xl p-6 sm:p-10 space-y-6">
        <Heading
          as="h1"
          className="text-indigo-600 font-bold text-2xl sm:text-3xl md:text-4xl"
        >
          Groceries at Your Doorstep — Fast
        </Heading>

        <Text className="text-gray-600 text-base sm:text-lg">
          Order essentials, snacks, and more. Delivered in minutes. Shop anytime, anywhere.
        </Text>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/login">
            <Button
              colorScheme="indigo"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-100 px-6 py-2 rounded-xl transition"
            >
              Register
            </Button>
          </Link>
        </div>

        <Text className="text-sm text-gray-400 pt-2">
          New to QuickMart? Sign up now and get ₹100 off on your first order!
        </Text>
      </Box>
    </Box>
  );
};

export default StoreLanding;
