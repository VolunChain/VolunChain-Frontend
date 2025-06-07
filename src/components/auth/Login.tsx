"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A061E] p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-[#151127] rounded-[30px] overflow-hidden max-w-5xl w-full mx-6 shadow-lg">
        <div className="relative hidden md:block bg-[#181934] p-16 rounded-tl-[30px] rounded-bl-[30px]">
          <div className="absolute top-14 left-14">
            <div className="flex items-center gap-6">
              <Image
                src="/logo.svg"
                alt="VolunChain Logo"
                width={180}
                height={180}
              />
            </div>
          </div>

          <Image
            src="/volunchain-illustration.png"
            alt="VolunChain Illustration"
            width={600}
            height={600}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-16 md:p-24 bg-[#0F112B] rounded-tr-[30px] rounded-br-[30px]">
          <p className="text-[#7C88B1] text-lg mb-6">Welcome back</p>

          <h1 className="dark:text-white text-4xl font-bold mb-6">
            Sign In to VolunChain
          </h1>

          <p className="text-[#7C88B1] text-lg mb-10">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#4285f4] hover:underline">
              Register
            </Link>
          </p>

          <button className="w-full mb-12 flex items-center justify-center gap-6 bg-transparent border border-[#73b9eb] text-[#73b9eb] rounded-full py-4 hover:bg-[#73b9eb]/10 transition-colors text-lg">
            <span>Sign in with Google</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.1711 8.36788H17.4998V8.33329H9.99984V11.6666H14.7094C14.0223 13.6071 12.1761 15 9.99984 15C7.23859 15 4.99984 12.7612 4.99984 10C4.99984 7.23871 7.23859 5 9.99984 5C11.2744 5 12.4344 5.48612 13.3177 6.28612L15.8261 3.77779C14.3177 2.36663 12.2594 1.5 9.99984 1.5C5.31734 1.5 1.49984 5.31746 1.49984 10C1.49984 14.6825 5.31734 18.5 9.99984 18.5C14.6823 18.5 18.4998 14.6825 18.4998 10C18.4998 9.43829 18.4098 8.89371 18.1711 8.36788Z"
                fill="#73b9eb"
              />
            </svg>
          </button>

          <div className="space-y-8">
            <div>
              <Input
                type="email"
                placeholder="Your email here"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Your password here"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full flex items-center justify-center gap-6 bg-[#EF565D] dark:text-white rounded-full py-4 hover:bg-[#EF565F]/90 transition-colors text-lg">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
