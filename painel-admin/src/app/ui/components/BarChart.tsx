import { useDashboardChart } from "@/app/hooks/useDashboardChart";
import { DashboardFilterProps } from "@/app/lib/definitions";
import { BarDatum, BarSvgProps, ResponsiveBar } from "@nivo/bar";

type BarChartProps<T extends BarDatum> = {
  endpoint: string;
  keys?: string[];
  filter?: DashboardFilterProps;
} & Omit<BarSvgProps<T>, "data" | "height" | "width">;

type ChartData = {
  type: string;
  total: number;
};

const BarChart = <T extends BarDatum>({
  endpoint,
  keys,
  filter,
  ...rest
}: BarChartProps<T>) => {
  const { data, loading, error } = useDashboardChart({ endpoint, filter });
  const filteredChartData = data as ChartData[];

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
      {...rest}
    />
  ) : (
    <p>Não há dados disponíveis</p>
  );
};

export default BarChart;
