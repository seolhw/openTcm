import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useToast } from './use-toast'
import { Prescription } from '@/payload-types'
import { getPrescriptions, getPrescription, createPrescription } from '@/lib/api'
import { GetOrCreateCollectionsResult } from '@/payload-types-more'

// 获取帖子列表
export function usePrescriptions() {
  return useSWR('prescriptions', async () => {
    const result = await getPrescriptions()
    return result.docs
  })
}

// 获取单个帖子
export function usePrescription(prescriptionId: string) {
  return useSWR(prescriptionId ? ['prescription', prescriptionId] : null, async () => {
    const result = await getPrescription(prescriptionId)
    return result.doc
  })
}

// 创建帖子
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
