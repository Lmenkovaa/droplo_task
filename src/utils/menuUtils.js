import { arrayMove } from "@dnd-kit/sortable";

export const addRecursive = (
  items,
  parentId,
  newItem,
  currentDepth,
  maxDepth,
) => {
  return items.map((item) => {
    if (item.id === parentId) {
      if (currentDepth >= maxDepth) {
        console.warn("Maximum depth reached. Item not added.");
        return item;
      }

      return {
        ...item,
        children: [
          ...(item.children || []),
          { id: Date.now(), ...newItem, children: [] },
        ],
      };
    }

    return {
      ...item,
      children: item.children
        ? addRecursive(
            item.children,
            parentId,
            newItem,
            currentDepth + 1,
            maxDepth,
          )
        : [],
    };
  });
};

export const updateRecursive = (items, itemId, updatedItem) => {
  return items.map((item) => {
    if (item.id === itemId) {
      return { ...item, ...updatedItem };
    }
    if (item.children) {
      return {
        ...item,
        children: updateRecursive(item.children, itemId, updatedItem),
      };
    }
    return item;
  });
};

export const deleteRecursive = (items, itemId) => {
  return items
    .filter((item) => item.id !== itemId)
    .map((item) => ({
      ...item,
      children: item.children ? deleteRecursive(item.children, itemId) : [],
    }));
};

export const addItemToMenuCard = (
  menuList,
  listId,
  parentId,
  newItem,
  maxDepth = 3,
) => {
  return menuList.map((menu) => {
    if (menu.id === listId) {
      return {
        ...menu,
        items: parentId
          ? addRecursive(menu.items, parentId, newItem, 1, maxDepth)
          : [...menu.items, { id: Date.now(), ...newItem, children: [] }],
      };
    }
    return menu;
  });
};

export const flattenItems = (items, parentId = null, depth = 0) => {

    if (!Array.isArray(items)) {
    return [];
  }

  let flatItems = [];

  for (const item of items) {
    flatItems.push({
      id: item.id,
      label: item.label,
      url: item.url,
      parentId,
      depth,
    });

    if (item.children && item.children.length > 0) {
      flatItems = flatItems.concat(
        flattenItems(item.children, item.id, depth + 1),
      );
    }
  }

  return flatItems;
};

export const convertToNestedStructure = (flatItems) => {
  const idToItemMap = new Map();
  const nestedItems = [];

  flatItems.forEach((item) => {
    idToItemMap.set(item.id, { ...item, children: [] });
  });

  flatItems.forEach((item) => {
    if (item.parentId) {
      const parentItem = idToItemMap.get(item.parentId);
      if (parentItem) {
        parentItem.children.push(idToItemMap.get(item.id));
      }
    } else {
      nestedItems.push(idToItemMap.get(item.id));
    }
  });

  return nestedItems;
};

function getDragDepth(offset, indentationWidth) {
  return Math.round(offset / indentationWidth);
}

function getMaxDepth({ previousItem }) {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
}

function getMinDepth({ nextItem }) {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
}

export function getProjection(
  items,
  activeId,
  overId,
  dragOffset,
  indentationWidth,
) {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem,
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  return { depth, maxDepth, minDepth, parentId: getParentId() };

  function getParentId() {
    if (depth === 0 || !previousItem) {
      return null;
    }

    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }

    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId;

    return newParent ?? null;
  }
}

export function removeChildrenOf(items, ids, temporaryItems = []) {
  const excludeParentIds = new Set(ids);

  const filterRecursive = (items) => {
    return items.reduce((acc, item) => {
      if (excludeParentIds.has(item.parentId)) {
        if (!temporaryItems.some((temp) => temp.id === item.id)) {
          temporaryItems.push(item);
        }

        excludeParentIds.add(item.id);
        if (item.children && item.children.length > 0) {
          filterRecursive(item.children);
        }

        return acc;
      }

      const updatedChildren = item.children ? filterRecursive(item.children) : [];
      return [...acc, { ...item, children: updatedChildren }];
    }, []);
  };

  return filterRecursive(items);
}



