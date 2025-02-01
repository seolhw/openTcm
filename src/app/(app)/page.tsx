'use client'

import { PrescriptionCard } from '@/components/prescription-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'
import { usePrescriptions } from '@/hooks/use-prescriptions'
import { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading } = usePrescriptions(currentPage)

  const prescriptions = data?.docs || []
  const totalItems = data?.totalDocs || 0
  const totalPages = data?.totalPages || 0

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    const halfVisible = Math.floor(maxVisiblePages / 2)

    let startPage = Math.max(currentPage - halfVisible, 1)
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  // const { data: searchPrescriptionsData } = useSearchPrescriptions(searchQuery)

  return (
    <div className="container mx-auto space-y-4">
      <div className="flex items-center justify-between gap-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">方剂列表</h1>
          <p className="text-sm text-muted-foreground mt-2">收录共 {totalItems} 个方剂</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-[320px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索方剂名称、包含中药名称..."
              className="pl-10 pr-4"
            />
          </div>
          <Button variant="outline" className="gap-2 px-5">
            <Filter className="h-4 w-4" />
            筛选
          </Button>
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>

          {currentPage > 2 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
              </PaginationItem>
              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {getPageNumbers().map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                onClick={() => setCurrentPage(pageNum)}
                isActive={currentPage === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={
                currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">Loading...</div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {prescriptions.map((prescription) => (
            <PrescriptionCard key={prescription.id} {...prescription} />
          ))}
        </div>
      )}
    </div>
  )
}
