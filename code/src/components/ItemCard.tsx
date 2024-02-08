import ItemModel from "../models/ItemModel";
import { motion } from "framer-motion";

type ItemCardProps = {
  item: ItemModel;
  isSelected: boolean;
  canSelect: boolean;
  handleItem: (item: ItemModel) => void;
};

export default function ItemCard(props: ItemCardProps) {
  const { item, isSelected, canSelect, handleItem } = props;

  return (
    <motion.div
      key={item.id}
      className="w-1/4 h-24 p-1 cursor-pointer"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <div
        onClick={() => canSelect && handleItem(item)}
        className={`flex justify-center items-center p-2 w-full h-full rounded-md ${
          isSelected ? "bg-blue-400" : "bg-[#1e293b]"
        }`}
      >
        <h2 className="uppercase text-base text-white">{item.name}</h2>
      </div>
    </motion.div>
  );
}
