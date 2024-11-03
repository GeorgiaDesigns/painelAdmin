import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { identity } from 'lodash'
import BaseService from 'services/api'
import { IIdentifiable, Newable } from 'types/utils'
import { usePrevious } from './usePrevious'

export interface IPaginatedData<TData> {
  count: number
  items: TData[]
}

type PaginatedDataProps<TData> = {
  page: number
  top: number
  orderBy: string
  filter: string
  service: Newable<BaseService>
  fetchFunc?: (service: BaseService) => Promise<IPaginatedData<TData>>
  dataMapping?: (entity: TData) => Promise<unknown>
}

const usePaginatedData = <TData extends IIdentifiable>({
  service,
  page,
  top,
  orderBy,
  filter,
  fetchFunc,
  dataMapping = identity
}: PaginatedDataProps<TData>) => {
  const serviceClass = useMemo(() => new service(), [service])
  const [data, setData] = useState<TData[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const totalRecords = useRef<number>(0)
  const previousFilter = usePrevious(filter)
  const newPage = previousFilter !== filter ? 1 : page

  const updateData = useCallback((newData: TData[]) => {
    setData([...newData])
  }, [])

  const updateDatum = useCallback((newDatum: TData) => {
    const newEntity = newDatum as IIdentifiable

    setData((currentData) => {
      return currentData.map((datum) => {
        const currentEntity = datum as IIdentifiable
        return currentEntity.id === newEntity.id ? newDatum : datum
      })
    })
  }, [])

  const updateDatumId = useCallback((prevId: string, newId: string) => {
    setData((currentData) => {
      return currentData.map((datum) => {
        const currentEntity = datum as IIdentifiable
        return currentEntity.id === prevId
          ? ({ ...currentEntity, id: newId } as TData)
          : datum
      })
    })
  }, [])

  const removeDatum = useCallback((toRemove: TData) => {
    const toRemoveEntity = toRemove as IIdentifiable

    setData((currentData) => {
      return currentData.filter((datum) => {
        const currentEntity = datum as IIdentifiable
        return currentEntity.id !== toRemoveEntity.id
      })
    })
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const skip = top * (newPage - 1)

    const odataConfig = serviceClass
      .top(top)
      .skip(skip)
      .orderBy(orderBy)
      .where(filter)

    const targetFunc = fetchFunc
      ? fetchFunc(odataConfig)
      : odataConfig.get<IPaginatedData<TData>>()
    const response = await targetFunc

    totalRecords.current = response.count
    const newData = await Promise.all(response.items.map(dataMapping))

    setLoading(false)
    setData(newData as TData[])
  }, [top, filter, orderBy, serviceClass, fetchFunc, dataMapping, newPage])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    fetchData,
    updateData,
    updateDatum,
    updateDatumId,
    removeDatum,
    totalRecords: totalRecords.current
  }
}

export default usePaginatedData
