import { useState, useEffect } from "react";
import { defaultMenuData } from "@/data/menuData";

const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState(() => {
    const storedMenuData = localStorage.getItem("menuItems");
    try {
      return storedMenuData ? JSON.parse(storedMenuData) : defaultMenuData;
    } catch (e) {
      console.error("Error parsing menuItems from localStorage:", e);
      return defaultMenuData;
    }
  });

  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]);

  return [menuItems, setMenuItems];
};

export default useMenuItems;
