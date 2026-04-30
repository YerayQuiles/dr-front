import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { RideFilters } from "@/components/ride-filters"
import { RidesList } from "@/components/rides-list"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div id="viajes" className="mx-auto max-w-7xl px-4 py-8 lg:px-8 scroll-mt-4">
          <RideFilters />
          <RidesList />
        </div>
      </main>
      <Footer />
    </div>
  )
}
