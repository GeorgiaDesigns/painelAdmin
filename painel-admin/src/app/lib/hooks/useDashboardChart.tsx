import { useEffect, useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import DashboardService, {
  DashboardFilterProps
} from 'services/DashboardService'
import { useCurrentUser } from './useCurrentUser'

type DashboardChartProps = {
  endpoint: string
  filter: DashboardFilterProps
}

export function useDashboardChart({ endpoint, filter }: DashboardChartProps) {
  const t = useTranslations('admin.dashboard')
  const [data, setData] = useState<unknown>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const dashboardService = useMemo(() => new DashboardService(t), [t])
  const { getRoleEnum } = useCurrentUser()
  const roleEnum = getRoleEnum()

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const response = await dashboardService.getData(
          endpoint,
          filter,
          roleEnum
        )
        setData(response)
        setLoading(false)
      } catch (error) {
        setError(true)
      }
    }

    getData()
  }, [endpoint, filter, dashboardService, roleEnum])

  return { data, loading, error }
}
