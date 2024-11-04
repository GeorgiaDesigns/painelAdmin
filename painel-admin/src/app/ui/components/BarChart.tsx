import { useDashboardChart } from "@/app/hooks/useDashboardChart";
import { DashboardFilterProps } from "@/app/lib/definitions";
import { BarDatum, BarSvgProps, ResponsiveBar } from "@nivo/bar";

type BarChartProps<T extends BarDatum> = {
  endpoint: string;
  keys?: string[];
  indexBy?: string;
  filter?: DashboardFilterProps;
} & Omit<BarSvgProps<T>, "data" | "height" | "width">;

const BarChart = <T extends BarDatum>({
  endpoint,
  keys,
  indexBy,
  filter,
}: BarChartProps<T>) => {
  const { data, loading, error } = useDashboardChart({ endpoint, filter });
  const filteredChartData = data as BarDatum[];

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <>Erro</>;
  }

  return filteredChartData.filter((e) => e.total !== 0).length > 0 ? (
    <ResponsiveBar
      data={data as T[]}
      keys={keys}
      margin={{ top: 0, right: 40, bottom: 20, left: 40 }}
      padding={0.5}
      enableGridY={false}
      enableGridX={false}
      indexBy={indexBy}
      colorBy="indexValue"
      // legends={[
      //   {
      //     dataFrom: "keys",
      //     anchor: "right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 80,
      //     translateY: 40,
      //     itemsSpacing: 8,
      //     itemWidth: 100,
      //     itemHeight: 15,
      //     itemTextColor: "#999",
      //     itemDirection: "left-to-right",
      //     symbolShape: "circle",
      //     symbolSize: 15,
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000",
      //         },
      //       },
      //     ],
      //   },
      // ]}
      role="application"
      tooltip={({ id, value, color }) => (
        <div
          style={{
            padding: 12,
            color,
            background: "#222222",
          }}
        >
          <strong>
            {id}: {value}
          </strong>
        </div>
      )}
    />
  ) : (
    <p>Não há dados disponíveis</p>
  );
};

export default BarChart;
