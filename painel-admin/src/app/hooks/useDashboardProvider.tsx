import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { DashboardFilterProps } from "../lib/definitions";

interface DashboardProviderProps {
  children: ReactNode;
}

interface DashboardContextData {
  filterLocation: string | null;
  setFilterLocation: (filter: string | null) => void;
  buildFilter: () => Partial<DashboardFilterProps> | undefined;
}

const DashboardContext = createContext<DashboardContextData>(
  {} as DashboardContextData
);

export function DashboardProvider({
  children,
}: DashboardProviderProps): JSX.Element {
  const [filterLocation, setFilterLocation] = useState<string | null>(null);

  const buildFilter = useCallback(():
    | Partial<DashboardFilterProps>
    | undefined => {
    return {
      location: filterLocation,
    };
  }, [filterLocation]);

  return (
    <DashboardContext.Provider
      value={{
        filterLocation,
        setFilterLocation,
        buildFilter,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardProvider(): DashboardContextData {
  const context = useContext(DashboardContext);
  return context;
}
