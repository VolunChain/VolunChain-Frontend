"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";

export default function RegisterFoundation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A061E] p-12">
      <div className="grid grid-cols-1 md:grid-cols-[6fr,7fr] bg-[#151127] rounded-[30px] overflow-hidden max-w-5xl w-full mx-6 shadow-lg">
        <div className="p-8 md:p-8 bg-[#0F112B] rounded-tr-[30px] rounded-br-[30px]">
          <div className="flex items-center justify-center md:hidden mb-6">
            <Image
              src="/logo.svg"
              alt="VolunChain Logo"
              width={180}
              height={180}
            />
          </div>
          <p className="text-[#73b9eb] text-sm mb-2 mt-10">
            Register Foundation Now
          </p>
          <h1 className="dark:text-white text-2xl font-bold mb-6">
            Sign Up Now!
          </h1>
          <p className="text-[#7C88B1] text-sm mb-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#73b9eb] font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>

          <Button
            variant="outline"
            className="w-full mb-7 flex text-lg"
            textColor="secondary"
          >
            Start with Google
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
          </Button>

          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Your name here"
                name="name"
                label="Name"
              />
            </div>
            <div>
              <TextArea
                placeholder="Your foundation description here"
                name="description"
                label="Description"
              />
            </div>

            <div>
              <Select
                name="category"
                label="Category"
                placeholder="Select the category of your foundation"
                options={[
                  { value: "Education", label: "Education" },
                  {
                    value: "Health and Well-being",
                    label: "Health and Well-being",
                  },
                  { value: "Social Services", label: "Social Services" },
                  {
                    value: "Disaster Relief and Emergency Response",
                    label: "Disaster Relief and Emergency Response",
                  },
                  { value: "Animal Welfare", label: "Animal Welfare" },
                  {
                    value: "Community Development",
                    label: "Community Development",
                  },
                  { value: "Arts and Culture", label: "Arts and Culture" },
                  { value: "Human Rights", label: "Human Rights" },
                  {
                    value: "Poverty Alleviation",
                    label: "Poverty Alleviation",
                  },
                  { value: "Youth Empowerment", label: "Youth Empowerment" },
                  { value: "Senior Care", label: "Senior Care" },
                  {
                    value: "Mental Health Support",
                    label: "Mental Health Support",
                  },
                ]}
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Your password here"
                name="password"
                label="Password"
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="Your email here"
                name="email"
                label="Email"
              />
            </div>

            <Button variant="primary" className="w-full">
              Register
            </Button>
          </div>
        </div>

        <div className="relative hidden md:block bg-[#181934] rounded-tl-[30px] rounded-bl-[30px] flex flex-col justify-between">
          <div className="pr-10">
            <div className="flex items-center justify-end">
              <Image
                src="/logo.svg"
                alt="VolunChain Logo"
                width={180}
                height={180}
              />
            </div>
          </div>

          <div className="flex justify-center items-end w-full px-[10px] mt-[40px]">
            <Image
              src="/images/register-found.png"
              alt="VolunChain Illustration"
              width={1000}
              height={200}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
