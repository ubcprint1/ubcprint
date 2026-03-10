import { ProductsPricing } from '@/components/products-pricing'
import { NotificationsDropdown } from '@/components/notifications-dropdown'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/accounting">
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">التسعير والمنتجات</h1>
            </div>
            <div className="flex items-center gap-4">
              <NotificationsDropdown />
              <span className="text-sm text-muted-foreground">مرحباً، أحمد</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <ProductsPricing />
      </main>
    </div>
  )
}
