import { useState, useEffect } from "react";
import { defaultMenuData } from "@/data/menuData";

const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState(defaultMenuData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMenuData = localStorage.getItem("menuItems");
      try {
        setMenuItems(
          storedMenuData ? JSON.parse(storedMenuData) : defaultMenuData,
        );
      } catch (e) {
        console.error("Error parsing menuItems from localStorage:", e);
        setMenuItems(defaultMenuData);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("menuItems", JSON.stringify(menuItems));
    }
  }, [menuItems]);

  return [menuItems, setMenuItems];
};

export default useMenuItems;
