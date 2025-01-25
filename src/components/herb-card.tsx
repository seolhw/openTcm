import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Share2, BookmarkPlus } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Tmc } from '@/payload-types'
import { HighlightText } from './highlight-text'

interface HerbCardProps extends Tmc {
  keywords?: string[]
}

export function HerbCard({ name, taste, meridian, keywords = [], ...props }: HerbCardProps) {
  return (
    <Card className="w-full group hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between pb-4 pt-5 px-6">
        <CardTitle className="text-xl font-medium tracking-tight">
          <HighlightText text={name} keywords={keywords} />
        </CardTitle>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 hover:bg-primary/10">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">分享药材</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 hover:bg-primary/10">
                  <BookmarkPlus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">收藏药材</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-6 pb-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground/80 mb-2">性味</h4>
          <p className="text-sm leading-relaxed text-foreground/90">
            <HighlightText text={taste} keywords={keywords} />
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground/80 mb-2">归经</h4>
          <p className="text-sm leading-relaxed text-foreground/90">
            <HighlightText text={meridian} keywords={keywords} />
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
