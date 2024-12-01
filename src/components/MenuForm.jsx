"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "@/components/buttons/Button";
import Image from "next/image";

const MenuForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const validationSchema = Yup.object().shape({
    label: Yup.string()
      .required("Pole Nazwa jest wymagane")
      .min(2, "Minimalna długość to 2 znaki"),
    url: Yup.string().notRequired().url("Nieprawidłowy format linku"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(validationSchema),
  });

  const onFormSubmit = (data) => {
    onSubmit({ ...data, id: initialData.id || Date.now() });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-row items-start py-5 px-6 gap-4 border rounded-md bg-white border-gray-300 w-full"
    >
      <div className="flex flex-col flex-1">
        <div className="mb-2">
          <label
            htmlFor="label"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Nazwa
          </label>
          <input
            id="label"
            type="text"
            placeholder="np. Promocje"
            {...register("label")}
            className={`block w-full p-2 border ${
              errors.label ? "border-red-500" : "border-gray-300"
            } placeholder:text-gray-400 text-black shadow-xs rounded-md`}
          />
          {errors.label && (
            <p className="text-sm text-red-500 mt-1">{errors.label.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Link
          </label>

          <div className="relative">
            <div className="absolute top-1/2 left-3 transform -translate-y-1/2 flex items-center pointer-events-none">
              <Image
                src="/search-lg.svg"
                alt="Search"
                width={16}
                height={16}
                className="block"
              />
            </div>
            <input
              id="url"
              type="text"
              placeholder="Wklej lub wyszukaj"
              {...register("url")}
              className={`block w-full py-2 pl-10 pr-3 border rounded-md
        ${errors.url ? "border-red-500" : "border-gray-300"}
        placeholder:text-gray-400 text-black shadow-xs`}
            />
          </div>

          {errors.url && (
            <p className="text-sm text-red-500 mt-1">{errors.url.message}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => reset()} variant="default">
            Anuluj
          </Button>
          <Button type="submit" variant="secondary">
            {initialData.id ? "Zachowaj" : "Dodaj"}
          </Button>
        </div>
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="flex justify-center items-center w-10 h-10"
        aria-label="Delete"
      >
        <Image src="/trash-03.svg" alt="Delete" width={17} height={17} />
      </button>
    </form>
  );
};

export default MenuForm;
