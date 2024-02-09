import ItemModel from "./ItemModel";

export default interface GroupModel {
  id: number;
  name: string;
  items: ItemModel[];
  color: `#${string}`;
}
