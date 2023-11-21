import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";
import Link from "next/link";

async function getData(category: string) {
  const query = `
*[_type == "product" && category->name == "${category}"]{
    _id,
      "imageUrl": images[0].asset->url,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name
  }`;

  const data = await client.fetch(query);

  return data;
}

export const dynamic = "force-dynamic"; // komanda za svaku promjenu da budu dynamic, a na cashed //

// ovo je komponenta za putanju na linkove, zbog toga smo pravili [category] folder //

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const data: simplifiedProduct[] = await getData(params.category); // ne zelimo da nam data ima type any, pa mu stavljamo type simplifiedProduct iz interface fajla //

  return (
    // kopirali smo sve iz komponente Newest sa nekim modifikacijama //

    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Our Products for {params.category}
            </h2>
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
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
