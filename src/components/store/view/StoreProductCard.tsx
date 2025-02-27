"use client";

import { Star } from "lucide-react";
import Image from "next/image";

export default function StoreProductCard({
  name,
  price,
  image,
  description,
  category,
  rating,
  stock,
}: {
  name: string;
  price: string | number;
  image: string;
  description: string;
  category: {
    label: string;
    color: string;
  };
  rating: number;
  stock: number;
}) {
  return (
    <div className="bg-[#151127] rounded-[19px] p-[30px] w-full h-[1017px] flex flex-col">
      <div className="relative w-full h-[600px] rounded-[19px] overflow-hidden mb-8">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 1149px) 100vw"
          priority
        />
      </div>
      <div className="flex flex-col flex-grow space-y-6">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-semibold text-white">{name}</h3>
          <span className="text-2xl font-bold text-[#73b9eb]">{price}</span>
        </div>
        <p className="text-lg text-gray-400">{description}</p>
        <div className="flex items-center gap-4">
          <span
            className={`px-4 py-2 rounded-full text-base ${category.color}`}
          >
            {category.label}
          </span>
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-lg">{rating}</span>
          </div>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-gray-400 text-lg">{stock} in stock</span>
          <button className="px-8 py-4 bg-[#73b9eb] text-white rounded-lg hover:bg-[#5aa0d8] transition-colors text-lg font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
