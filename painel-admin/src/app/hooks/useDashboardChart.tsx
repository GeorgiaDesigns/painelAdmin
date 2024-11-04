import { useEffect, useState } from "react";
import { DashboardFilterProps } from "../lib/definitions";
import {
  fetchCharactersByStatus,
  fetchCharactersPerEpisode,
  fetchLocations,
} from "../dashboard/actions";

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
          case "charactersperEpisode":
            response = await fetchCharactersPerEpisode();
            break;
          case "charactersbyStatus":
            response = await fetchCharactersByStatus();
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
