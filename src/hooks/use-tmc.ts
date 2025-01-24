import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useToast } from './use-toast'
import { Prescription } from '@/payload-types'
import { GetOrCreateCollectionsResult } from '@/payload-types-more'
import { getTmcs } from '@/lib/api'

// 获取处方列表
export function useTmcs(page: number) {
  return useSWR(`tmcs-${page}`, async () => {
    const result = await getTmcs(page)
    return result
  })
}
