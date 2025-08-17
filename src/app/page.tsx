"use client";

import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { IoBookmarkOutline } from "react-icons/io5";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#07081F] w-[598px] rounded-[15px] p-4">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-r from-pink-500 to-violet-500"></div>
            <div>
              <h3 className="text-white font-semibold">Nombre de Usuario</h3>
              <p className="text-gray-400 text-sm">@username</p>
            </div>
          </div>
          <BsThreeDots className="text-white text-xl cursor-pointer" />
        </div>

        {/* Contenido */}
        <div className="mb-4">
          <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto.</p>
        </div>

        {/* Imagen */}
        <div className="w-full h-[315px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-[15px] mb-4"></div>

        {/* Botones de interacción */}
        <div className="flex justify-between items-center">
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <FaRegHeart className="text-white text-xl cursor-pointer" />
              <span className="text-white">1.2k</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegComment className="text-white text-xl cursor-pointer" />
              <span className="text-white">1.2k</span>
            </div>
            <div className="flex items-center gap-2">
              <PiShareFatLight className="text-white text-xl cursor-pointer" />
              <span className="text-white">1.2k</span>
            </div>
          </div>
          <IoBookmarkOutline className="text-white text-xl cursor-pointer" />
        </div>
      </div>
      <Footer />
    </main>
  )
}
