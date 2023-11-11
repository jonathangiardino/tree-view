import clsx from "clsx";
import { useState } from "react";

const Tree = ({ children }: TreeViewType) => {
  const [showTree, setShowTree] = useState(true);

  return (
    <div
      className={clsx(
        "flex items-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        !showTree && "-translate-x-[310px]"
      )}
    >
      <div className="my-5 ml-5 h-[calc(100vh-40px)] w-72 px-2 py-3 bg-[var(--treeBg)] rounded-xl overflow-hidden flex flex-col gap-3 border-solid border-[1px] border-[var(--borders)] select-none">
        <div className="overflow-y-auto h-full">
          <ul
            role="tree"
            className="w-full h-full rounded-lg px-1 space-y-[2px]"
            aria-label="Tree"
          >
            {children}
          </ul>
        </div>
      </div>
      <div
        className="h-30 w-6 rounded-sm group flex items-center justify-center cursor-pointer"
        onClick={() => setShowTree(!showTree)}
      >
        <div className="h-24 w-1 rounded-sm bg-[var(--borders)] opacity-50 group-hover:opacity-100 group-hover:h-32 transition-[opacity,height] duration-200" />
      </div>
    </div>
  );
};

export default Tree;
