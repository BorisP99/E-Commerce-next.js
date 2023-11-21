"use client";

import Image from "next/image";

import {
  // ovo smo kopirali iz shadcn/ui //
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useShoppingCart } from "use-shopping-cart";

import { Button } from "@/components/ui/button";

const ShoppingCartModal = () => {
  const {
    // sve funkcije koja nam trebaju kroz Shopping Cart, da bi svako dugme radilo //
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart(); // da bi vidjeli imamo li nekih itema u cart, i da bi postavili shouldDisplayCart na true ili false(boolean) //

  async function handleCheckoutClick(e: any) {
    // pravimo funkciju za checkout, gdje gledamo ima li neki error //
    e.preventDefault();
    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.log("result");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="w-[90vw] sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col justify-between w-full">
          <div className="flex-1 overflow-y-auto mt-8">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="text-xl py-6">You don't have any items.</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image // da nam se u shopping bag prikaze slika proizvoda //
                          src={entry.image as string}
                          alt="Product Image"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="flex flex-1 flex-col ml-4">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-800">
                            <h3>{entry.name}</h3>
                            <p className="pr-6">${entry.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2 pr-2">
                            {entry.description}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">QTY:{entry.quantity}</p>
                          <div className="flex pr-4">
                            <button // dugme Remove, za brisanje itema iz Shopping Cart //
                              type="button"
                              onClick={() => {
                                removeItem(entry.id);
                              }}
                              className="font-medium text-primary hover:text-primary/70"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>

            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and Taxes are calculated at checkout.
            </p>

            <div className="mt-6">
              <Button onClick={handleCheckoutClick} className="w-full">
                Checkout
              </Button>
            </div>

            <div className="flex justify-center text-center text-sm text-gray-500 mt-6 ">
              <p>
                OR{" "}
                <button
                  onClick={handleCartClick}
                  className="font-medium text-primary hover:text-primary/70"
                >
                  Continue Shopping{" "}
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;
