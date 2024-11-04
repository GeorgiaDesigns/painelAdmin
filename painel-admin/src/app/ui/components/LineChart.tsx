import { useDashboardChart } from "@/app/hooks/useDashboardChart";
import { LineSvgProps, ResponsiveLine, Serie } from "@nivo/line";

type LineChartProps = {
  endpoint: string;
  keys?: string[];
  indexBy?: string;
} & Omit<LineSvgProps, "data" | "height" | "width">;

const LineChart = ({ endpoint }: LineChartProps) => {
  const { data, loading, error } = useDashboardChart({ endpoint });

  const chartData = data as Serie[];

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <>Erro</>;
  }

  return data ? (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      tooltip={({
        point: {
          data: { xFormatted },
          index,
        },
      }) => (
        <div
          style={{
            padding: 12,
            background: "#222222",
          }}
        >
          <strong>
            {xFormatted}: {index}
          </strong>
        </div>
      )}
    />
  ) : (
    <p>Não há dados disponíveis</p>
  );
};

export default LineChart;
