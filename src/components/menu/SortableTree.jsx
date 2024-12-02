"use client";

import React, { useMemo, useState } from "react";
import { DndContext, closestCenter, MeasuringStrategy } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  flattenItems,
  convertToNestedStructure,
  getProjection,
  removeChildrenOf,
} from "@/utils/menuUtils";
import Item from "@/components/menu/Item";

const INDENTATION_WIDTH = 64;

const SortableTree = ({
  menuItems,
  handleAdd,
  handleEdit,
  handleDelete,
  handleReorder,
}) => {
  const [activeId, setActiveId] = useState(null);
  const [temporaryItems, setTemporaryItems] = useState([]);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenItems(menuItems);

    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId] : [],
      temporaryItems,
    );
  }, [activeId, menuItems]);

  const handleDragStart = ({ active: { id: activeId } }) => {
    setActiveId(activeId);
    setTemporaryItems([]);
  };

  const handleDragCancel = () => {
    setActiveId(activeId);
    setTemporaryItems([]);
  };

  const handleDragEnd = (event) => {
    const { active, over, delta } = event;

    if (!over) {
      return;
    }

    const projected = getProjection(
      flattenedItems,
      active.id,
      over.id,
      delta.x,
      INDENTATION_WIDTH,
    );
    const updatedItems = moveItem(
      [...flattenedItems, ...temporaryItems],
      active.id,
      over.id,
      projected.depth,
      projected.parentId,
    );
    const newNestedItems = convertToNestedStructure(updatedItems);

    setTemporaryItems([]);
    setActiveId(null);
    handleReorder(newNestedItems);
  };

  const moveItem = (items, activeId, overId, depth, parentId) => {
    const activeIndex = items.findIndex(({ id }) => id === activeId);
    const overIndex = items.findIndex(({ id }) => id === overId);

    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(activeIndex, 1);

    updatedItems.splice(overIndex, 0, { ...movedItem, depth, parentId });

    return updatedItems;
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      onDragStart={handleDragStart}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
    >
      <SortableContext
        items={flattenedItems.map(({ id }) => id)}
        strategy={verticalListSortingStrategy}
      >
        {flattenedItems.map((item, index) => (
          <Item
            key={item.id}
            id={item.id}
            label={item.label}
            url={item.url}
            depth={item.depth}
            isFirst={index === 0}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            baseMargin={INDENTATION_WIDTH}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default SortableTree;
