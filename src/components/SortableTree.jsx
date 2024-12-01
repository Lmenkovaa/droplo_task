"use client";

import React, { useMemo } from "react";
import { DndContext, closestCenter, MeasuringStrategy } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  flattenItems,
  convertToNestedStructure,
  getProjection,
} from "@/utils/menuUtils";
import Item from "./Item";

const INDENTATION_WIDTH = 64;

const SortableTree = ({
  menuItems,
  handleAdd,
  handleEdit,
  handleDelete,
  handleReorder,
}) => {
  const flattenedItems = useMemo(() => flattenItems(menuItems), [menuItems]);

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
      flattenedItems,
      active.id,
      over.id,
      projected.depth,
      projected.parentId,
    );
    const newNestedItems = convertToNestedStructure(updatedItems);

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
