import useSWR from 'swr'
import { search } from '@/lib/api'

export interface SearchParams {
  query: string[]
  fields: string[]
  page: number
  limit: number
  collection: 'prescription' | 'tmc'
}

export function useSearch({ query, fields, page, limit, collection }: SearchParams) {
  return useSWR(
    query ? ['search', collection, query.join(','), fields.join(','), page, limit] : null,
    async () => {
      const result = await search({ query, fields, page, limit, collection })
      return result
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: false,
    },
  )
}
