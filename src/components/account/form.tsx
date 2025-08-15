"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorAlert } from "../ui/alert";
import { updateUser } from "@/services/user.service";
import { baseUserSchema, UpdateUserSchemaType, UserSchemaType } from "@/schemas/user.schema";

export const UserForm = ({ initialData }: { initialData: UserSchemaType }) => {

  const [isActive, setIsActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ resolver: zodResolver(baseUserSchema) })

  const handleToggleEdit = () => {
    setIsActive(!isActive);
    setImagePreview(null);
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setValue("image", file);
    }
  }

  const onSubmit = async (data: UpdateUserSchemaType) => {  
    try {
      const res = await updateUser(data);
      console.log(res);
      setIsActive(!isActive);
    } catch (err) {
      console.error(err);
    }
  }

  console.log(errors)

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form
      className={`
        grid gap-2
        ${!isActive ? "disabled-input" : "enabled-input"}
      `}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="flex justify-center">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          disabled={!isActive}
        />
        <div className="h-40 w-40 border-2 border-gray-200 rounded-full overflow-hidden cursor-pointer flex justify-center items-center">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Preview"
              width={160}
              height={160}
              className="object-cover h-full w-full"
            />
          ) : initialData.image ? (
            <Image
              src={initialData.image}
              alt="Preview"
              width={160}
              height={160}
              className="object-cover h-full w-full"
            />
          ) : (
            <span className="text-gray-400 text-sm">Choose image</span>
          )}
        </div>
      </label>

      <label className="container-input">
        <label>Username {errors.name && <ErrorAlert message={errors.name.message} />}</label>
        <input type="text" {...register("name")} disabled={!isActive} />
      </label>

      <label className="container-input">
        <label>Email {errors.email && <ErrorAlert message={errors.email.message} />}</label>
        <input type="email" {...register("email")} disabled={!isActive} />
      </label>

      <label className="container-input">
        <label>Phone</label>
        <input type="text" {...register("phone")} disabled={!isActive} />
      </label>

      {/* <label className="container-input">
        <label>Address</label>
        <textarea className="resize-none h-40" {...register("")} disabled={!isActive}></textarea>
      </label> */}
      <div className="flex justify-end gap-2">
        {isActive ? (
          <>
            <button className="bg-green-400 text-white font-semibold px-6 py-2 rounded" type="submit">Save</button>
            <button
              onClick={(event: FormEvent) => {
                event.preventDefault();
                handleToggleEdit();
              }}
              className="bg-red-400 text-white font-semibold px-6 py-2 rounded" type="button"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={(event: FormEvent) => {
              event.preventDefault();
              setIsActive(!isActive);
            }}
            className="bg-blue-400 text-white font-semibold px-6 py-2 rounded" type="button"
          >
            Edit
          </button>
        )}
      </div>
    </form>
  );
}