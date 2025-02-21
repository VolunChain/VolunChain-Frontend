"use client";

import { useState } from "react";
import Field from "./field";
import TextArea from "./textArea";
import PhoneField from "./phoneField";
import DateField from "./dateField";
import ProfilePicture from "./profilePicture";
import Button from "@/components/ui/Button";

const AccountInformation = () => {
  const [formData, setFormData] = useState({
    profilePicture: "/profile.png",
    firstName: "Luna",
    lastName: "López",
    email: "lulopez@gmail.com",
    phone: "+1 000-0000-0000",
    dateOfBirth: new Date("2006-05-30"),
    country: "Costa Rica",
    biography:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  });

  const handleChange = (name: string, value: string | Date | null) => {
    if (value === null) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    console.log("Saved data:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 mt-10 mb-16">
      <h2 className="text-3xl font-semibold text-[#60A5FA] mb-6">
        Account Information
      </h2>

      <div className="p-10 bg-[#0F112A] rounded-2xl text-white shadow-lg space-y-10">
        <div className="flex items-center space-x-6">
          <ProfilePicture src={formData.profilePicture} />
        </div>

        <div className="grid grid-cols-2 gap-y-8 gap-x-12">
          <Field
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <Field
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          <Field
            label="Email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <PhoneField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={(value) => handleChange("phone", value)}
          />
          <DateField
            label="Date of Birth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={(date) => handleChange("dateOfBirth", date ?? new Date())}
          />
          <Field
            label="Country"
            name="country"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>

        <div className="mt-10">
          <TextArea
            label="Biography"
            name="biography"
            value={formData.biography}
            onChange={(e) => handleChange("biography", e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-6">
        <Button onClick={handleSaveChanges} variant="primary">Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
