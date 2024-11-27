"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "@/components/buttons/Button";

const MenuForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const validationSchema = Yup.object().shape({
    label: Yup.string()
      .required("Pole Nazwa jest wymagane")
      .min(2, "Minimalna długość to 2 znaki"),
    url: Yup.string()
      .required("Pole Link jest wymagane")
      .url("Nieprawidłowy format linku"),
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
      className="flex flex-col gap-4 p-4 border rounded-md bg-white border-gray-300 min-w-full"
    >
      <div>
        <label
          htmlFor="label"
          className="block text-sm font-medium text-gray-700 mb-1"
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

      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Link
        </label>
        <input
          id="url"
          type="text"
          placeholder="Wklej lub wyszukaj"
          {...register("url")}
          className={`block w-full p-2 border ${
            errors.url ? "border-red-500" : "border-gray-300"
          } placeholder:text-gray-400 text-black shadow-xs rounded-md`}
        />
        {errors.url && (
          <p className="text-sm text-red-500 mt-1">{errors.url.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button onClick={onCancel} variant="default">
          Anuluj
        </Button>
        <Button type="submit" variant="secondary">
          {initialData.id ? "Zachowaj" : "Dodaj"}
        </Button>
      </div>
    </form>
  );
};

export default MenuForm;
