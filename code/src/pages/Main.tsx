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
  COMPLETE_GROUP_WAIT_MS,
  CHANGE_GAME_WAIT_MS,
} from "../constants";
import GameModel from "../models/GameModel";
import { randomizeGame, getItemsByGame } from "../functions/gameFunctions";
import CompletedGroupCard from "../components/CompletedGroupCard";
import RandomGameButton from "../components/RandomGameButton";

export default function Main() {
  const [game, setGame] = useState<GameModel>(randomizeGame(GAMES));

  const [items, setItems] = useState<ItemModel[]>([]);
  const [completedGroups, setCompletedGroups] = useState<GroupModel[]>([]);
  const [selectedItems, setSelectedItems] = useState<ItemModel[]>([]);
  const [checkingAttempt, setCheckingAttempt] = useState<boolean>(false);

  function resetItems(): void {
    setItems([]);
  }

  function resetSelectedItems(): void {
    setSelectedItems([]);
  }

  function resetCompletedGroups(): void {
    setCompletedGroups([]);
  }

  function handleItem(item: ItemModel): void {
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
    }, COMPLETE_GROUP_WAIT_MS);
  }

  function handleAttempt(): void {
    setCheckingAttempt(true);

    setTimeout(function () {
      resetSelectedItems();
      setCheckingAttempt(false);
      checkAttempt();
    }, NEW_ATTEMPT_WAIT_MS);
  }

  useEffect(() => {
    const hasItems: boolean = !!items.length;

    resetItems();
    resetCompletedGroups();

    if (hasItems) {
      setTimeout(() => {
        setItems(getItemsByGame(game));
      }, CHANGE_GAME_WAIT_MS);
    } else {
      setItems(getItemsByGame(game));
    }
  }, [game]);

  useEffect(() => {
    if (selectedItems.length === MAX_SELECTED_ITEMS) handleAttempt();
  }, [selectedItems]);

  return (
    <div className="flex flex-col items-center px-1 py-4 w-full md:w-[700px] m-auto gap-6">
      <h1 className="text-4xl md:text-5xl text-white font-bold transition-all select-none">
        Conexo Clone
      </h1>

      <RandomGameButton onClick={() => setGame(randomizeGame(GAMES, game))} />

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
              checkingAttempt={checkingAttempt}
              handleItem={handleItem}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
