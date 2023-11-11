type TreeViewContextType = {
  openNodes: string[];
  setOpenNodes: React.Dispatch<React.SetStateAction<string[]>>;
  focusedId: string | null;
  setFocusedId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};

type TreeViewType = {
  children: React.ReactNode;
};

type TreeItemType = {
  id: string;
  name: string;
  children?: TreeItemType[];
  icon?: string;
};

type TreeNodeType = {
  item: TreeItemType;
  data: TreeItemType[];
};

type IconProps = {
  name?: string;
  className?: string;
  openState?: boolean;
};
