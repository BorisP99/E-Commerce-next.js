import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";

import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";

import ImageGallery from "@/app/components/ImageGallery";
import AddToBag from "@/app/components/AddToBag";
import Checkout from "@/app/components/Checkout";

async function getData(slug: string) {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]{
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          price_id
      }`;

  const data = await client.fetch(query);

  return data;
}

export const dynamic = "force-dynamic"; // komanda za svaku promjenu da budu dynamic, a na cashed //

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  // ovo kreiramo preko slug, da bi nam se na link otvorila stranica za odredjeni product //

  const data: fullProduct = await getData(params.slug);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />{" "}
          {/* nova komponenta u kojoj cemo smjestiti slike */}
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>

            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.5</span>
                <Star className="h-5 w-5" />
              </Button>

              <span className="text-sm text-gray-500 transition duration-100">
                58 Ratings
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-lg font-bold text-gray-800 md:text-xl">
                  ${data.price}
                </span>
                <span className="text-red-500 line-through">
                  ${data.price + 30}
                </span>
              </div>

              <span className="text-sm text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6 text-gray-500">
              <Truck />
              <span className="text-sm">2--4 Days Shipping</span>
            </div>

            <div className="flex gap-2.5">
              <AddToBag
                currency="USD"
                description={data.description}
                price={data.price}
                name={data.name}
                image={data.images[0]}
                key={data._id}
                price_id={data.price_id}
              />

              <Checkout
                currency="USD"
                description={data.description}
                price={data.price}
                name={data.name}
                image={data.images[0]}
                key={data._id}
                price_id={data.price_id}
              />
            </div>

            <p className="mt-10 text-base text-gray-500">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
