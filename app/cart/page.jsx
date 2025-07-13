'use client'
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext();

  return (
    <>
      <Navbar />

      {/* Main Content Wrapper */}
      <div className="flex flex-col lg:flex-row gap-10 px-4 sm:px-6 md:px-12 lg:px-24 pt-10 pb-20">
        
        {/* Left: Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 border-b border-gray-500/30 pb-4">
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-500">
              Your <span className="font-medium text-orange-600">Cart</span>
            </p>
            <p className="text-sm sm:text-lg md:text-xl text-gray-500/80">
              {getCartCount()} Items
            </p>
          </div>

          {/* Responsive Table */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-[600px] w-full table-auto">
              <thead className="text-left">
                <tr>
                  <th className="pb-4 px-2 text-gray-600 font-medium text-sm sm:text-base">Product Details</th>
                  <th className="pb-4 px-2 text-gray-600 font-medium text-sm sm:text-base">Price</th>
                  <th className="pb-4 px-2 text-gray-600 font-medium text-sm sm:text-base">Quantity</th>
                  <th className="pb-4 px-2 text-gray-600 font-medium text-sm sm:text-base">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cartItems).map((itemId) => {
                  const product = products.find(product => product._id === itemId);
                  if (!product || cartItems[itemId] <= 0) return null;

                  return (
                    <tr key={itemId}>
                      <td className="flex items-start gap-3 py-4 px-2">
                        <div className="flex-shrink-0 rounded-md bg-gray-100 p-2">
                          <Image
                            src={product.image[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover mix-blend-multiply"
                            width={128}
                            height={128}
                          />
                          <button
                            className="block md:hidden text-xs text-orange-600 mt-1"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="text-sm hidden md:block">
                          <p className="text-gray-800">{product.name}</p>
                          <button
                            className="text-xs text-orange-600 mt-1"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-sm text-gray-600">${product.offerPrice}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}>
                            <Image src={assets.decrease_arrow} alt="decrease_arrow" className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={cartItems[itemId]}
                            onChange={e => updateCartQuantity(product._id, Number(e.target.value))}
                            className="w-10 border text-center appearance-none text-sm"
                          />
                          <button onClick={() => addToCart(product._id)}>
                            <Image src={assets.increase_arrow} alt="increase_arrow" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-sm text-gray-600">
                        ${(product.offerPrice * cartItems[itemId]).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Continue Shopping */}
          <button
            onClick={() => router.push('/all-products')}
            className="group flex items-center mt-6 gap-2 text-orange-600 text-sm sm:text-base"
          >
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
            />
            Continue Shopping
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-96">
          <OrderSummary />
        </div>
      </div>
    </>
  );
};

export default Cart;
