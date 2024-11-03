import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'
import { DashboardFilterProps } from 'services/DashboardService'
import { isEmpty } from 'lodash'
import { Roles } from 'services/RoleService'

interface DashboardProviderProps {
  children: ReactNode
}

interface DashboardContextData {
  filterInstitution: string | null
  filterRole: Roles | null
  filterActive: UserType
  filterTime: TimeFilter
  setFilterInstitution: (filter: string | null) => void
  setFilterRole: (filter: Roles | null) => void
  setFilterActive: (filter: UserType) => void
  setFilterTime: (filter: TimeFilter) => void
  buildFilter: () => Partial<DashboardFilterProps> | undefined
}

const DashboardContext = createContext<DashboardContextData>(
  {} as DashboardContextData
)

export type TimeFilter = {
  initial: string
  final: string
}

export enum UserType {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export function DashboardProvider({
  children
}: DashboardProviderProps): JSX.Element {
  const [filterInstitution, setFilterInstitution] = useState<string | null>(
    null
  )
  const [filterRole, setFilterRole] = useState<Roles | null>(null)
  const [filterActive, setFilterActive] = useState<UserType>(UserType.ALL)
  const [filterTime, setFilterTime] = useState<TimeFilter>({
    initial: new Date(2019, 0, 1).toISOString(),
    final: new Date().toISOString()
  })

  const buildFilter = useCallback(():
    | Partial<DashboardFilterProps>
    | undefined => {
    if (isEmpty(filterTime)) return undefined
    if (filterTime.initial === '' || filterTime.final === '') return undefined

    return {
      role: filterRole,
      institutionId: filterInstitution,
      initial: filterTime.initial,
      final: filterTime.final,
      onlyActive:
        filterActive === UserType.ALL ? null : filterActive === UserType.ACTIVE
    }
  }, [filterInstitution, filterTime, filterRole, filterActive])

  return (
    <DashboardContext.Provider
      value={{
        filterInstitution,
        filterTime,
        filterRole,
        filterActive,
        setFilterInstitution,
        setFilterRole,
        setFilterTime,
        setFilterActive,
        buildFilter
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboardProvider(): DashboardContextData {
  const context = useContext(DashboardContext)
  return context
}
