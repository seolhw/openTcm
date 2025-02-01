import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export function PWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setShowPrompt(false)
    }

    setDeferredPrompt(null)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-[360px]">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-medium">添加到主屏幕</h3>
              <p className="text-sm text-muted-foreground">安装应用到主屏幕，随时查看中医处方</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowPrompt(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowPrompt(false)}>
              暂不安装
            </Button>
            <Button size="sm" onClick={handleInstall}>
              立即安装
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
