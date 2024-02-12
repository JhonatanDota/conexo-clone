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
import {
  randomizeGame,
  getItemsByGame,
  addNewItemToList,
  removeItemFromList,
  checkIsItemSelected,
} from "../functions/gameFunctions";
import CompletedGroupCard from "../components/CompletedGroupCard";
import RandomGameButton from "../components/RandomGameButton";
import { wait } from "../functions/utils";

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
    const isSelected: boolean = checkIsItemSelected(selectedItems, item);
    const updatedItemList: ItemModel[] = isSelected
      ? removeItemFromList(selectedItems, item)
      : addNewItemToList(selectedItems, item);

    setSelectedItems(updatedItemList);
  }

  function checkAttempt(): void {
    game.groups.forEach((group: GroupModel) => {
      let correctItemsCount: number = 0;

      group.items.forEach((item: ItemModel) => {
        if (checkIsItemSelected(selectedItems, item)) correctItemsCount++;
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

    wait(() => {
      setCompletedGroups([...completedGroups, correctGroup]);
    }, COMPLETE_GROUP_WAIT_MS);
  }

  function handleAttempt(): void {
    setCheckingAttempt(true);

    wait(() => {
      resetSelectedItems();
      setCheckingAttempt(false);
      checkAttempt();
    }, NEW_ATTEMPT_WAIT_MS);
  }

  useEffect(() => {
    const hasItems: boolean = !!items.length;
    const hasCompletedGroups: boolean = !!completedGroups.length;
    const newItems: ItemModel[] = getItemsByGame(game);

    resetItems();
    resetCompletedGroups();

    if (hasItems || hasCompletedGroups)
      wait(() => setItems(newItems), CHANGE_GAME_WAIT_MS);
    else setItems(newItems);
  }, [game]);

  useEffect(() => {
    if (selectedItems.length === MAX_SELECTED_ITEMS) handleAttempt();
  }, [selectedItems]);

  return (
    <div className="flex flex-col items-center px-1 py-4 w-full md:w-[700px] m-auto gap-4">
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
              isSelected={checkIsItemSelected(selectedItems, item)}
              checkingAttempt={checkingAttempt}
              handleItem={handleItem}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
