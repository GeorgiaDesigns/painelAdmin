import { PieSvgProps, ResponsivePie } from "@nivo/pie";
import { Datum } from "@nivo/legends";
import { DashboardFilterProps } from "@/app/lib/definitions";
import { useDashboardChart } from "@/app/hooks/useDashboardChart";

type PieChartProps<T> = {
  endpoint: string;
  filter?: DashboardFilterProps;
} & Omit<PieSvgProps<T>, "data" | "height" | "width">;

const GaugeChart = <T,>({ endpoint, filter }: PieChartProps<T>) => {
  const { data, loading, error } = useDashboardChart({
    endpoint,
    filter,
  });

  const filteredChartData = data as Datum[];

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <span>Erro</span>;
  }

  return data ? (
    <ResponsivePie
      data={filteredChartData}
      margin={{ top: 0, right: 80, bottom: 60, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[]}
      legends={[
        {
          anchor: "left",
          direction: "column",
          justify: false,
          translateX: -80,
          translateY: 115,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 15,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 15,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
      tooltip={({ datum: { label, value, color } }) => (
        <div
          style={{
            padding: 12,
            color,
            background: "#222222",
          }}
        >
          <strong>
            {label}: {value}
          </strong>
        </div>
      )}
    />
  ) : (
    <p>Não há dados disponíveis</p>
  );
};

export default GaugeChart;
