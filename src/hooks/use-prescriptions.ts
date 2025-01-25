import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useToast } from './use-toast'
import { Prescription } from '@/payload-types'
import { getPrescriptions, getPrescription, createPrescription, search } from '@/lib/api'
import { GetOrCreateCollectionsResult } from '@/payload-types-more'

// 获取处方列表
export function usePrescriptions(page: number) {
  return useSWR(
    `prescriptions-${page}`,
    async () => {
      const result = await getPrescriptions(page)
      return result
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      // revalidateOnMount: false,
      // revalidateOnRevalidate: false,
    },
  )
}

// 获取处方
export function usePrescription(prescriptionId: string) {
  return useSWR(prescriptionId ? ['prescription', prescriptionId] : null, async () => {
    const result = await getPrescription(prescriptionId)
    return result.doc
  })
}

// 创建处方
export function useCreatePrescription() {
  const { toast } = useToast()

  return useSWRMutation(
    'create-prescription',
    (
      key,
      {
        arg,
      }: {
        arg: Partial<Prescription> & {
          community_slug: string
        }
      },
    ) => createPrescription(arg),
    {
      onSuccess: (data: GetOrCreateCollectionsResult<Prescription>) => {
        toast({
          title: '创建成功',
          description: `处方 ${data.doc.name} 已创建`,
        })
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: '创建失败',
          description: error || '请稍后重试',
        })
      },
    },
  )
}
