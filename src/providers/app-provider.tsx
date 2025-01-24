import { SWRConfig } from 'swr'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import { swrConfig } from '@/lib/swr-config'

interface AppProviderProps {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <SWRConfig value={swrConfig}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <Toaster />
      </ThemeProvider>
    </SWRConfig>
  )
}
