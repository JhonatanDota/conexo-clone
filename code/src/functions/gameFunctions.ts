import GameModel from "../models/GameModel";
import GroupModel from "../models/GroupModel";
import ItemModel from "../models/ItemModel";
import { randomizeIndex } from "./utils";

export function randomizeGame(
  games: GameModel[],
  preventGame?: GameModel
): GameModel {
  const randomIndex: number = randomizeIndex(games.length);
  const randomizedGame: GameModel = games[randomIndex];

  if (preventGame && randomizedGame.id === preventGame.id)
    return randomizeGame(games, preventGame);

  return randomizedGame;
}

export function getItemsByGame(game: GameModel): ItemModel[] {
  return randomizeItems(extractItemsByGame(game));
}

function randomizeItems(items: ItemModel[]): ItemModel[] {
  return items.sort(() => Math.random() - 0.5);
}

function extractItemsByGame(game: GameModel): ItemModel[] {
  return game.groups.flatMap((group: GroupModel) => group.items);
}

export function concatItemNames(items: ItemModel[]): string {
  const itemNames: string[] = items.map((item) => item.name);
  return itemNames.join(", ");
}
