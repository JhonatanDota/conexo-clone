import useFitText from "use-fit-text";
import { concatItemNames } from "../functions/gameFunctions";
import GroupModel from "../models/GroupModel";
import { motion } from "framer-motion";

type CompletedItemCardProps = {
  group: GroupModel;
};

export default function CompletedGroupCard(props: CompletedItemCardProps) {
  const { group } = props;

  const { fontSize, ref } = useFitText();

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={ref}
        className="flex flex-col gap-2 items-center p-4 md:p-6 rounded-xl text-white"
        style={{ backgroundColor: group.color }}
      >
        <h2 className="text-xl md:text-2xl font-bold">{group.name}</h2>
        <h3
          style={{ fontSize }}
          className="text-lg md:text-xl font-normal uppercase"
        >
          {concatItemNames(group.items)}
        </h3>
      </div>
    </motion.div>
  );
}
