'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, ArrowUp, Loader2 } from 'lucide-react'
import { useTmcs } from '@/hooks/use-tmc'
import { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { HerbCard } from '@/components/herb-card'
import { Tmc } from '@/payload-types'
import { useDebounce } from 'use-debounce'

export default function TmcPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  const [showScrollTop, setShowScrollTop] = useState(false)

  const { data, isLoading } = useTmcs(debouncedSearchQuery)

  const tmcsData = data?.docs || []
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
          <h1 className="text-2xl font-semibold tracking-tight">中药列表</h1>
          <p className="text-sm text-muted-foreground mt-2">共 {totalItems} 个中药</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="relative w-full sm:w-[320px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索中药名称..."
              className="pl-10 pr-4"
            />
          </div>
          {/* <Button variant="outline" className="gap-2 px-5">
            <Filter className="h-4 w-4" />
            筛选
          </Button> */}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {(tmcsData as Tmc[]).map((tmc, index) => (
            <HerbCard key={tmc.id} {...tmc} index={index + 1} />
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
