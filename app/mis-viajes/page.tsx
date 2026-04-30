"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Plus, Calendar, Users, MapPin, ArrowRight } from "lucide-react"

type TripStatus = "upcoming" | "ongoing" | "past"

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

const mockTrips: Trip[] = [
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
    name: "Derbi Madrileño",
    destination: "Madrid",
    destinationImage: "/placeholder-stadium.jpg",
    departureDate: "22 Feb 2025",
    returnDate: "22 Feb 2025",
    status: "ongoing",
    travelers: 3,
    homeTeam: "Atlético Madrid",
    awayTeam: "Real Madrid",
  },
  {
    id: "3",
    name: "Clásico en el Camp Nou",
    destination: "Barcelona",
    destinationImage: "/placeholder-stadium.jpg",
    departureDate: "10 Ene 2025",
    returnDate: "11 Ene 2025",
    status: "past",
    travelers: 5,
    homeTeam: "FC Barcelona",
    awayTeam: "Real Madrid",
  },
  {
    id: "4",
    name: "Liga - Jornada 25",
    destination: "Valencia",
    destinationImage: "/placeholder-stadium.jpg",
    departureDate: "5 Abr 2025",
    returnDate: "5 Abr 2025",
    status: "upcoming",
    travelers: 2,
    homeTeam: "Valencia CF",
    awayTeam: "Sevilla FC",
  },
  {
    id: "5",
    name: "Champions League",
    destination: "París",
    destinationImage: "/placeholder-stadium.jpg",
    departureDate: "8 Dic 2024",
    returnDate: "9 Dic 2024",
    status: "past",
    travelers: 6,
    homeTeam: "PSG",
    awayTeam: "Real Madrid",
  },
]

function getStatusBadge(status: TripStatus) {
  switch (status) {
    case "upcoming":
      return (
        <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
          Próximo
        </Badge>
      )
    case "ongoing":
      return (
        <Badge className="bg-seats-available/10 text-seats-available border-seats-available/20 hover:bg-seats-available/10">
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

function filterTrips(trips: Trip[], filter: string): Trip[] {
  if (filter === "all") return trips
  return trips.filter((trip) => {
    if (filter === "upcoming") return trip.status === "upcoming"
    if (filter === "ongoing") return trip.status === "ongoing"
    if (filter === "past") return trip.status === "past"
    return true
  })
}

function TripCard({ trip }: { trip: Trip }) {
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

export default function MisViajesPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const filteredTrips = filterTrips(mockTrips, activeFilter)

  const tripCounts = {
    all: mockTrips.length,
    upcoming: mockTrips.filter((t) => t.status === "upcoming").length,
    ongoing: mockTrips.filter((t) => t.status === "ongoing").length,
    past: mockTrips.filter((t) => t.status === "past").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
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

        {/* Filters */}
        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 sm:w-auto sm:inline-flex">
            <TabsTrigger value="all" className="gap-1.5">
              Todos
              <span className="hidden sm:inline text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">
                {tripCounts.all}
              </span>
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="gap-1.5">
              Próximos
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
              Pasados
              <span className="hidden sm:inline text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">
                {tripCounts.past}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Trip Grid */}
        {filteredTrips.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No hay viajes en esta categoría
            </h3>
            <p className="text-muted-foreground mb-6">
              {activeFilter === "upcoming" && "No tienes viajes próximos programados"}
              {activeFilter === "ongoing" && "No tienes ningún viaje en curso"}
              {activeFilter === "past" && "Aún no has realizado ningún viaje"}
            </p>
            <Link href="/publicar">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Crear nuevo viaje
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
