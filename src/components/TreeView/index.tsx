import React, { createContext, useState, useContext } from "react";
import Tree from "./Tree";
import Node from "./Node";

// Context and provider for the tree view
const TreeViewContext = createContext<TreeViewContextType | undefined>(
  undefined
);

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [openNodes, setOpenNodes] = useState<string[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <TreeViewContext.Provider
      value={{
        openNodes,
        setOpenNodes,
        focusedId,
        setFocusedId,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </TreeViewContext.Provider>
  );
};

export const useTreeView = (): TreeViewContextType => {
  const context = useContext(TreeViewContext);
  if (!context) {
    throw new Error("useTreeView must be used within a TreeViewProvider");
  }
  return context;
};


// TreeView API elements
export const TreeView = ({ children }: { children: React.ReactNode }) => {
  return <Tree>{children}</Tree>;
};

TreeView.Provider = Provider;
TreeView.Node = Node;
