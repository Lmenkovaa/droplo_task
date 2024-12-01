"use client";

import { useState } from "react";
import Image from "next/image";
import MenuForm from "./MenuForm";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Item = ({
  id,
  label,
  url,
  onAdd,
  onEdit,
  onDelete,
  maxDepth = 3,
  isFirst = false,
  depth,
  baseMargin,
}) => {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [error, setError] = useState(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  console.log("Sortable ID:", id);
  console.log("transform:", transform);

  const handleFormSubmit = (newItem) => {
    onAdd(id, newItem);
    setIsAddFormVisible(false);
    setError("");
  };

  const handleEdit = (updatedItem) => {
    onEdit(id, updatedItem);
    setIsEditFormVisible(false);
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    paddingLeft: `${depth * baseMargin}px`,
  };

  return (
    <div
      style={style}
      key={id}
      ref={setNodeRef}
      className={`flex flex-shrink flex-col w-full`}
    >
      <div
        className={`flex items-center justify-between border-y -mt-px bg-white border-secondary-200 py-4 px-6 
          ${depth > 0 ? "border-l rounded-bl-lg" : ""} 
          ${isFirst ? "rounded-tl-md" : ""} `}
      >
        <div className="flex items-center flex-1 min-w-0">
          <div
            className="flex justify-center items-center w-10 h-10"
            {...attributes}
            {...listeners}
          >
            <Image src="/move.svg" alt="Move" width={17} height={17} />
          </div>
          <div className="mx-3 min-w-0">
            <h2 className="text-sm font-semibold text-primary-900">{label}</h2>
            <p className="text-sm truncate text-secondary-400 min-w-0 text-ellipsis">
              {url}
            </p>
          </div>
        </div>

        <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden min-h-10 flex-shrink-0 w-[305px]">
          <button
            className="text-sm font-semibold text-secondary-700 py-2.5 px-3.5 border-r border-gray-300"
            onClick={() => {
              onDelete(id);
            }}
          >
            Usuń
          </button>
          <button
            className="text-sm font-semibold text-secondary-700 py-2.5 px-3.5"
            onClick={() => {
              setIsEditFormVisible((prevIsEditFormVisible) => {
                setError(null);
                if (!prevIsEditFormVisible) {
                  setIsAddFormVisible(false);
                }
                return !prevIsEditFormVisible;
              });
            }}
          >
            Edytuj
          </button>
          <button
            className="text-sm font-semibold text-secondary-700 py-2.5 px-3.5 border-l border-gray-300"
            onClick={() => {
              if (depth + 1 >= maxDepth) {
                setError("Max depth reached!");
                return;
              }
              setIsAddFormVisible((prevIsAddFormVisible) => {
                if (!prevIsAddFormVisible) {
                  setIsEditFormVisible(false);
                }
                return !prevIsAddFormVisible;
              });
            }}
          >
            Dodaj pozycję menu
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2 px-6">{error}</p>}

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
    </div>
  );
};

export default Item;
