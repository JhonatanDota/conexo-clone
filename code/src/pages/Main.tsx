import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import ItemCard from "../components/ItemCard";
import { GAMES } from "../data/dumyGame";
import GroupModel from "../models/GroupModel";
import ItemModel from "../models/ItemModel";
import {
  EXPECTED_CORRECT_ITEMS,
  MAX_SELECTED_ITEMS,
  NEW_ATTEMPT_WAIT_MS,
  COMPLETE_GROUP_MS,
} from "../constants";
import GameModel from "../models/GameModel";
import { randomizeGame, getItemsByGame } from "../functions/gameFunctions";
import CompletedGroupCard from "../components/CompletedGroupCard";

export default function Main() {
  const [game] = useState<GameModel>(randomizeGame(GAMES));

  const [items, setItems] = useState<ItemModel[]>(getItemsByGame(game));
  const [completedGroups, setCompletedGroups] = useState<GroupModel[]>([]);
  const [selectedItems, setSelectedItems] = useState<ItemModel[]>([]);
  const [canSelectItem, setCanSelectItem] = useState<boolean>(true);

  function resetSelectedItems(): void {
    setSelectedItems([]);
  }

  function handleItem(item: ItemModel) {
    const isSelected: boolean = isItemSelected(item);
    isSelected ? removeItem(item) : addItem(item);
  }

  function isItemSelected(item: ItemModel): boolean {
    return selectedItems.some(
      (selectedItem: ItemModel) => selectedItem.id === item.id
    );
  }

  function addItem(item: ItemModel): void {
    setSelectedItems([...selectedItems, item]);
  }

  function removeItem(item: ItemModel): void {
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
    );
  }

  function checkAttempt(): void {
    game.groups.forEach((group: GroupModel) => {
      let correctItemsCount: number = 0;

      group.items.forEach((item: ItemModel) => {
        if (isItemSelected(item)) correctItemsCount++;
      });

      if (correctItemsCount === EXPECTED_CORRECT_ITEMS) {
        handleCorrectAttempt(group);
      }
    });
  }

  function handleCorrectAttempt(correctGroup: GroupModel): void {
    const groupItems: ItemModel[] = correctGroup.items;

    setItems(
      items.filter(
        (item: ItemModel) =>
          !groupItems.some((groupItem: ItemModel) => groupItem.id === item.id)
      )
    );

    setTimeout(function () {
      setCompletedGroups([...completedGroups, correctGroup]);
    }, COMPLETE_GROUP_MS);
  }

  function handleAttempt(): void {
    setCanSelectItem(false);

    setTimeout(function () {
      resetSelectedItems();
      setCanSelectItem(true);
      checkAttempt();
    }, NEW_ATTEMPT_WAIT_MS);
  }

  useEffect(() => {
    if (selectedItems.length === MAX_SELECTED_ITEMS) handleAttempt();
  }, [selectedItems]);

  return (
    <div className="flex flex-col items-center px-1 py-4 w-full md:w-[700px] m-auto gap-6 md:gap-8">
      <h1 className="text-4xl md:text-5xl text-white font-bold transition-all">
        Conexo Clone
      </h1>

      <div className="flex flex-col gap-3 items-center w-full">
        <AnimatePresence>
          {completedGroups.map((group: GroupModel) => (
            <CompletedGroupCard key={group.id} group={group} />
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap w-full">
        <AnimatePresence>
          {items.map((item: ItemModel) => (
            <ItemCard
              key={item.id}
              item={item}
              isSelected={isItemSelected(item)}
              canSelect={canSelectItem}
              handleItem={handleItem}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
