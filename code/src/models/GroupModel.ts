import ItemModel from "./ItemModel";

export default interface GroupModel {
  id: number;
  items: ItemModel[];
  color: string;
}
