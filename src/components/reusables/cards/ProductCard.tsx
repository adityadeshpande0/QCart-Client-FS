import { Button, Card, Image, Text, HStack } from "@chakra-ui/react";
import React, { useState } from "react";

interface ProductCardProps {
  title: string;
  price: number | string;
  image: string;
  onAddToCart?: (quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(1);
    onAddToCart?.(1);
  };

  const increment = () => {
    setQuantity((prev) => {
      const newQty = prev + 1;
      onAddToCart?.(newQty);
      return newQty;
    });
  };

  const decrement = () => {
    setQuantity((prev) => {
      const newQty = prev > 1 ? prev - 1 : 0;
      onAddToCart?.(newQty);
      return newQty;
    });
  };

  return (
    <Card.Root className="w-full max-w-[90%] sm:max-w-sm md:max-w-xs lg:max-w-[280px] border border-gray-200 bg-white hover:shadow-md transition duration-300 text-sm rounded-lg overflow-hidden">
      <Image
        src={image}
        alt={title}
        className="w-full h-40 sm:h-44 md:h-48 object-cover"
      />
      <Card.Body className="px-4 py-3 space-y-2">
        <Card.Title className="text-base sm:text-lg font-semibold">
          {title}
        </Card.Title>
        <Text className="text-lg font-bold">${price}</Text>
      </Card.Body>
      <Card.Footer className="flex justify-between items-center px-4 py-3">
        {quantity === 0 ? (
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-black text-white hover:bg-gray-300 hover:text-black px-4 py-2 text-sm sm:text-base"
            variant="ghost"
          >
            Add to cart
          </Button>
        ) : (
          <HStack gap={2}>
            <Button
              onClick={decrement}
              size="xs"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 text-sm"
            >
              −
            </Button>
            <Text className="text-sm font-medium">{quantity}</Text>
            <Button
              onClick={increment}
              size="xs"
              className="bg-gray-800 hover:bg-gray-300 text-white px-3 py-1 text-sm"
            >
              +
            </Button>
          </HStack>
        )}
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
