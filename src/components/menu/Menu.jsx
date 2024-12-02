"use client";

import MenuForm from "@/components/menu/MenuForm";
import EmptyMenuComponent from "@/components/menu/EmptyMenuComponent";
import MenuCard from "@/components/menu/MenuCard";
import { useState } from "react";
import {
  addItemToMenuCard,
  deleteRecursive,
  updateRecursive,
} from "@/utils/menuUtils";
import useMenuItems from "@/hooks/useMenuItems";
import { v4 as uuidv4 } from "uuid";

export default function Menu() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [menuItems, setMenuItems] = useMenuItems();

  const handleAddMenuItem = (listId, parentId, newItem) => {
    setMenuItems((prevLists) =>
      addItemToMenuCard(prevLists, listId, parentId, newItem),
    );
  };

  const handleAddMenuCard = (newItem) => {
    setMenuItems((prevLists) => [
      ...prevLists,
      {
        id: uuidv4(),
        items: [
          {
            id: uuidv4(),
            label: newItem.label,
            url: newItem.url,
            children: [],
          },
        ],
      },
    ]);
    setIsFormOpen(false);
  };

  const handleDeleteMenuItem = (listId, itemId) => {
    setMenuItems((prevLists) =>
      prevLists.map((menuList) => {
        if (menuList.id === listId) {
          return {
            ...menuList,
            items: deleteRecursive(menuList.items, itemId),
          };
        }
        return menuList;
      }),
    );
  };

  const handleEditMenuItem = (listId, itemId, updatedItem) => {
    setMenuItems((prevLists) =>
      prevLists.map((menuList) => {
        if (menuList.id === listId) {
          return {
            ...menuList,
            items: updateRecursive(menuList.items, itemId, updatedItem),
          };
        }
        return menuList;
      }),
    );
  };

  const handleReorderItems = (listId, updatedItems) => {
    setMenuItems((prevLists) =>
      prevLists.map((menuList) =>
        menuList.id === listId
          ? { ...menuList, items: updatedItems }
          : menuList,
      ),
    );
  };

  return (
    <div className="min-h-screen w-full bg-primary-100 flex flex-col items-center">
      <main className="flex flex-col gap-8 items-center w-[90vw] max-w-[90rem] py-16">
        <EmptyMenuComponent onAdd={() => setIsFormOpen(true)} />
        {isFormOpen && (
          <MenuForm
            onSubmit={(newItem) => handleAddMenuCard(newItem)}
            onCancel={() => setIsFormOpen(false)}
          />
        )}

        {menuItems.map((menuList) => (
          <MenuCard
            key={menuList.id}
            listId={menuList.id}
            menuItems={menuList.items}
            onAdd={(parentId, newItem) =>
              handleAddMenuItem(menuList.id, parentId, newItem)
            }
            onDelete={(itemId) => handleDeleteMenuItem(menuList.id, itemId)}
            onEdit={(id, updatedItem) =>
              handleEditMenuItem(menuList.id, id, updatedItem)
            }
            onReorder={(updatedItems) =>
              handleReorderItems(menuList.id, updatedItems)
            }
          />
        ))}
      </main>
    </div>
  );
}
