"use client";

import { useState } from "react";
import TextArea from "@/components/ui/TextArea";
import Input from "@/components/ui/Input";
import ProfilePicture from "./profilePicture";
import Button from "@/components/ui/Button";
import DateField from "./dateField";
import EditButton from "./editButton";

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

  const [editingField, setEditingField] = useState<string | null>(null);

  const handleChange = (name: string, value: string | Date | null) => {
    if (value === null) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditing = (field: string) => {
    setEditingField(editingField === field ? null : field);
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

          <div className="relative flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[#53ACEC]">First Name</label>
              <EditButton isEditing={editingField === "firstName"} onClick={() => toggleEditing("firstName")} />
            </div>
            <Input
              label=""
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className=" [&>label]:text-[#53ACEC]"
              disabled={editingField !== "firstName"}
            />
          </div>

          <div className="relative flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[#53ACEC]">Email</label>
              <div className="flex items-center space-x-2 text-[#60A5FA]">
                <div className="w-5 h-5 bg-[#60A5FA] flex items-center justify-center rounded-full text-black font-bold">
                  ✔
                </div>
                <span className="text-sm">Verified</span>
              </div>
            </div>
            <Input
              label=""
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className=" [&>label]:text-[#53ACEC]"
              disabled
            />
          </div>

          <div className="relative flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[#53ACEC]">Last Name</label>
              <EditButton isEditing={editingField === "lastName"} onClick={() => toggleEditing("lastName")} />
            </div>
            <Input
              label=""
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className=" [&>label]:text-[#53ACEC]"
              disabled={editingField !== "lastName"}
            />
          </div>

          <div className="relative flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[#53ACEC]">Phone</label>
              <EditButton isEditing={editingField === "phone"} onClick={() => toggleEditing("phone")} />
            </div>
            <Input
              label=""
              name="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className=" [&>label]:text-[#53ACEC]"
              disabled={editingField !== "phone"}
            />
          </div>

          <div className="relative flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[#53ACEC]">Country</label>
              <EditButton isEditing={editingField === "country"} onClick={() => toggleEditing("country")} />
            </div>
            <Input
              label=""
              name="country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className=" [&>label]:text-[#53ACEC]"
              disabled={editingField !== "country"}
            />
          </div>

          <div className="relative flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[#53ACEC]">Date of Birth</label>
              <EditButton isEditing={editingField === "dateOfBirth"} onClick={() => toggleEditing("dateOfBirth")} />
            </div>
            <DateField
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={(date) => handleChange("dateOfBirth", date ?? new Date())}
              disabled={editingField !== "dateOfBirth"}
            />
          </div>

          <div className="relative flex flex-col gap-2 w-full col-span-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[#53ACEC]">Biography</label>
              <EditButton isEditing={editingField === "biography"} onClick={() => toggleEditing("biography")} />
            </div>
            <TextArea
              label=""
              name="biography"
              value={formData.biography}
              onChange={(e) => handleChange("biography", e.target.value)}
              className="h-40 w-full [&>label]:text-[#53ACEC]"
              disabled={editingField !== "biography"}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={() => setEditingField(null)} variant="primary">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
