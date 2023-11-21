"use client";

import { Button } from "@/components/ui/button"; // koristimo shadcn-ui za neke komponente //
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";

const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
];

const NavBar = () => {
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();

  return (
    <header className="flex justify-between items-center space-x-4 px-4 sm:px-6 m-auto border-b mb-8">
      {/* <div className="flex flex-row items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl"> */}
      <Link href="/">
        <h1 className="text-2xl md:text-4xl font-bold">
          Next<span className="text-primary">Commerce</span>
        </h1>
      </Link>

      <nav className="hidden gap-12 lg:flex lg:ml-12 justify-between">
        {links.map((link, idx) => (
          <div key={idx}>
            {pathname === link.href ? (
              <Link
                href={link.href}
                className="text-xl font-semibold text-primary"
              >
                {link.name}
              </Link>
            ) : (
              <Link
                href={link.href}
                className="text-xl font-semibold text-gray-600 transition duration-100 hover:text-primary"
              >
                {link.name}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="flex divide-x border-r sm:border-l">
        <Button // iz shadcn-ui ugradjena komponenta sa ikonicom ShoppingBag koju smo dodali //
          variant={"outline"}
          onClick={handleCartClick} // postavljamo funkciju za klik na ikonicu Shopping Cart //
          className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
        >
          <ShoppingBag />
          <span className="hidden text-xs font-semibold text-gray-500 sm:block">
            Cart
          </span>
        </Button>
      </div>
      {/* </div> */}
    </header>
  );
};

export default NavBar;
