import {
  addRecursive,
  updateRecursive,
  deleteRecursive,
  addItemToMenuCard,
  flattenItems,
  convertToNestedStructure,
  getDragDepth,
  getMaxDepth,
  getMinDepth,
  removeChildrenOf,
} from "../menuUtils";

const menuItemsExample = [
  {
    id: 1,
    items: [
      {
        id: 234,
        label: "Promocje1",
        url: "https://rc32141.redcart.pl/promocje",
        children: [],
      },
      {
        id: 345,
        label: "Diamenty forbes",
        url: "https://www.forbes.pl/diamenty",
        children: [
          {
            id: 456,
            label: "Promocje",
            url: "https://rc32141.redcart.pl/promocje",
            children: [],
          },
          {
            id: 457,
            label: "Promocje7",
            url: "https://rc32141.redcart.pl/promocje",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    items: [
      {
        id: 11,
        label: "Diamenty forbes2",
        url: "https://www.forbes.pl/diamenty",
        children: [],
      },
    ],
  },
];

const nestedMenuItems = [
  {
    id: 1,
    label: "Root 1",
    url: "https://example.com",
    children: [
      {
        id: 2,
        label: "Child 1",
        url: "https://example.com/child1",
        children: [
          {
            id: 3,
            label: "Sub-child 1",
            url: "https://example.com/subchild1",
            children: [],
          },
        ],
      },
      {
        id: 4,
        label: "Child 2",
        url: "https://example.com/child2",
        children: [],
      },
    ],
  },
  {
    id: 5,
    label: "Root 2",
    url: "https://example.com/root2",
    children: [],
  },
];

const flatMenuItems = [
  {
    id: 1,
    label: "Root 1",
    url: "https://example.com",
    parentId: null,
    depth: 0,
  },
  {
    id: 2,
    label: "Child 1",
    url: "https://example.com/child1",
    parentId: 1,
    depth: 1,
  },
  {
    id: 3,
    label: "Sub-child 1",
    url: "https://example.com/subchild1",
    parentId: 2,
    depth: 2,
  },
  {
    id: 4,
    label: "Child 2",
    url: "https://example.com/child2",
    parentId: 1,
    depth: 1,
  },
  {
    id: 5,
    label: "Root 2",
    url: "https://example.com/root2",
    parentId: null,
    depth: 0,
  },
];

const sampleItems = [
  {
    id: 1,
    label: "Root 1",
    parentId: null,
    children: [
      {
        id: 2,
        label: "Child 1",
        parentId: 1,
        children: [{ id: 4, label: "Sub-child 1", parentId: 2, children: [] }],
      },
      { id: 3, label: "Child 2", parentId: 1, children: [] },
    ],
  },
  {
    id: 5,
    label: "Root 2",
    parentId: null,
    children: [],
  },
];

const initializeTemporaryItems = () => [];

describe("Menu Utils", () => {
  describe("addRecursive", () => {
    it("should add a new child to the specified parent", () => {
      const result = addRecursive(
        menuItemsExample[0].items,
        345,
        { label: "New Child" },
        2,
        3,
      );
      const parent = result.find((item) => item.id === 345);
      expect(parent).toBeDefined();
      expect(parent.children).toHaveLength(3);
      expect(parent.children[2].label).toBe("New Child");
    });

    it("should return the original array if no parent is found", () => {
      const result = addRecursive(
        menuItemsExample[0].items,
        1000,
        { label: "New Child" },
        1,
        3,
      );
      expect(result).toEqual(menuItemsExample[0].items);
    });
  });

  describe("updateRecursive", () => {
    it("should update an item at the root level", () => {
      const result = updateRecursive(menuItemsExample[0].items, 234, {
        label: "Updated Promocje1",
      });
      const updatedItem = result.find((item) => item.id === 234);

      expect(updatedItem).toBeDefined();
      expect(updatedItem.label).toBe("Updated Promocje1");
    });

    it("should update a nested item", () => {
      const result = updateRecursive(menuItemsExample[0].items, 456, {
        label: "Updated Promocje",
      });
      const parent = result.find((item) => item.id === 345);
      const updatedItem = parent?.children?.find((item) => item.id === 456);

      expect(updatedItem).toBeDefined();
      expect(updatedItem.label).toBe("Updated Promocje");
    });

    it("should not modify the structure if the id is not found", () => {
      const result = updateRecursive(menuItemsExample, 999, {
        label: "Non-existent",
      });

      expect(result).toEqual(menuItemsExample);
    });

    it("should preserve the structure of unrelated branches", () => {
      const result = updateRecursive(menuItemsExample[0].items, 456, {
        label: "Updated Promocje",
      });
      const unrelatedItem = result.find((item) => item.id === 234);

      expect(unrelatedItem).toBeDefined();
      expect(unrelatedItem.label).toBe("Promocje1");
    });
  });

  describe("deleteRecursive", () => {
    it("should delete an item at the root level", () => {
      const result = deleteRecursive(menuItemsExample[0].items, 234);
      const deletedItem = result.find((item) => item.id === 234);

      expect(deletedItem).toBeUndefined();
      expect(result).toHaveLength(1);
    });

    it("should delete a nested item", () => {
      const result = deleteRecursive(menuItemsExample[0].items, 456);
      const parent = result.find((item) => item.id === 345);
      const deletedItem = parent?.children?.find((item) => item.id === 456);

      expect(deletedItem).toBeUndefined();
      expect(parent.children).toHaveLength(1);
    });

    it("should not delete item if the id is not found", () => {
      const result = deleteRecursive(menuItemsExample[0].items, 999);

      expect(result).toEqual(menuItemsExample[0].items);
    });

    it("should preserve unrelated branches", () => {
      const result = deleteRecursive(menuItemsExample[0].items, 456);
      const unrelatedBranch = result.find((item) => item.id === 234);

      expect(unrelatedBranch).toBeDefined();
      expect(unrelatedBranch.label).toBe("Promocje1");
      expect(unrelatedBranch.children).toHaveLength(0);
    });

    it("should delete an item with nested children", () => {
      const nestedMenu = [
        {
          id: 1,
          label: "Parent",
          children: [
            {
              id: 2,
              label: "Child 1",
              children: [{ id: 3, label: "Grandchild", children: [] }],
            },
          ],
        },
      ];

      const result = deleteRecursive(nestedMenu, 2);
      const parent = result.find((item) => item.id === 1);

      expect(parent).toBeDefined();
      expect(parent.children).toHaveLength(0);
    });
  });

  describe("addItemToMenuCard", () => {
    const menuListExample = [
      {
        id: 1,
        items: [
          {
            id: 234,
            label: "Promocje1",
            url: "https://rc32141.redcart.pl/promocje",
            children: [],
          },
          {
            id: 345,
            label: "Diamenty forbes",
            url: "https://www.forbes.pl/diamenty",
            children: [
              {
                id: 456,
                label: "Promocje",
                url: "https://rc32141.redcart.pl/promocje",
                children: [],
              },
              {
                id: 457,
                label: "Promocje7",
                url: "https://rc32141.redcart.pl/promocje",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        items: [
          {
            id: 11,
            label: "Diamenty forbes2",
            url: "https://www.forbes.pl/diamenty",
            children: [],
          },
        ],
      },
    ];

    it("should add an item to the root level of a specific menu", () => {
      const newItem = { label: "New Item", url: "https://example.com" };
      const result = addItemToMenuCard(menuListExample, 1, null, newItem);

      const updatedMenu = result.find((menu) => menu.id === 1);
      expect(updatedMenu).toBeDefined();
      expect(updatedMenu.items).toHaveLength(3);
      expect(updatedMenu.items[2].label).toBe("New Item");
    });

    it("should add a child item within maxDepth", () => {
      const newItem = { label: "New Child Item", url: "https://example.com" };
      const result = addItemToMenuCard(menuListExample, 1, 345, newItem);

      const parentItem = result[0].items.find((item) => item.id === 345);
      expect(parentItem).toBeDefined();
      expect(parentItem.children).toHaveLength(3);
      expect(parentItem.children[2].label).toBe("New Child Item");
    });

    it("should not modify the structure if listId is not found", () => {
      const newItem = {
        label: "Non-existent Menu Item",
        url: "https://example.com",
      };
      const result = addItemToMenuCard(menuListExample, 999, null, newItem);

      expect(result).toEqual(menuListExample);
    });

    it("should preserve unrelated branches", () => {
      const newItem = {
        label: "Unrelated Branch Item",
        url: "https://example.com",
      };
      const result = addItemToMenuCard(menuListExample, 1, null, newItem);

      const unrelatedMenu = result.find((menu) => menu.id === 2);
      expect(unrelatedMenu).toBeDefined();
      expect(unrelatedMenu.items).toHaveLength(1);
      expect(unrelatedMenu.items[0].label).toBe("Diamenty forbes2");
    });
  });

  describe("flattenItems", () => {
    it("should flatten a nested structure into a flat array", () => {
      const result = flattenItems(nestedMenuItems);

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({
        id: 1,
        label: "Root 1",
        url: "https://example.com",
        parentId: null,
        depth: 0,
      });
      expect(result[1]).toEqual({
        id: 2,
        label: "Child 1",
        url: "https://example.com/child1",
        parentId: 1,
        depth: 1,
      });
      expect(result[2]).toEqual({
        id: 3,
        label: "Sub-child 1",
        url: "https://example.com/subchild1",
        parentId: 2,
        depth: 2,
      });
      expect(result[3]).toEqual({
        id: 4,
        label: "Child 2",
        url: "https://example.com/child2",
        parentId: 1,
        depth: 1,
      });
      expect(result[4]).toEqual({
        id: 5,
        label: "Root 2",
        url: "https://example.com/root2",
        parentId: null,
        depth: 0,
      });
    });

    it("should handle an empty array", () => {
      const result = flattenItems([]);
      expect(result).toEqual([]);
    });

    it("should handle a structure with no children", () => {
      const menu = [
        {
          id: 1,
          label: "Root 1",
          url: "https://example.com",
          children: [],
        },
      ];

      const result = flattenItems(menu);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 1,
        label: "Root 1",
        url: "https://example.com",
        parentId: null,
        depth: 0,
      });
    });

    it("should return an empty array for invalid input", () => {
      const result = flattenItems(null);
      expect(result).toEqual([]);

      const resultWithUndefined = flattenItems(undefined);
      expect(resultWithUndefined).toEqual([]);

      const resultWithNonArray = flattenItems("not an array");
      expect(resultWithNonArray).toEqual([]);
    });

    it("should preserve parentId and depth properties", () => {
      const result = flattenItems(nestedMenuItems);

      expect(result[1].parentId).toBe(1);
      expect(result[2].depth).toBe(2);
    });
  });

  describe("convertToNestedStructure", () => {
    it("should convert a flat structure into a nested structure", () => {
      const result = convertToNestedStructure(flatMenuItems);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[0].children).toHaveLength(2);
      expect(result[0].children[0].id).toBe(2);
      expect(result[0].children[0].children).toHaveLength(1);
      expect(result[0].children[1].id).toBe(4);
      expect(result[0].children[1].children).toHaveLength(0);
      expect(result[1].id).toBe(5);
      expect(result[1].children).toHaveLength(0);
    });

    it("should handle a flat structure with no parentId", () => {
      const flatItems = [
        { id: 1, label: "Item 1", url: "https://example.com", parentId: null },
        {
          id: 2,
          label: "Item 2",
          url: "https://example.com/2",
          parentId: null,
        },
      ];

      const result = convertToNestedStructure(flatItems);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[0].children).toHaveLength(0);
      expect(result[1].id).toBe(2);
      expect(result[1].children).toHaveLength(0);
    });

    it("should handle an empty array", () => {
      const result = convertToNestedStructure([]);

      expect(result).toEqual([]);
    });

    it("should handle missing parentId values gracefully", () => {
      const flatItems = [
        { id: 1, label: "Root", url: "https://example.com", parentId: null },
        {
          id: 2,
          label: "Child without Parent",
          url: "https://example.com/child",
          parentId: 99,
        },
      ];

      const result = convertToNestedStructure(flatItems);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
      expect(result[0].children).toHaveLength(0);
    });

    it("should preserve all item properties", () => {
      const flatItems = [
        {
          id: 1,
          label: "Root 1",
          url: "https://example.com",
          parentId: null,
          extra: "Extra Data",
        },
        {
          id: 2,
          label: "Child 1",
          url: "https://example.com/child1",
          parentId: 1,
          extra: "More Data",
        },
      ];

      const result = convertToNestedStructure(flatItems);

      expect(result[0].extra).toBe("Extra Data");
      expect(result[0].children[0].extra).toBe("More Data");
    });
  });

  describe("getDragDepth", () => {
    it("should calculate depth correctly based on offset and indentation width", () => {
      expect(getDragDepth(120, 40)).toBe(3);
      expect(getDragDepth(100, 25)).toBe(4);
      expect(getDragDepth(0, 40)).toBe(0);
    });

    it("should round depth to the nearest integer", () => {
      expect(getDragDepth(125, 40)).toBe(3);
      expect(getDragDepth(115, 40)).toBe(3);
    });
  });

  describe("getMaxDepth", () => {
    it("should return the depth of the previous item plus 1", () => {
      const previousItem = { id: 1, depth: 2 };
      expect(getMaxDepth({ previousItem })).toBe(3);
    });

    it("should return 0 if there is no previous item", () => {
      expect(getMaxDepth({})).toBe(0);
      expect(getMaxDepth({ previousItem: null })).toBe(0);
    });
  });

  describe("getMinDepth", () => {
    it("should return the depth of the next item", () => {
      const nextItem = { id: 2, depth: 3 };
      expect(getMinDepth({ nextItem })).toBe(3);
    });

    it("should return 0 if there is no next item", () => {
      expect(getMinDepth({})).toBe(0);
      expect(getMinDepth({ nextItem: null })).toBe(0);
    });
  });

  describe("removeChildrenOf", () => {
    it("should handle an empty array", () => {
      const temporaryItems = [];
      const result = removeChildrenOf([], [1], temporaryItems);

      expect(result).toEqual([]);
      expect(temporaryItems).toEqual([]);
    });

    it("should add items to temporaryItems only once", () => {
      const temporaryItems = [];
      const result = removeChildrenOf(sampleItems, [1, 2], temporaryItems);

      expect(temporaryItems).toHaveLength(3);
      const uniqueIds = new Set(temporaryItems.map((item) => item.id));
      expect(uniqueIds.size).toBe(3);
    });
  });
});
