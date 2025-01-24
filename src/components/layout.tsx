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
} from './ui/sidebar'
import { Toaster } from './ui/toaster'
import { Home, Book, Search } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen bg-background/95">
        <Sidebar className="border-r border-border/50">
          <SidebarHeader className="border-b border-border/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">中医处方系统</h2>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="p-2">
              <SidebarGroupLabel className="px-3 py-2">
                <span className="text-xs font-medium text-muted-foreground/70">导航</span>
              </SidebarGroupLabel>
              <SidebarMenu className="space-y-1">
                <SidebarMenuButton asChild>
                  <Link href="/" className="gap-3 px-4 py-2">
                    <Home className="h-4 w-4" />
                    <span>首页</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/prescriptions" className="gap-3 px-4 py-2">
                    <Book className="h-4 w-4" />
                    <span>处方库</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link href="/search" className="gap-3 px-4 py-2">
                    <Search className="h-4 w-4" />
                    <span>搜索</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="h-full px-8 pt-4">{children}</div>
        </main>

        <Toaster />
      </div>
    </SidebarProvider>
  )
}
