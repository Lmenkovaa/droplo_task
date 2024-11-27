"use client";

import { useState } from "react";
import Button from "@/components/buttons/Button";

const MenuForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [label, setLabel] = useState(initialData.label || "");
  const [url, setUrl] = useState(initialData.url || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label && url) {
      onSubmit({
        id: initialData.id || Date.now(),
        label,
        url,
      });
      setLabel("");
      setUrl("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
          value={label}
          placeholder="np. Promocje"
          className="block w-full p-2 border border-gray-300 placeholder:text-gray-400 text-black shadow-xs rounded-md"
          onChange={(e) => setLabel(e.target.value)}
        />
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
          value={url}
          placeholder="Wklej lub wyszukaj"
          className="block w-full p-2 border border-gray-300 placeholder:text-gray-400 text-black shadow-xs rounded-md"
          onChange={(e) => setUrl(e.target.value)}
        />
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
