"use client";

import { useState } from "react";
import Item from "./Item";
import MenuForm from "./MenuForm";

const MenuList = ({ menuItems, onAdd, onEdit, onDelete }) => {
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

  const renderItems = (items, level = 0) =>
    items.map((item, index) => (
      <Item
        key={item.id}
        id={item.id}
        label={item.label}
        url={item.url}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={onDelete}
        level={level}
        className={index === 0 ? "first:rounded-t-lg" : ""}
      >
        {item.children?.length > 0 && renderItems(item.children, level + 1)}
      </Item>
    ));

  if (menuItems.length === 0) {
    return null;
  }

  return (
    <div className="border bg-primary-100 rounded-lg w-full">
      {renderItems(menuItems)}
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

export default MenuList;
