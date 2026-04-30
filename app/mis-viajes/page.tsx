"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Calendar, Users, MapPin, ArrowRight, Car, UserCircle, Clock, AlertCircle } from "lucide-react"

type TripStatus = "upcoming" | "ongoing" | "past"
type TripRole = "passenger" | "driver"
type DriverTripStatus = "active" | "full" | "cancelled" | "completed"

interface Trip {
  id: string
  name: string
  destination: string
  destinationImage: string
  departureDate: string
  returnDate: string
  status: TripStatus
  travelers: number
  homeTeam: string
  awayTeam: string
}

// Trips where user is a passenger
const mockPassengerTrips: Trip[] = [
  {
    id: "1",
    name: "Final Copa del Rey",
    destination: "Sevilla",
    destinationImage: "/placeholder-stadium.jpg",
    departureDate: "15 Mar 2025",
    returnDate: "16 Mar 2025",
    status: "upcoming",
    travelers: 4,
    homeTeam: "Real Madrid",
    awayTeam: "Athletic Club",
  },
  {
    id: "2",
    name: "Derbi Madrileno",
    destination: "Madrid",
    destinationImage: "/placeholder-stadium.jpg",
    departureDate: "22 Feb 2025",
    returnDate: "22 Feb 2025",
    status: "ongoing",
    travelers: 3,
    homeTeam: "Atletico Madrid",
    awayTeam: "Real Madrid",
  },
  {
    id: "3",
    name: "Clasico en el Camp Nou",
    destination: "Barcelona",
    destinationImage: "/placeholder-stadium.jpg",
    departureDate: "10 Ene 2025",
    returnDate: "11 Ene 2025",
    status: "past",
    travelers: 5,
    homeTeam: "FC Barcelona",
    awayTeam: "Real Madrid",
  },
]

// Driver trips interface
interface DriverTrip {
  id: string
  name: string
  destination: string
  destinationImage: string
  departureDate: string
  returnDate: string
  status: DriverTripStatus
  homeTeam: string
  awayTeam: string
  totalSeats: number
  availableSeats: number
  pendingRequests: number
  confirmedPassengers: number
}

// Trips where user is the driver/organizer
const mockDriverTrips: DriverTrip[] = [
  {
    id: "d1",
    name: "Liga - Jornada 25",
    destination: "Valencia",
    destinationImage: "/placeholder-stadium.jpg",
    departureDate: "5 Abr 2025",
    returnDate: "5 Abr 2025",
    status: "active",
    homeTeam: "Valencia CF",
    awayTeam: "Sevilla FC",
    totalSeats: 4,
    availableSeats: 2,
    pendingRequests: 3,
    confirmedPassengers: 2,
  },
  {
    id: "d2",
    name: "Champions League",
    destination: "Paris",
    destinationImage: "/placeholder-stadium.jpg",
    departureDate: "12 Abr 2025",
    returnDate: "13 Abr 2025",
    status: "full",
    homeTeam: "PSG",
    awayTeam: "Real Madrid",
    totalSeats: 4,
    availableSeats: 0,
    pendingRequests: 5,
    confirmedPassengers: 4,
  },
  {
    id: "d3",
    name: "Supercopa de Espana",
    destination: "Riad",
    destinationImage: "/placeholder-stadium.jpg",
    departureDate: "8 Ene 2025",
    returnDate: "10 Ene 2025",
    status: "completed",
    homeTeam: "Real Madrid",
    awayTeam: "FC Barcelona",
    totalSeats: 6,
    availableSeats: 0,
    pendingRequests: 0,
    confirmedPassengers: 6,
  },
  {
    id: "d4",
    name: "Copa del Rey",
    destination: "Bilbao",
    destinationImage: "/placeholder-stadium.jpg",
    departureDate: "20 Feb 2025",
    returnDate: "20 Feb 2025",
    status: "cancelled",
    homeTeam: "Athletic Club",
    awayTeam: "Real Madrid",
    totalSeats: 4,
    availableSeats: 4,
    pendingRequests: 0,
    confirmedPassengers: 0,
  },
]

