// Find the first node which starts with the key
export function findNode(
  nodes: TreeItemType[],
  key: string
): TreeItemType | null {
  for (let node of nodes) {
    if (node.name.toLowerCase().startsWith(key.toLowerCase())) {
      return node;
    }

    if (node.children) {
      let foundNode = findNode(node.children, key);
      if (foundNode) {
        return foundNode;
      }
    }
  }

  return null;
}

// Find the path to the node
export function findParents(
  data: TreeItemType[],
  nodeId: string
): string[] | null {
  for (const node of data) {
    if (node.children) {
      const childIndex = node.children.findIndex(
        (child) => child.id === nodeId
      );

      if (childIndex !== -1) {
        return [node.id];
      }

      // else, search in child nodes
      const result = findParents(node.children, nodeId);
      if (result !== null) {
        // if child was found in sub-tree, add this node.id as part of the path
        return [node.id].concat(result);
      }
    }
  }
  return null;
}

// Calculate height of item to generate maxHeight, in order to achieve a transition based on the lenght of the children
export function calculateTotalHeight(items: TreeItemType[]): number {
  let totalHeight = 0;

  items.forEach((item) => {
    totalHeight += 45; // max height of an item
    if (item.children && item.children.length > 0) {
      totalHeight += calculateTotalHeight(item.children); // recursive call for item's children
    }
  });

  return totalHeight;
}

// Check if any of the children is selected
export function isAnyChildrenSelected(
  items: TreeItemType[],
  selectedId: string | null
): boolean {
  let selectedChildren = false;

  selectedChildren = items.some(
    (item) =>
      item.id === selectedId ||
      (item.children &&
        item.children.length > 0 &&
        isAnyChildrenSelected(item.children, selectedId))
  );

  return selectedChildren;
}
