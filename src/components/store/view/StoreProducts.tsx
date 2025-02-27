"use client";

import Card from "@/components/ui/Card";
import CardHeader from "@/components/ui/CardHeader";
import Button from "@/components/ui/Button";
import { Star, Heart, Share2, MessageCircle, Plus } from "lucide-react";

type StoreProductProps = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  category: {
    label: string;
    color: string;
  };
  rating: number;
  stock: number;
};

const products: StoreProductProps[] = [
  {
    id: "1",
    name: "Organic Dog Food",
    price: "$29.99",
    image: "/assets/dashboard/product-1.png",
    description: "Premium organic dog food made with natural ingredients",
    category: {
      label: "Pet Food",
      color: "bg-[#73b9eb]/10 text-[#73b9eb]",
    },
    rating: 4.5,
    stock: 50,
  },
  {
    id: "2",
    name: "Eco-Friendly Dog Bowl",
    price: "$15.99",
    image: "/assets/dashboard/product-2.png",
    description:
      "Sustainable bamboo dog bowl, perfect for eco-conscious pet owners",
    category: {
      label: "Accessories",
      color: "bg-[#73b9eb]/10 text-[#73b9eb]",
    },
    rating: 4.8,
    stock: 30,
  },
];

export default function StoreProducts() {
  return (
    <div className="max-w-[1149px] mx-auto space-y-8">
      {products.map((product) => (
        <Card
          key={product.id}
          className="bg-[#151127] rounded-[19px] p-[30px] h-[1017px] flex flex-col justify-between"
        >
          <div className="flex-grow space-y-8">
            <CardHeader
              title={product.name}
              action={{
                label: product.price,
                href: "#",
              }}
            />
            <div className="relative aspect-[16/9] w-full rounded-[19px] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-6 border-t border-gray-800">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors">
                <Heart className="w-6 h-6 fill-current" />
                <span>23.1k</span>
              </button>
              <button className="flex items-center gap-2 text-[#53ACEC] hover:text-[#53ACEC]/80 transition-colors">
                <MessageCircle className="w-6 h-6" />
                <span>Comments</span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="text-[#53ACEC] border-[#53ACEC] hover:bg-[#53ACEC]/10"
              >
                Animal Welfare
              </Button>
              <Button
                variant="outline"
                className="text-[#53ACEC] border-[#53ACEC] hover:bg-[#53ACEC]/10"
              >
                Social Service
              </Button>
            </div>
            <Button
              variant="outline"
              className="text-[#53ACEC] border-[#53ACEC] hover:bg-[#53ACEC]/10 w-[154px] h-[50px] rounded-[46px] border-2"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
