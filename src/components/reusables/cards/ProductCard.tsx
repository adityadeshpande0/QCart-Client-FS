import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  selectCartItems,
} from "@/screens/slices/cartSlice";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  units?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  units,
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartItem = cartItems.find((item) => item.id === id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name: title,
        price,
        quantity: 1,
        image,
        units,
      })
    );
  };

  return (
    <div className="max-w-[280px] w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="w-full h-40 sm:h-44 md:h-48 overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-base sm:text-lg font-semibold text-gray-900 truncate"
          title={title}
        >
          {title}
        </h3>
        <div className="mt-1 flex items-baseline space-x-2">
          <span className="text-lg font-bold text-gray-800">₹ {price}</span>
          {units && <span className="text-sm text-gray-500">{units}</span>}
        </div>
      </div>

      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="flex-grow bg-black text-white text-center py-2 rounded-md text-sm sm:text-base font-semibold hover:bg-gray-800 transition-colors"
            type="button"
          >
            Add to cart
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => dispatch(decrementQuantity(id))}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded px-3 py-1 text-lg font-semibold select-none transition-colors"
              type="button"
            >
              &minus;
            </button>
            <span className="text-sm font-medium w-6 text-center select-none">
              {quantity}
            </span>
            <button
              onClick={() => dispatch(incrementQuantity(id))}
              className="bg-black hover:bg-gray-800 text-white rounded px-3 py-1 text-lg font-semibold select-none transition-colors"
              type="button"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
