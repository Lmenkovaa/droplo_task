"use client";

import Item from "./Item";

const MenuList = ({ menuItems, onAdd, onEdit, onDelete }) => {
  const renderItems = (items, level = 0) =>
    items.map((item) => (
      <Item
        key={item.id}
        id={item.id}
        label={item.label}
        url={item.url}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        level={level}
      >
        {item.children?.length > 0 && renderItems(item.children, level + 1)}
      </Item>
    ));

  return (
    <div className="border bg-primary-100 rounded-lg w-full">
      {menuItems.length > 0 ? (
        renderItems(menuItems)
      ) : (
        <p className="text-center text-gray-500">Brak pozycji w menu</p>
      )}
      <div className="flex justify-start mx-6 my-5">
        <button
          onClick={onAdd}
          className="px-3.5 py-2.5 bg-white text-secondary-700 text-sm font-semibold border border-gray-300 rounded-md"
        >
          Dodaj pozycję menu
        </button>
      </div>
    </div>
  );
};

export default MenuList;
