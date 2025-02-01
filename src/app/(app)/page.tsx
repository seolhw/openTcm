'use client'

import { PrescriptionCard } from '@/components/prescription-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, Loader2, ArrowUp } from 'lucide-react'
import { usePrescriptions } from '@/hooks/use-prescriptions'
import { useState, useEffect } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Prescription } from '@/payload-types'
import { useDebounce } from 'use-debounce'

export default function Home() {
  // const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const { data, isLoading } = usePrescriptions(debouncedSearchQuery)

  const prescriptions = data?.docs || []
  const totalItems = data?.totalDocs || 0

  useEffect(() => {
    const handleScroll = () => {
      // 当页面滚动超过 300px 时显示按钮
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="container mx-auto space-y-4 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">方剂列表</h1>
          <p className="text-sm text-muted-foreground mt-2">共 {totalItems} 个方剂</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="relative w-full sm:w-[320px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索方剂名称..."
              className="pl-10 pr-4"
            />
          </div>
          {/* <Button variant="outline" className="gap-2 px-5">
            <Filter className="h-4 w-4" />
            筛选
          </Button> */}
        </div>
      </div>

      {/* <div className="overflow-x-auto">
        <Pagination>
          <PaginationContent className="overflow-x-auto px-2">
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
      </div> */}

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {(prescriptions as Prescription[]).map((prescription, index) => (
            <PrescriptionCard
              keywords={[searchQuery]}
              index={index + 1}
              key={prescription.id}
              {...prescription}
            />
          ))}
        </div>
      )}

      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={scrollToTop}
          aria-label="返回顶部"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
