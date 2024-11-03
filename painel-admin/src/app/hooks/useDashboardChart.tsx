import { useEffect, useState } from "react";
import { DashboardFilterProps } from "../lib/definitions";
import { fetchLocations, getCharactersAlive } from "../dashboard/actions";

type DashboardChartProps = {
  endpoint: string;
  filter?: DashboardFilterProps;
};

export function useDashboardChart({ endpoint, filter }: DashboardChartProps) {
  const [data, setData] = useState<unknown>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        let response;

        switch (endpoint) {
          // case "charactersFrom":
          //   response = await getCharactersFrom(filter.location);
          //   break;
          case "charactersAlive":
            response = await getCharactersAlive();
            break;
          case "locations":
            response = await fetchLocations();
            break;
          default:
            throw new Error("Invalid endpoint");
        }

        setData(response);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(true);
        setLoading(false);
      }
    };

    getData();
  }, [endpoint, filter]);

  return { data, loading, error };
}
