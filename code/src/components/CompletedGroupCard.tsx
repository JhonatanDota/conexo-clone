import GroupModel from "../models/GroupModel";
import { motion } from "framer-motion";

type CompletedItemCardProps = {
  group: GroupModel;
};

export default function CompletedGroupCard(props: CompletedItemCardProps) {
  const { group } = props;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col p-4 rounded-xl bg-green-400">
        <h1>ABADA</h1>
      </div>
    </motion.div>
  );
}
