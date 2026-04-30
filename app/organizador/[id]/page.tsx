"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Trophy,
  Star,
  Users,
  MapPin,
  Calendar,
  Clock,
  Euro,
  Car,
  Bus,
  Building2,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

type VehicleType = "car" | "van" | "minibus" | "bus"

interface OrganizerTrip {
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamCrest?: string
  awayTeamCrest?: string
  matchDate: string
  departureCity: string
  departureTime: string
  availableSeats: number
  totalSeats: number
  price?: number
  vehicleType: VehicleType
}

interface Organizer {
  id: string
  name: string
  type: "person" | "organization"
  avatar?: string
  isTop: boolean
  rating: number
  totalTrips: number
  activeTrips: OrganizerTrip[]
}

const teamCrests: Record<string, string> = {
  "Real Madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  "FC Barcelona": "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
  "Atlético Madrid": "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
  "Sevilla FC": "https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg",
}

// Mock organizer data
const mockOrganizer: Organizer = {
  id: "org-1",
  name: "Carlos García",
  type: "person",
  avatar: undefined,
  isTop: true,
  rating: 4.9,
  totalTrips: 47,
  activeTrips: [
    {
      id: "1",
      homeTeam: "Real Madrid",
      awayTeam: "FC Barcelona",
      homeTeamCrest: teamCrests["Real Madrid"],
      awayTeamCrest: teamCrests["FC Barcelona"],
      matchDate: "15 Dic 2024",
      departureCity: "Valencia",
      departureTime: "14:00",
      availableSeats: 2,
      totalSeats: 4,
      price: 25,
      vehicleType: "car",
    },
    {
      id: "2",
      homeTeam: "Atlético Madrid",
      awayTeam: "Sevilla FC",
      homeTeamCrest: teamCrests["Atlético Madrid"],
      awayTeamCrest: teamCrests["Sevilla FC"],
      matchDate: "22 Dic 2024",
      departureCity: "Valencia",
      departureTime: "10:00",
      availableSeats: 5,
      totalSeats: 8,
      price: 30,
      vehicleType: "minibus",
    },
  ],
}

// Mock for organizer with no trips
const mockEmptyOrganizer: Organizer = {
  id: "org-2",
  name: "Peña Valenciana",
  type: "organization",
  avatar: undefined,
  isTop: false,
  rating: 0,
  totalTrips: 0,
  activeTrips: [],
}

