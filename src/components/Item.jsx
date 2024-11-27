"use client";

import { useState } from "react";
import Image from "next/image";
import MenuForm from "./MenuForm";

const Item = ({ id, label, url, onAdd, onEdit, onDelete, level, children }) => {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const handleFormSubmit = (newItem) => {
    onAdd(id, newItem);
    setIsAddFormVisible(false);
  };

  const handleEdit = (updatedItem) => {
    onEdit(id, updatedItem);
    setIsEditFormVisible(false);
  };

  return (
    <div className="flex flex-shrink flex-col w-full">
      <div
        className={`flex items-center justify-between bg-white border-b border-secondary-200 py-4 px-5 ${
          level > 0 ? "rounded-bl-lg" : ""
        } rounded-t-lg`}
      >
        <div className="flex items-center gap-4">
          <Image src="/move.svg" alt="Move" width={24} height={24} />
          <div>
            <h2 className="text-sm font-semibold text-primary-900">{label}</h2>
            <p className="text-sm text-secondary-400">{url}</p>
          </div>
        </div>

        <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden min-h-10">
          <button
            className="text-sm font-semibold text-secondary-700 py-2.5 px-3.5 border-r border-gray-300"
            onClick={() => onDelete(id)}
          >
            Usuń
          </button>
          <button
            className="text-sm font-semibold text-secondary-700 py-2.5 px-3.5"
            onClick={() => setIsEditFormVisible(!isEditFormVisible)}
          >
            Edytuj
          </button>
          <button
            className="text-sm font-semibold text-secondary-700 py-2.5 px-3.5 border-l border-gray-300"
            onClick={() => setIsAddFormVisible(!isAddFormVisible)}
          >
            Dodaj pozycję menu
          </button>
        </div>
      </div>

      {isEditFormVisible && (
        <div className="ml-9 mr-5 my-4">
          <MenuForm
            initialData={{ id, label, url }}
            onSubmit={handleEdit}
            onCancel={() => setIsEditFormVisible(false)}
          />
        </div>
      )}

      {isAddFormVisible && (
        <div className="ml-9 mr-5 my-4">
          <MenuForm
            onSubmit={handleFormSubmit}
            onCancel={() => setIsAddFormVisible(false)}
          />
        </div>
      )}

      <div className={`ml-${level * 8} flex flex-wrap ml-8`}>{children}</div>
    </div>
  );
};

export default Item;
