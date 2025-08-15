"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProducts, updateProduct } from "@/services/product.service";
import { ErrorAlert } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/category.hook";
import { useUnits } from "@/hooks/unit.hook";
import {
  createProductSchema,
  CreateProductSchemaType,
  productSchemaValue,
  updateProductSchema,
  UpdateProductSchemaType
} from "@/schemas/product.schema";

export const ProductForm = ({
  initialData,
}: {
  initialData?: UpdateProductSchemaType,
}) => {

  const isUpdate = Boolean(initialData?.id);
  const schema = isUpdate ? updateProductSchema : createProductSchema;

  const router = useRouter();
  const { categories } = useCategories();
  const { units } = useUnits();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { register, handleSubmit, setValue, reset, formState: { errors } } =
    useForm<UpdateProductSchemaType | CreateProductSchemaType>({ resolver: zodResolver(schema) });

  // Change image file
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Set preview image
      setValue("image", file); // Set image value
    }
  }

  // Submit items to Insert or Update
  const onSubmit = async (data: UpdateProductSchemaType) => {
    try {
      if (isUpdate && initialData?.id) {
        // Update product
        await updateProduct({ id: initialData.id, ...data });
      } else {
        // Insert product
        await insertProducts(data as CreateProductSchemaType);
      }

      router.push("/admin/inventory");
      reset(productSchemaValue);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`
        grid gap-4 p-4 bg-white h-fit form-field
        ${!initialData ? "disabled-input" : "enabled-input"}
      `}
    >
      <div className="flex gap-4">
        <div className="relative">
          <div className="h-40 w-40 border-2 border-gray-200 overflow-hidden cursor-pointer flex justify-center items-center">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                width={160}
                height={160}
                className="object-cover h-full w-full"
              />
            ) : initialData?.image ? (
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
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="absolute w-40 h-40 opacity-0 top-0 cursor-pointer"
            disabled={!isUpdate}
          />
        </div>

        <div className="w-full grid gap-4">
          <div className="label">
            <label>Product ID {errors.sku && <ErrorAlert message={errors.sku.message} />}</label>
            <input type="text" {...register("sku")} disabled={!initialData} />
          </div>

          <div className="label">
            <label>Product Name {errors.name && <ErrorAlert message={errors.name.message} />}</label>
            <input type="text" {...register("name")} disabled={!initialData} />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="label">
          <label>Product Price {errors.price && <ErrorAlert message={errors.price.message} />}</label>
          <input type="text" {...register("price")} disabled={!initialData} />
        </div>

        <div className="label">
          <label>Product Unit {errors.unit?.id && <ErrorAlert message={errors.unit.id.message} />}</label>
          <select {...register("unit.id")} disabled={!units}>
            <option value={0}>Select unit</option>
            {units &&
              units.map((unit) => (
                <option key={unit.id} value={unit.id}>{unit.name}</option>
              ))
            }
          </select>
        </div>

        <div className="label">
          <label>Product Stock {errors.stock && <ErrorAlert message={errors.stock.message} />}</label>
          <input type="text" {...register("stock")} disabled={!isUpdate} />
        </div>

        <div className="label">
          <label>Product Min Stock {errors.stockMin && <ErrorAlert message={errors.stockMin.message} />}</label>
          <input type="text" {...register("stockMin")} disabled={!isUpdate} />
        </div>

        <div className="label col-span-2">
          <label>Product Category {errors.category?.id && <ErrorAlert message={errors.category.id.message} />}</label>
          <select {...register("category.id")} disabled={!categories}>
            <option value={0}>Select category</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            }
          </select>
        </div>

        <div className="label col-span-2">
          <label>Product Description</label>
          <textarea className="resize-none h-20" {...register("description")} disabled={!isUpdate}></textarea>
        </div>
      </div>

      <button type="submit" className="mt-2 btn-blue-500 hover:btn-blue-800">Save</button>
    </form>
  );
}