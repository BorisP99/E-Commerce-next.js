"use client";

import { useState } from "react";
import { urlFor } from "../lib/sanity";
import Image from "next/image";

interface iAppProps {
  images: any;
}

const ImageGallery = ({ images }: iAppProps) => {
  const [bigImage, setBigImage] = useState(images[0]); // koristicemo state da bi prikazali jednu vecu sliku pored ostalih malih slika //

  const handleSmallImageClick = (image: any) => {
    // funkcija koja nam omogucava da kliknemo na slike //
    setBigImage(image);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="flex gap-4 lg:order-none lg:flex-col order-last ">
        {images.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()} // tri manje slike ce nam se prikazati na ekranu, kada udjemo u product //
              alt="Photo"
              width={200}
              height={200}
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleSmallImageClick(image)} // funkcija koja nam omogucava da kliknemo na slike //
            />
          </div>
        ))}
      </div>

      <div className="overflow-hidden relative rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()}
          alt="Big photo"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
};

export default ImageGallery;
