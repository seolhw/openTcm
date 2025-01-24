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
          <SidebarHeader className="border-b border-border/50 px-5 py-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">中医处方系统</h2>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                <span className="text-xs font-medium text-muted-foreground/70">导航</span>
              </SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuButton asChild>
                  <a href="/" className="gap-3">
                    <Home className="h-4 w-4" />
                    <span>首页</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <a href="/prescriptions" className="gap-3">
                    <Book className="h-4 w-4" />
                    <span>处方库</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <a href="/search" className="gap-3">
                    <Search className="h-4 w-4" />
                    <span>搜索</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="h-full pb-8">{children}</div>
        </main>

        <Toaster />
      </div>
    </SidebarProvider>
  )
}
