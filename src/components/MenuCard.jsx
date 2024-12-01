"use client";

import { useState } from "react";
import MenuForm from "./MenuForm";
import SortableTree from "./SortableTree";

const MenuCard = ({ menuItems, onAdd, onEdit, onDelete, onReorder }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAdd = (parentId, newItem) => {
    onAdd(parentId, newItem);
  };

  const handleEdit = (id, updatedItem) => {
    onEdit(id, updatedItem);
  };

  const handleAddNewItem = (newItem) => {
    onAdd(null, newItem);
    setIsFormOpen(false);
  };

  return (
    <div className="border bg-primary-100 rounded-lg w-full">
      <div className="bg-secondary-100 rounded-lg overflow-hidden">
        <SortableTree
          menuItems={menuItems}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          handleDelete={onDelete}
          handleReorder={onReorder}
        />
      </div>
      <div className="flex justify-start mx-6 my-5">
        {isFormOpen ? (
          <MenuForm
            onSubmit={handleAddNewItem}
            onCancel={() => setIsFormOpen(false)}
          />
        ) : (
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-3.5 py-2.5 bg-white text-secondary-700 text-sm font-semibold border border-gray-300 rounded-md"
          >
            Dodaj pozycję menu
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
