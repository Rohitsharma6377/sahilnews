import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { BentoGrid, FeaturedGrid } from '@/components/FeaturedGridContainer'
import { LatestFeed } from '@/components/LatestFeed'
import {
  dbGetFeatured,
  dbGetLatest,
  dbGetByCategory,
} from '@/lib/repo/articles'
import { NewsletterModal } from '@/components/NewsletterModal'
import { TopBar } from '@/components/TopBar'
import { SidebarList } from '@/components/SidebarList'
import { SubscribeCard } from '@/components/SubscribeCard'
import { CategoryBanner } from '@/components/CategoryBanner'

export default async function HomePage() {
  const [featured, latest, tech, stateNews, sports] = await Promise.all([
    dbGetFeatured(),
    dbGetLatest(),
    dbGetByCategory('technology'),
    dbGetByCategory('state-news'),
    dbGetByCategory('sports'),
  ])
  return (
    <>
      <Header />
      <TopBar />
      <main>
        <Hero items={featured as any} />
        <div className="container py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-3">
              <CategoryBanner items={featured as any} title="Featured" />
            </div>
            <div className="lg:col-span-2 space-y-8">
              <BentoGrid articles={latest} />
            </div>
            <div className="space-y-8">
              <SidebarList
                title="State News latest"
                items={(stateNews || []).slice(0, 5) as any}
              />
              <SidebarList
                title="Sports latest"
                items={(sports || []).slice(0, 5) as any}
              />
              <SubscribeCard />
            </div>
          </div>
        </div>
        <NewsletterModal />
      </main>
      <FeaturedGrid articles={featured} />
      <LatestFeed articles={latest} />
      <Footer />
    </>
  )
}
