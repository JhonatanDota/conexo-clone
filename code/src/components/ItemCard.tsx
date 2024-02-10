import { useState } from "react";
import ItemModel from "../models/ItemModel";
import { motion } from "framer-motion";
import { useBetterFitText } from "../functions/hooks";

type ItemCardProps = {
  item: ItemModel;
  isSelected: boolean;
  checkingAttempt: boolean;
  handleItem: (item: ItemModel) => void;
};

export default function ItemCard(props: ItemCardProps) {
  const { item, isSelected, checkingAttempt, handleItem } = props;

  const { fontSize, ref } = useBetterFitText({
    onFinish: () => setItemTextOpacity(100),
  });

  const [itemTextOpacity, setItemTextOpacity] = useState<number>(0);

  return (
    <motion.div
      className="w-1/4 h-24 md:h-28 p-1 cursor-pointer"
      layout
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.2 }}
      transition={{ duration: 0.4 }}
    >
      <div
        ref={ref}
        onClick={() => !checkingAttempt && handleItem(item)}
        className={`flex justify-center items-center p-2 w-full h-full rounded-md transition-all ${isSelected ? "bg-blue-400 font-medium" : "bg-[#1e293b]"
          } ${!isSelected && checkingAttempt && "bg-opacity-75"}`}
      >
        <h2
          style={{ fontSize, opacity: itemTextOpacity }}
          className="text-center p-1 uppercase text-white transition-opacity select-none"
        >
          {item.name}
        </h2>
      </div>
    </motion.div>
  );
}
