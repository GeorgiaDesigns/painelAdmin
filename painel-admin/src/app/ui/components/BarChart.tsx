import { useDashboardChart } from "@/app/hooks/useDashboardChart";
import { DashboardFilterProps } from "@/app/lib/definitions";
import { BarDatum, BarSvgProps, ResponsiveBar } from "@nivo/bar";

type BarChartProps<T extends BarDatum> = {
  endpoint: string;
  keys?: string[];
  filter?: DashboardFilterProps;
} & Omit<BarSvgProps<T>, "data" | "height" | "width">;

const BarChart = <T extends BarDatum>({
  endpoint,
  keys,
  filter,
  ...rest
}: BarChartProps<T>) => {
  const { data, loading, error } = useDashboardChart({ endpoint, filter });
  const filteredChartData = data as BarDatum[];

  console.log(data as T[]);
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
      padding={0.5}
      enableGridY={false}
      enableGridX={false}
      indexBy={rest.indexBy}
      colors={["#F15338", "#FF9902", "#01ABCC"]}
      colorBy="indexValue"
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      {...rest}
    />
  ) : (
    <p>Não há dados disponíveis</p>
  );
};

export default BarChart;
