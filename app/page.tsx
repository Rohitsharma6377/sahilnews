import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { FeaturedGrid } from '@/components/FeaturedGrid'
import { LatestFeed } from '@/components/LatestFeed'
import { dbGetFeatured, dbGetLatest } from '@/lib/repo/articles'
import { NewsSlider } from '@/components/NewsSlider'
import { NewsletterModal } from '@/components/NewsletterModal'
import { CategoryShowcase } from '@/components/CategoryShowcase'

export default async function HomePage() {
  const [featured, latest] = await Promise.all([dbGetFeatured(), dbGetLatest()])
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NewsSlider items={featured as any} />
        <CategoryShowcase articles={latest} />
        <FeaturedGrid articles={featured} />
        <LatestFeed articles={latest} />
        <NewsletterModal />
      </main>
      <Footer />
    </>
  )
}
