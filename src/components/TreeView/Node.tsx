"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import {
  calculateTotalHeight,
  findNode,
  findParents,
  isAnyChildrenSelected,
} from "@/utils";

import Icon from "@/components/Icon";
import { useTreeView } from "@/components/TreeView";

const Node: React.FC<TreeNodeType> = ({ item, data }) => {
  const {
    openNodes,
    setOpenNodes,
    focusedId,
    setFocusedId,
    selectedId,
    setSelectedId,
  } = useTreeView();

  let isOpen = openNodes.includes(item.id);
  let isFirstNode = data[0].id === item.id;
  let isSelectedOrChildSelected =
    selectedId === item.id ||
    (!isOpen &&
      item?.children &&
      isAnyChildrenSelected(item.children, selectedId));

  const ref = useRef<HTMLLIElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const currentElement = e.currentTarget;
    switch (e.key) {
      case "Meta":
      case "Control":
      case "Alt":
      case "Shift":
      case "CapsLock":
        return;

      case "Enter":
      case " ":
        if (!item.children || !item.children.length) {
          setSelectedId(item.id);
        }

        break;

      case "ArrowUp": {
        let previousElement = currentElement.previousElementSibling;
        // Check if there are open children of the previous siblings which needs to be skipped.
        while (
          previousElement &&
          previousElement.getAttribute("aria-expanded") === "true"
        ) {
          const children = previousElement.querySelectorAll(
            ':scope > ul > li[role="treeitem"]'
          );

          if (children.length) {
            previousElement = children[children.length - 1]; // last child of the previous open parent
          } else {
            break;
          }
        }

        // If there are no more siblings, move to the parent.
        if (!previousElement) {
          const parentElement = currentElement?.parentElement?.closest(
            'li[role="treeitem"]'
          ) as HTMLLIElement;

          if (parentElement) {
            setFocusedId(parentElement.id);
          }
        } else if (previousElement) {
          setFocusedId(previousElement.id);
        }
        break;
      }

      case "ArrowDown": {
        // If current element is expanded, first child must be selected.
        if (currentElement.getAttribute("aria-expanded") === "true") {
          const firstChild = currentElement.querySelector(
            'li[role="treeitem"]'
          );

          if (firstChild) {
            setFocusedId(firstChild.id);
          }
        } else {
          // Else, get next sibling or closest uncle/aunt.
          let nextElement = currentElement.nextElementSibling;

          // Check if current element has uncles/aunts (if currentElement is the last child)
          if (!nextElement) {
            let parentElement = currentElement?.parentElement?.closest(
              'li[role="treeitem"]'
            );
            while (!nextElement && parentElement) {
              nextElement = parentElement.nextElementSibling;
              parentElement = parentElement.parentElement?.closest(
                'li[role="treeitem"]'
              );
            }
          }
          if (nextElement) {
            setFocusedId(nextElement.id);
          }
        }
        break;
      }

      case "ArrowRight": {
        if (!item.children || !item.children.length) {
          return;
        }

        setOpenNodes([...openNodes, item.id]);

        // Focuses on the first child if open
        if (currentElement && item.children && item.children.length && isOpen) {
          const firstChild = currentElement.querySelector(
            "li:first-of-type"
          ) as HTMLLIElement;

          if (firstChild) {
            setFocusedId(firstChild.id);
          }
        }
        break;
      }

      case "ArrowLeft": {
        setOpenNodes(openNodes.filter((node: string) => node !== item.id));
        break;
      }

      case "Tab":
        if (focusedId) {
          setFocusedId(null);
        } else {
          setFocusedId(item.id);
        }
        break;

      default:
        if (/[a-zA-Z]/.test(e.key)) {
          // checks if e.key is a letter between a-z or A-Z
          const firstAvailableItem = findNode(data, e.key.toLowerCase());

          if (firstAvailableItem) {
            setFocusedId(firstAvailableItem.id);
            setSelectedId(firstAvailableItem.id);

            const parentPath = findParents(data, firstAvailableItem.id);
            if (parentPath !== null) {
              setOpenNodes((prev: string[]) => [...prev, ...parentPath]);
            }
          }
        }
    }
  };

  useEffect(() => {
    if (focusedId === item.id && ref.current) {
      ref.current.focus();
    }
  }, [focusedId]);

  const liConditionalProps = {
    ...(item.children &&
      item.children.length > 0 && {
        ["aria-expanded"]: isOpen,
      }),
  };

  const divConditionalProps = {
    ...(item.children && item.children.length > 0
      ? {
          onClick: () => {
            setOpenNodes(
              isOpen
                ? openNodes.filter((node: string) => node !== item.id)
                : [...openNodes, item.id]
            );
          },
        }
      : {
          onClick: () => setSelectedId(item.id),
        }),
  };

  return (
    <li
      ref={ref}
      id={item.id}
      role="treeitem"
      tabIndex={focusedId === item.id || isFirstNode ? 0 : -1}
      aria-selected={selectedId == item.id}
      aria-label={item.name}
      onKeyDown={handleKeyDown}
      className={clsx(
        "group w-full rounded-[6px] text-xs transition-colors outline-none first:pt-[2px]"
      )}
      {...liConditionalProps}
    >
      <div
        tabIndex={focusedId === item.id || isFirstNode ? 0 : -1}
        className={clsx(
          "relative w-full h-full flex items-center text-xs justify-start gap-1 py-[6px] px-2 hover:bg-[var(--darkBg)] rounded-[6px] transition-colors outline-none border-solid border-[1px] border-transparent",
          item.id === focusedId && "group-focus-visible:border-orange-600",
          isSelectedOrChildSelected && "bg-[var(--darkBg)]"
        )}
        {...divConditionalProps}
      >
        {item.children && item.children.length > 0 ? (
          <Icon name="folder" openState={isOpen} className="flex-shrink-0" />
        ) : (
          <Icon name={item.icon} className="flex-shrink-0" />
        )}
        <span className="truncate">{item.name}</span>
      </div>

      {item.children && item.children.length > 0 ? (
        <ul
          ref={ulRef}
          role="group"
          style={
            {
              "--maxHeight": isOpen
                ? `${calculateTotalHeight(item.children)}px`
                : "0px",
            } as React.CSSProperties
          }
          className={clsx(
            "overflow-hidden pl-4 transition-[max-height] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] max-h-[var(--maxHeight)] space-y-[2px]"
          )}
        >
          {item.children.map((child) => (
            <Node key={child.id} item={child} data={data} />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default Node;
