"use client";

import { TreeView } from "@/components/TreeView";
import data from "@/data";

export default function Home() {
  return (
    <main>
      <TreeView.Provider>
        <TreeView>
          {data.map((item) => (
            <TreeView.Node key={item.id} item={item} data={data} />
          ))}
        </TreeView>
      </TreeView.Provider>
    </main>
  );
}
