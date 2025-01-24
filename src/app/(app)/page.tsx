'use client'

import { PrescriptionCard } from '@/components/prescription-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'
import { usePrescriptions } from '@/hooks/use-prescriptions'

export default function Home() {
  const { data: prescriptions, isLoading } = usePrescriptions()

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>

  return (
    <div className="container mx-auto space-y-10">
      <div className="flex items-center justify-between gap-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">处方列表</h1>
          <p className="text-sm text-muted-foreground mt-2">共 {prescriptions?.length} 个处方</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-[320px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索处方名称、症状、功效..." className="pl-10 pr-4" />
          </div>
          <Button variant="outline" className="gap-2 px-5">
            <Filter className="h-4 w-4" />
            筛选
          </Button>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {prescriptions?.map((prescription) => (
          <PrescriptionCard key={prescription.id} {...prescription} />
        ))}
      </div>
    </div>
  )
}
