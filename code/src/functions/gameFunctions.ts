import GameModel from "../models/GameModel";
import GroupModel from "../models/GroupModel";
import ItemModel from "../models/ItemModel";
import { randomizeIndex } from "./utils";

export function randomizeGame(games: GameModel[]): GameModel {
  const randomIndex: number = randomizeIndex(games.length);

  return games[randomIndex];
}

export function getItemsByGame(game: GameModel): ItemModel[]{
    return randomizeItems(extractItemsByGame(game));
}

function randomizeItems(items: ItemModel[]): ItemModel[]{
    return items.sort(() => Math.random() - 0.5);
}

function extractItemsByGame(game: GameModel): ItemModel[] {
  return game.groups.flatMap((group: GroupModel) => group.items);
}
