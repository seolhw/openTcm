import useSWR from 'swr'
import { search } from '@/lib/api'
import { useState, useEffect } from 'react'

export interface SearchParams {
  query: string[]
  fields: string[]
  page: number
  limit: number
  collection: 'prescription' | 'tmc'
}

export function useSearch({ query, fields, page, limit, collection }: SearchParams) {
  const [accumulatedDocs, setAccumulatedDocs] = useState<any[]>([])

  const { data, isLoading } = useSWR(
    query.length ? ['search', query.join(' '), fields, page, collection] : null,
    async () => {
      const result = await search({
        query,
        fields,
        page,
        limit,
        collection,
      })
      return result
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setAccumulatedDocs(data.docs)
      } else {
        setAccumulatedDocs((prev) => [...prev, ...data.docs])
      }
    }
  }, [data, page])

  return {
    data: {
      ...data,
      docs: accumulatedDocs,
    },
    isLoading,
  }
}
