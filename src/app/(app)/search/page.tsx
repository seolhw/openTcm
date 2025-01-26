'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { useState, KeyboardEvent } from 'react'
import { useDebounce } from 'use-debounce'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PrescriptionCard } from '@/components/prescription-card'
import { HerbCard } from '@/components/herb-card'
import { useSearch } from '@/hooks/use-search'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Prescription, Tmc } from '@/payload-types'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import { Badge } from '@/components/ui/badge'

type SearchType = 'prescription' | 'tmc'

interface AdvancedSearchParams {
  type: SearchType
  searchFields: string[]
}

const prescriptionFields = ['name', 'composition', 'mainIndication'] as const
const tmcFields = ['name', 'taste', 'meridian'] as const

export default function SearchPage() {
  const [searchInput, setSearchInput] = useState('')
  const [searchTags, setSearchTags] = useState<string[]>([])

  // const [searchQuery] = useDebounce(searchTags.join(' '), 500)

  const [currentPage, setCurrentPage] = useState(1)
  const [advancedParams, setAdvancedParams] = useState<AdvancedSearchParams>({
    type: 'prescription',
    searchFields: ['name', 'composition', 'mainIndication', 'taste', 'meridian'],
  })

  // 将搜索词按空格分割成数组
  const searchKeywords = searchTags.map((tag) => tag.toLowerCase())

  const { data: currentData, isLoading } = useSearch({
    query: searchKeywords,
    fields: advancedParams.searchFields,
    page: currentPage,
    limit: 9,
    collection: advancedParams.type as 'prescription' | 'tmc',
  })

  // 根据当前搜索类型获取相应的数据
  const items = currentData?.docs || []
  const totalItems = currentData?.totalDocs || 0
  const totalPages = currentData?.totalPages || 0

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

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      e.preventDefault()
      // 添加新标签并清空输入
      setSearchTags((prev) => [...new Set([...prev, searchInput.trim()])])
      setSearchInput('')
    } else if (e.key === 'Backspace' && !searchInput && searchTags.length > 0) {
      // 当输入框为空时，删除最后一个标签
      setSearchTags((prev) => prev.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setSearchTags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  const clearSearch = () => {
    setSearchInput('')
    setSearchTags([])
    setCurrentPage(1)
  }

  const handleSelectAll = (checked: boolean) => {
    const fields = advancedParams.type === 'prescription' ? prescriptionFields : tmcFields
    setAdvancedParams((prev) => ({
      ...prev,
      searchFields: checked ? [...fields] : [],
    }))
  }

  const isAllSelected = () => {
    const fields = advancedParams.type === 'prescription' ? prescriptionFields : tmcFields
    return fields.every((field) => advancedParams.searchFields.includes(field))
  }

  const isIndeterminate = () => {
    const fields = advancedParams.type === 'prescription' ? prescriptionFields : tmcFields
    const selectedCount = fields.filter((field) =>
      advancedParams.searchFields.includes(field),
    ).length
    return selectedCount > 0 && selectedCount < fields.length
  }

  // 切换搜索类型时重置页码
  const handleTypeChange = (value: SearchType) => {
    setAdvancedParams((prev) => ({ ...prev, type: value, searchFields: ['name'] }))
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">搜索</h1>
          <p className="text-sm text-muted-foreground">
            搜索中医处方和中药信息（按回车添加多个关键词）
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={searchTags.length ? '继续输入关键词...' : '搜索处方名称、中药名称...'}
              className="pl-10 pr-10"
            />
            {(searchInput || searchTags.length > 0) && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-transparent"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {searchTags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {searchTags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="px-2 py-1 text-sm gap-1.5">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Accordion type="single" collapsible className="w-full border rounded-lg">
          <AccordionItem value="advanced-search" className="border-none">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
              <span className="text-sm font-medium">高级搜索选项</span>
            </AccordionTrigger>
            <AccordionContent>
              <Separator className="mb-4" />
              <div className="space-y-6 px-4 pb-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">搜索类型</Label>
                  <RadioGroup
                    value={advancedParams.type}
                    onValueChange={handleTypeChange}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prescription" id="prescription" />
                      <Label htmlFor="prescription" className="font-normal">
                        处方
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tmc" id="tmc" />
                      <Label htmlFor="tmc" className="font-normal">
                        中药
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">搜索字段</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all"
                        checked={isAllSelected()}
                        onCheckedChange={handleSelectAll}
                      />
                      <Label htmlFor="select-all" className="text-sm font-normal">
                        全选
                      </Label>
                    </div>
                  </div>
                  {advancedParams.type === 'prescription' ? (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="name"
                          checked={advancedParams.searchFields.includes('name')}
                          onCheckedChange={(checked) => {
                            const fields = checked
                              ? [...advancedParams.searchFields, 'name']
                              : advancedParams.searchFields.filter((f) => f !== 'name')
                            setAdvancedParams((prev) => ({ ...prev, searchFields: fields }))
                          }}
                        />
                        <Label htmlFor="name" className="font-normal">
                          方剂名称
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="composition"
                          checked={advancedParams.searchFields.includes('composition')}
                          onCheckedChange={(checked) => {
                            const fields = checked
                              ? [...advancedParams.searchFields, 'composition']
                              : advancedParams.searchFields.filter((f) => f !== 'composition')
                            setAdvancedParams((prev) => ({ ...prev, searchFields: fields }))
                          }}
                        />
                        <Label htmlFor="composition" className="font-normal">
                          药物组成
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mainIndication"
                          checked={advancedParams.searchFields.includes('mainIndication')}
                          onCheckedChange={(checked) => {
                            const fields = checked
                              ? [...advancedParams.searchFields, 'mainIndication']
                              : advancedParams.searchFields.filter((f) => f !== 'mainIndication')
                            setAdvancedParams((prev) => ({ ...prev, searchFields: fields }))
                          }}
                        />
                        <Label htmlFor="mainIndication" className="font-normal">
                          主治
                        </Label>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="name"
                          checked={advancedParams.searchFields.includes('name')}
                          onCheckedChange={(checked) => {
                            const fields = checked
                              ? [...advancedParams.searchFields, 'name']
                              : advancedParams.searchFields.filter((f) => f !== 'name')
                            setAdvancedParams((prev) => ({ ...prev, searchFields: fields }))
                          }}
                        />
                        <Label htmlFor="name" className="font-normal">
                          药材名称
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="taste"
                          checked={advancedParams.searchFields.includes('taste')}
                          onCheckedChange={(checked) => {
                            const fields = checked
                              ? [...advancedParams.searchFields, 'taste']
                              : advancedParams.searchFields.filter((f) => f !== 'taste')
                            setAdvancedParams((prev) => ({ ...prev, searchFields: fields }))
                          }}
                        />
                        <Label htmlFor="taste" className="font-normal">
                          性味
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="meridian"
                          checked={advancedParams.searchFields.includes('meridian')}
                          onCheckedChange={(checked) => {
                            const fields = checked
                              ? [...advancedParams.searchFields, 'meridian']
                              : advancedParams.searchFields.filter((f) => f !== 'meridian')
                            setAdvancedParams((prev) => ({ ...prev, searchFields: fields }))
                          }}
                        />
                        <Label htmlFor="meridian" className="font-normal">
                          归经
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {searchTags.length > 0 && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>

            {currentPage > 1 && !getPageNumbers().includes(1) && (
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
              </PaginationItem>
            )}

            {currentPage > 2 && !getPageNumbers().includes(2) && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
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

            {currentPage < totalPages - 1 && !getPageNumbers().includes(totalPages - 1) && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {currentPage < totalPages && !getPageNumbers().includes(totalPages) && (
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
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
      )}

      {searchTags.length > 0 && totalItems === 0 && !isLoading && (
        <div className="flex items-center justify-center h-40">
          <p className="text-sm text-muted-foreground">未找到相关结果</p>
        </div>
      )}

      {searchTags.length > 0 && isLoading && (
        <div className="flex items-center justify-center h-40">
          <p className="text-sm text-muted-foreground">加载中...</p>
        </div>
      )}

      {searchTags.length > 0 && totalItems > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">
              {advancedParams.type === 'prescription' ? '处方搜索结果' : '中药搜索结果'}
            </h2>
            <span className="text-sm text-muted-foreground">找到 {totalItems} 个结果</span>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {advancedParams.type === 'prescription'
              ? (items as Prescription[]).map((prescription: Prescription) => (
                  <PrescriptionCard
                    key={prescription.id}
                    {...prescription}
                    keywords={searchKeywords}
                  />
                ))
              : (items as Tmc[]).map((tmc: Tmc) => (
                  <HerbCard key={tmc.id} {...tmc} keywords={searchKeywords} />
                ))}
          </div>
        </div>
      )}
    </div>
  )
}
