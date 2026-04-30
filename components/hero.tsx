import { Button } from "@/components/ui/button"
import { Search, PlusCircle, MapPin, Users, Calendar } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-header-bg py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Comparte el viaje,{" "}
            <span className="text-primary">vive el partido</span>
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-white/70 sm:text-xl">
            Conecta con otros aficionados y comparte coche para ir a los partidos. 
            Ahorra dinero, reduce emisiones y haz nuevos amigos futboleros.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
              <Search className="h-5 w-5" />
              Buscar Viaje
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <PlusCircle className="h-5 w-5" />
              Publicar Viaje
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-primary">
                <Users className="h-5 w-5" />
                <span className="text-2xl font-bold sm:text-3xl">12K+</span>
              </div>
              <span className="mt-1 text-sm text-white/60">Usuarios activos</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-5 w-5" />
                <span className="text-2xl font-bold sm:text-3xl">850+</span>
              </div>
              <span className="mt-1 text-sm text-white/60">Ciudades</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-primary">
                <Calendar className="h-5 w-5" />
                <span className="text-2xl font-bold sm:text-3xl">45K+</span>
              </div>
              <span className="mt-1 text-sm text-white/60">Viajes realizados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
