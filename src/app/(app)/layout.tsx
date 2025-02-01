import Layout from '@/components/layout'
import '@/global.css'

export const metadata = {
  title: 'OpenTcm - 中医方剂数据库',
  description: '开放中医药数据库，提供中草药、方剂查询和学习',
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
