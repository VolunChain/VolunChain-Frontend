"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ChangeEvent, useState } from "react";

export default function Apply() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    cause: "",
    requirements: "",
    terms: false,
    privacy: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 bg-[#151127] rounded-[30px] overflow-hidden max-w-4xl w-full shadow-lg">
        <div className="p-6 sm:p-8 md:p-14 bg-[#0F112A]">
          <p className="text-white text-[2rem]">Company Name</p>
          <h1 className="text-[#53ACEC] text-xl sm:text-2xl font-bold mt-2.5">
            Paws & Hope Rescue Team
          </h1>

          <div className="space-y-7 mt-9 bg-[#1A1C37] p-6 sm:p-8 md:p-12 rounded-[30px]">
            <Input
              type="text"
              placeholder="Your first name here"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              label="First Name"
            />

            <Input
              type="text"
              placeholder="Your last name here"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              label="Last Name"
            />

            <Input
              type="email"
              placeholder="Your email here"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
            />

            <Input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              label="Date of Birth"
            />
          </div>

          <div className="space-y-7 mt-9 bg-[#1A1C37] p-6 sm:p-8 md:p-12 rounded-[30px]">
            <Input
              type="text"
              placeholder="Type Something"
              name="cause"
              value={formData.cause}
              onChange={handleChange}
              label="Why do you want to volunteer for this cause?"
            />

            <Input
              type="text"
              placeholder="Add Requirements/Accommodations here"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              label="Do you have any special requirements or accommodations?"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <Input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                label="I agree to the terms and conditions"
                className="text-[#53ACEC]"
              />

              <Input
                type="checkbox"
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                label="I agree to the privacy policy"
                className="text-[#53ACEC]"
              />
            </div>

            <div className="flex items-center justify-center">
              <Button variant="tertiary" className="text-[#1A1C37] px-7 py-3">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