function getStatusBadge(status: TripStatus) {
  switch (status) {
    case "upcoming":
      return (
        <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
          Proximo
        </Badge>
      )
    case "ongoing":
      return (
        <Badge className="bg-seats-available text-white hover:bg-seats-available/90">
          En curso
        </Badge>
      )
    case "past":
      return (
        <Badge variant="secondary" className="text-muted-foreground">
          Pasado
        </Badge>
      )
  }
}

function getDriverStatusBadge(status: DriverTripStatus) {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-seats-available text-white hover:bg-seats-available/90">
          Activo
        </Badge>
      )
    case "full":
      return (
        <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
          Completo
        </Badge>
      )
    case "cancelled":
      return (
        <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
          Cancelado
        </Badge>
      )
    case "completed":
      return (
        <Badge variant="secondary" className="text-muted-foreground">
          Realizado
        </Badge>
      )
  }
}

function filterTrips(trips: Trip[], filter: string): Trip[] {
  if (filter === "all") return trips
  return trips.filter((trip) => {
    if (filter === "upcoming") return trip.status === "upcoming"
    if (filter === "ongoing") return trip.status === "ongoing"
    if (filter === "past") return trip.status === "past"
    return true
  })
}

function PassengerTripCard({ trip }: { trip: Trip }) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      {/* Destination Image */}
      <div className="relative h-40 w-full bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        <Image
          src={trip.destinationImage}
          alt={trip.destination}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 z-20">
          {getStatusBadge(trip.status)}
        </div>
        <div className="absolute bottom-3 left-3 z-20">
          <div className="flex items-center gap-1.5 text-white/90">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">{trip.destination}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Trip Name */}
        <h3 className="font-semibold text-card-foreground text-lg leading-tight mb-1">
          {trip.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {trip.homeTeam} vs {trip.awayTeam}
        </p>

        {/* Dates */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-4 w-4 text-primary" />
          <span>
            {trip.departureDate}
            {trip.departureDate !== trip.returnDate && (
              <>
                <ArrowRight className="inline h-3 w-3 mx-1" />
                {trip.returnDate}
              </>
            )}
          </span>
        </div>

        {/* Travelers */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Users className="h-4 w-4 text-primary" />
          <span>{trip.travelers} viajeros</span>
        </div>

        {/* Action Button */}
        <Link href={`/viaje/${trip.id}`} className="block">
          <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Ver detalles
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

function DriverTripCard({ trip }: { trip: DriverTrip }) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      {/* Destination Image */}
      <div className="relative h-40 w-full bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        <Image
          src={trip.destinationImage}
          alt={trip.destination}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 z-20">
          {getDriverStatusBadge(trip.status)}
        </div>
        <div className="absolute bottom-3 left-3 z-20">
          <div className="flex items-center gap-1.5 text-white/90">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">{trip.destination}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Trip Name */}
        <h3 className="font-semibold text-card-foreground text-lg leading-tight mb-1">
          {trip.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {trip.homeTeam} vs {trip.awayTeam}
        </p>

        {/* Dates */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-4 w-4 text-primary" />
          <span>
            {trip.departureDate}
            {trip.departureDate !== trip.returnDate && (
              <>
                <ArrowRight className="inline h-3 w-3 mx-1" />
                {trip.returnDate}
              </>
            )}
          </span>
        </div>

        {/* Seats & Requests Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            <span>{trip.confirmedPassengers}/{trip.totalSeats} plazas</span>
          </div>
          {trip.pendingRequests > 0 && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-500" />
              <span className="text-amber-600">{trip.pendingRequests} pendientes</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link href={`/viaje/${trip.id}/conductor`} className="block">
          <Button variant="outline" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Gestionar viaje
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function MisViajesPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [tripRole, setTripRole] = useState<TripRole>("passenger")

  // Filter passenger trips
  const filteredPassengerTrips = filterTrips(mockPassengerTrips, activeFilter)

  // Filter driver trips based on status
  const filteredDriverTrips = mockDriverTrips.filter((trip) => {
    if (activeFilter === "all") return true
    if (activeFilter === "upcoming") return trip.status === "active" || trip.status === "full"
    if (activeFilter === "ongoing") return trip.status === "active"
    if (activeFilter === "past") return trip.status === "completed" || trip.status === "cancelled"
    return true
  })

  const passengerTripCounts = {
    all: mockPassengerTrips.length,
    upcoming: mockPassengerTrips.filter((t) => t.status === "upcoming").length,
    ongoing: mockPassengerTrips.filter((t) => t.status === "ongoing").length,
    past: mockPassengerTrips.filter((t) => t.status === "past").length,
  }

  const driverTripCounts = {
    all: mockDriverTrips.length,
    upcoming: mockDriverTrips.filter((t) => t.status === "active" || t.status === "full").length,
    ongoing: mockDriverTrips.filter((t) => t.status === "active").length,
    past: mockDriverTrips.filter((t) => t.status === "completed" || t.status === "cancelled").length,
  }

  const tripCounts = tripRole === "passenger" ? passengerTripCounts : driverTripCounts

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mis viajes</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona y revisa todos tus viajes a partidos
            </p>
          </div>
          <Link href="/publicar">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo viaje
            </Button>
          </Link>
        </div>

        {/* Role Selector + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          {/* Role Selector */}
          <Select value={tripRole} onValueChange={(value: TripRole) => setTripRole(value)}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Selecciona rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="passenger">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  <span>Como pasajero</span>
                </div>
              </SelectItem>
              <SelectItem value="driver">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  <span>Como conductor</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filters */}
          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="flex-1">
            <TabsList className="grid w-full grid-cols-4 sm:w-auto sm:inline-flex">
              <TabsTrigger value="all" className="gap-1.5">
                Todos
                <span className="hidden sm:inline text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">
                  {tripCounts.all}
                </span>
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="gap-1.5">
                {tripRole === "driver" ? "Activos" : "Proximos"}
                <span className="hidden sm:inline text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">
                  {tripCounts.upcoming}
                </span>
              </TabsTrigger>
              <TabsTrigger value="ongoing" className="gap-1.5">
                En curso
                <span className="hidden sm:inline text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">
                  {tripCounts.ongoing}
                </span>
              </TabsTrigger>
              <TabsTrigger value="past" className="gap-1.5">
                {tripRole === "driver" ? "Finalizados" : "Pasados"}
                <span className="hidden sm:inline text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">
                  {tripCounts.past}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Trip Grid - Passenger View */}
        {tripRole === "passenger" && (
          <>
            {filteredPassengerTrips.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPassengerTrips.map((trip) => (
                  <PassengerTripCard key={trip.id} trip={trip} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No hay viajes en esta categoria
                </h3>
                <p className="text-muted-foreground mb-6">
                  {activeFilter === "upcoming" && "No tienes viajes proximos programados"}
                  {activeFilter === "ongoing" && "No tienes ningun viaje en curso"}
                  {activeFilter === "past" && "Aun no has realizado ningun viaje"}
                  {activeFilter === "all" && "No tienes viajes como pasajero"}
                </p>
                <Link href="/">
                  <Button variant="outline" className="gap-2">
                    <MapPin className="h-4 w-4" />
                    Buscar viajes
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}

        {/* Trip Grid - Driver View */}
        {tripRole === "driver" && (
          <>
            {filteredDriverTrips.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDriverTrips.map((trip) => (
                  <DriverTripCard key={trip.id} trip={trip} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Car className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No hay viajes en esta categoria
                </h3>
                <p className="text-muted-foreground mb-6">
                  {activeFilter === "upcoming" && "No tienes viajes activos o completos"}
                  {activeFilter === "ongoing" && "No tienes ningun viaje en curso"}
                  {activeFilter === "past" && "No tienes viajes finalizados o cancelados"}
                  {activeFilter === "all" && "No has publicado ningun viaje como conductor"}
                </p>
                <Link href="/publicar">
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Publicar viaje
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
