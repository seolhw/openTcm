import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useToast } from './use-toast'
import { Prescription } from '@/payload-types'
import { GetOrCreateCollectionsResult } from '@/payload-types-more'
import { getTmcs, search } from '@/lib/api'

// 获取方剂列表
export function useTmcs(query: string) {
  return useSWR(`tmcs-${query}`, async () => {
    const result = await search({
      page: 1,
      limit: 50,
      collection: 'tmc',
      query: [query],
      fields: ['name'],
    })
    return result
  })
}

// 搜索中药
// export function useSearchTmcs(query: string) {
//   return useSWR(query ? ['search-tmcs', query] : null, async () => {
//     const result = await searchTmcs(query)
//     return result.docs
//   })
// }
