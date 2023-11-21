import { ArrowRight } from "lucide-react";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Link from "next/link";
import Image from "next/image";

async function getData() {
  const query = `*[_type == 'product'][0...4] | order(_createdAt desc) {  
        _id,
          price,
          name,
          "slug": slug.current,
          "categoryName": category->name,
          "imageUrl": images[0].asset->url
      }`; // trazimo u vision u sanity ono sto nam treba i kopiramo ovdje //

  const data = await client.fetch(query);
  return data;
}

const Newest = async () => {
  const data: simplifiedProduct[] = await getData(); // napravili smo posebni fajl za tipove(interface.ts) koji koristimo za data //
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest products
          </h2>

          <Link
            href="/all"
            className="flex items-center text-primary gap-x-1 font-semibold"
          >
            See All{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl} // da nam se preko funkcije map prikazu 4 slike na ekranu koje smo napravili u sanity, prije toga smo morali naci njihov imageUrl preko vision //
                  alt="Product image"
                  className="w-full h-full object-cover object-center lg:h-full lg-w-full"
                  width={300}
                  height={300}
                />
              </div>

              <div className="flex justify-between pt-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm text-gray-800">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newest;
