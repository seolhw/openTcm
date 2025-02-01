import Layout from '@/components/layout'
import '@/global.css'

export const metadata = {
  title: 'OpenTcm',
  description: 'OpenTcm',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-title" content="OpenTcm" />
        <title>OpenTcm</title>
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
