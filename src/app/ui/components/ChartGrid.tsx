import { motion } from "framer-motion";
import ChartCard from "./ChartCard";
import GaugeChart from "./GaugeChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const ChartGrid = () => {
  return (
    <motion.div
      className="grid grid-cols-3 gap-4 items-center justify-items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ChartCard label={"Residentes por planeta"} variants={cardVariants}>
        <GaugeChart endpoint="locations" />
      </ChartCard>

      <ChartCard label={"Status dos Personagens"} variants={cardVariants}>
        <BarChart
          indexBy={"status"}
          keys={["Vivos", "Mortos"]}
          endpoint="charactersbyStatus"
        />
      </ChartCard>

      <ChartCard label={"Personagens por episódio"} variants={cardVariants}>
        <LineChart endpoint="charactersperEpisode" />
      </ChartCard>
    </motion.div>
  );
};

export default ChartGrid;
