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
} from "../constants";
import GameModel from "../models/GameModel";
import { randomizeGame, getItemsByGame } from "../functions/gameFunctions";

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

    setCompletedGroups([...completedGroups, correctGroup]);
    setItems(
      items.filter(
        (item: ItemModel) =>
          !groupItems.some((groupItem: ItemModel) => groupItem.id === item.id)
      )
    );
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
    <div className="flex flex-col items-center p-4 w-full md:w-[550px] m-auto gap-8">
      <h1 className="text-3xl text-white font-bold">Conexo Clone</h1>
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
      {completedGroups.map((group: GroupModel) => (
        <h1>{group.color}</h1>
      ))}
    </div>
  );
}
