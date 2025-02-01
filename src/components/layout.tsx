'use client'

import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from './ui/sidebar'
import { Home, Book, Search, LibraryBig, Flower2 } from 'lucide-react'
import { AppProvider } from '@/providers/app-provider'
import { PWAPrompt } from './pwa-prompt'
import { Separator } from './ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { usePathname } from 'next/navigation'

export const SidebarMenuLink = () => {
  const { toggleSidebar } = useSidebar()
  return (
    <SidebarMenu className="space-y-1" onClick={() => toggleSidebar()}>
      <SidebarMenuButton asChild>
        <Link href="/" className="gap-3 px-4 py-2">
          <Flower2 className="h-4 w-4" />
          <span>方剂库</span>
        </Link>
      </SidebarMenuButton>
      <SidebarMenuButton asChild>
        <Link href="/tmc" className="gap-3 px-4 py-2">
          <LibraryBig className="h-4 w-4" />
          <span>中药库</span>
        </Link>
      </SidebarMenuButton>
      <SidebarMenuButton asChild>
        <Link href="/search" className="gap-3 px-4 py-2">
          <Search className="h-4 w-4" />
          <span>高级搜索</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenu>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const pageName = pathname.split('/').reverse()?.[0]

  const title = pageName === 'search' ? '高级搜索' : pageName === 'tmc' ? '中药库' : '方剂库'

  return (
    <AppProvider>
      <SidebarProvider>
        <div className="relative flex min-h-screen bg-background/95 w-full">
          <Sidebar className="border-r border-border/50">
            <SidebarHeader className="border-b border-border/50 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-tight">中医方剂数据库</h2>
                {/* <SidebarTrigger /> */}
              </div>
            </SidebarHeader>
            <SidebarContent className="w-full">
              <SidebarGroup className="p-2">
                <SidebarGroupLabel className="px-3 py-2">
                  <span className="text-xs font-medium text-muted-foreground/70">导航</span>
                </SidebarGroupLabel>
                <SidebarMenuLink />
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <main className="flex-1 overflow-auto w-full">
            <div className="h-full w-full">
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                      <BreadcrumbList>
                        {/* <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href="#">首页</BreadcrumbLink>
                        </BreadcrumbItem> */}
                        {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                        <BreadcrumbItem>
                          <BreadcrumbPage>{title}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                  {children}
                  {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
                </div>
              </SidebarInset>
            </div>
          </main>
          <PWAPrompt />
        </div>
      </SidebarProvider>
    </AppProvider>
  )
}
