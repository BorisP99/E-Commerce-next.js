"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";

import { ProductCart } from "./AddToBag"; // importovali smo interfejs iz komponente Add To Bag //

const Checkout = ({
  name,
  description,
  price,
  currency,
  image,
  price_id,
}: ProductCart) => {
  const { checkoutSingleItem } = useShoppingCart();

  function buyNow(priceId: string) {
    // funkcija za checkout, kupovinu itema preko stripe //
    checkoutSingleItem(priceId);
  }

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
  };

  return (
    <Button
      onClick={() => {
        buyNow(product.price_id); // vracemo funkciju kojoj prosledjujemo iz konstante product price_id //
      }}
    >
      Checkout
    </Button>
  );
};

export default Checkout;