export default function OrganizerProfilePage() {
  const params = useParams()
  
  // In a real app, fetch organizer data based on params.id
  const organizer = params.id === "org-2" ? mockEmptyOrganizer : mockOrganizer

  const getSeatsColor = (seats: number) => {
    if (seats === 0) return "bg-seats-full text-white"
    if (seats <= 5) return "bg-seats-low text-foreground"
    return "bg-seats-available text-white"
  }

  const getSeatsText = (seats: number) => {
    if (seats === 0) return "Completo"
    return `${seats} plazas`
  }

  const getVehicleInfo = (type: VehicleType) => {
    const vehicles = {
      car: { icon: Car, label: "Coche" },
      van: { icon: Car, label: "Furgoneta" },
      minibus: { icon: Bus, label: "Minibús" },
      bus: { icon: Bus, label: "Autobús" },
    }
    return vehicles[type]
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-6">
          {/* Back Button */}
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a viajes
          </Link>

          {/* Organizer Header Card */}
          <Card className="mb-8 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-card shadow-lg">
                    <AvatarImage src={organizer.avatar} alt={organizer.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      {organizer.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {organizer.isTop && (
                    <div className="absolute -right-1 -top-1 rounded-full bg-yellow-500 p-1.5 shadow-md">
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-3">
                    <h1 className="text-2xl font-bold text-card-foreground">
                      {organizer.name}
                    </h1>
                    {organizer.isTop && (
                      <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
                        <Trophy className="h-3 w-3 mr-1" />
                        Organizador Top
                      </Badge>
                    )}
                  </div>

                  {/* Account Type */}
                  <div className="mt-2 flex items-center justify-center gap-2 sm:justify-start">
                    {organizer.type === "organization" ? (
                      <>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Organización</span>
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Persona</span>
                      </>
                    )}
                  </div>

                  {/* Rating - MVP placeholder */}
                  <div className="mt-4 flex items-center justify-center gap-4 sm:justify-start">
                    <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                      <Star className={cn(
                        "h-4 w-4",
                        organizer.rating > 0 
                          ? "fill-yellow-500 text-yellow-500" 
                          : "text-muted-foreground"
                      )} />
                      {organizer.rating > 0 ? (
                        <span className="text-sm font-medium">
                          {organizer.rating.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Sin valoraciones
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Car className="h-4 w-4" />
                      <span>{organizer.totalTrips} viajes organizados</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Trips Section */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Viajes publicados
            </h2>

            {organizer.activeTrips.length > 0 ? (
              <div className="space-y-4">
                {organizer.activeTrips.map((trip) => {
                  const vehicleInfo = getVehicleInfo(trip.vehicleType)
                  const VehicleIcon = vehicleInfo.icon

                  return (
                    <Card key={trip.id} className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/30">
                      <CardContent className="p-0">
                        <div className="flex flex-col lg:flex-row">
                          {/* Match Info */}
                          <div className="flex-1 p-5">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                {/* Match with Team Crests */}
                                <div className="flex items-center gap-3">
                                  {/* Home Team */}
                                  <div className="flex items-center gap-2">
                                    {trip.homeTeamCrest && (
                                      <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-border bg-white shadow-sm">
                                        <Image
                                          src={trip.homeTeamCrest}
                                          alt={trip.homeTeam}
                                          fill
                                          className="object-contain p-0.5"
                                        />
                                      </div>
                                    )}
                                    <span className="text-lg font-bold text-card-foreground">{trip.homeTeam}</span>
                                  </div>
                                  
                                  <span className="text-muted-foreground font-medium">vs</span>
                                  
                                  {/* Away Team */}
                                  <div className="flex items-center gap-2">
                                    {trip.awayTeamCrest && (
                                      <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-border bg-white shadow-sm">
                                        <Image
                                          src={trip.awayTeamCrest}
                                          alt={trip.awayTeam}
                                          fill
                                          className="object-contain p-0.5"
                                        />
                                      </div>
                                    )}
                                    <span className="text-lg font-bold text-card-foreground">{trip.awayTeam}</span>
                                  </div>
                                </div>
                                
                                {/* Trip Details */}
                                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span>Desde {trip.departureCity}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span>{trip.matchDate}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span>{trip.departureTime}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
                                    <VehicleIcon className="h-4 w-4 text-primary" />
                                    <span className="font-medium text-secondary-foreground">{vehicleInfo.label}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Seats Badge */}
                              <div className={cn(
                                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold",
                                getSeatsColor(trip.availableSeats)
                              )}>
                                <Users className="h-4 w-4" />
                                {getSeatsText(trip.availableSeats)}
                              </div>
                            </div>
                          </div>

                          {/* Price & Action Section */}
                          <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border bg-muted/30 p-5 lg:w-56">
                            {/* Price */}
                            {trip.price !== undefined && (
                              <div className="flex items-center gap-1 text-lg font-bold text-card-foreground">
                                <Euro className="h-5 w-5 text-primary" />
                                <span>{trip.price}</span>
                                <span className="text-sm font-normal text-muted-foreground">/persona</span>
                              </div>
                            )}

                            {/* Action */}
                            <Link href={`/viaje/${trip.id}`} className="mt-4">
                              <Button 
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                disabled={trip.availableSeats === 0}
                              >
                                Ver viaje
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              /* Empty State */
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-card-foreground mb-2">
                    Sin viajes activos
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Este organizador no tiene viajes publicados actualmente. 
                    Vuelve a consultar más adelante.
                  </p>
                  <Link href="/" className="mt-6">
                    <Button variant="outline">
                      Explorar otros viajes
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
