import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { RideFilters } from "@/components/ride-filters"
import { RidesList } from "@/components/rides-list"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <RideFilters />
          <RidesList />
        </div>
      </main>
    </div>
  )
}
