"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Trophy,
  Euro,
  Car,
  Bus,
  Bookmark,
  Phone,
  ArrowLeft,
  Settings,
  Building2,
  Route,
  CircleDot,
  Flag,
  Home,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Header } from "@/components/header"
import { cn } from "@/lib/utils"
import Link from "next/link"

type VehicleType = "car" | "van" | "minibus" | "bus"
type TripStatus = "active" | "full" | "cancelled" | "completed"

interface Passenger {
  id: string
  name: string
  avatar?: string
  status: "confirmed" | "pending"
}

interface ItineraryStep {
  id: string
  time: string
  title: string
  description: string
  type: "departure" | "meeting" | "match" | "return" | "arrival"
}

interface TripDetails {
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamCrest?: string
  awayTeamCrest?: string
  competition: string
  matchDate: string
  matchTime: string
  departureAddress: string
  departureCity: string
  departureDate: string
  departureTime: string
  availableSeats: number
  totalSeats: number
  price?: number
  driverName: string
  driverRating: number
  driverAvatar?: string
  driverPhone?: string
  isTopDriver?: boolean
  vehicleType: VehicleType
  vehicleBrand: string
  vehicleModel: string
  vehicleColor: string
  status: TripStatus
  passengers: Passenger[]
  isCurrentUserDriver: boolean
  isCurrentUserPassenger: boolean
  stadiumName: string
  stadiumImage: string
  stadiumCity: string
  itinerary: ItineraryStep[]
}

const teamCrests: Record<string, string> = {
  "Real Madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  "FC Barcelona": "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
}

// Mock trip data - in a real app this would come from an API
const mockTrip: TripDetails = {
  id: "1",
  homeTeam: "Real Madrid",
  awayTeam: "FC Barcelona",
  homeTeamCrest: teamCrests["Real Madrid"],
  awayTeamCrest: teamCrests["FC Barcelona"],
  competition: "La Liga",
  matchDate: "15 Dic 2024",
  matchTime: "21:00",
  departureAddress: "Plaza del Ayuntamiento, 1",
  departureCity: "Valencia",
  departureDate: "15 Dic 2024",
  departureTime: "14:00",
  availableSeats: 2,
  totalSeats: 4,
  price: 25,
  driverName: "Carlos García",
  driverRating: 4.9,
  driverAvatar: undefined,
  driverPhone: "+34 612 345 678",
  isTopDriver: true,
  vehicleType: "car",
  vehicleBrand: "Volkswagen",
  vehicleModel: "Golf",
  vehicleColor: "Gris",
  status: "active",
  passengers: [
    { id: "p1", name: "María López", avatar: undefined, status: "confirmed" },
    { id: "p2", name: "Juan Pérez", avatar: undefined, status: "pending" },
  ],
  isCurrentUserDriver: false,
  isCurrentUserPassenger: true,
  stadiumName: "Santiago Bernabeu",
  stadiumImage: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
  stadiumCity: "Madrid",
  itinerary: [
    {
      id: "1",
      time: "13:30",
      title: "Punto de encuentro",
      description: "Plaza del Ayuntamiento, 1 - Valencia",
      type: "meeting",
    },
    {
      id: "2",
      time: "14:00",
      title: "Salida",
      description: "Inicio del viaje hacia Madrid",
      type: "departure",
    },
    {
      id: "3",
      time: "17:30",
      title: "Llegada a Madrid",
      description: "Llegada aproximada al estadio",
      type: "arrival",
    },
    {
      id: "4",
      time: "21:00",
      title: "Partido",
      description: "Real Madrid vs FC Barcelona - Santiago Bernabeu",
      type: "match",
    },
    {
      id: "5",
      time: "23:15",
      title: "Regreso",
      description: "Salida desde el estadio hacia Valencia",
      type: "return",
    },
    {
      id: "6",
      time: "02:45",
      title: "Llegada a Valencia",
      description: "Llegada estimada al punto de encuentro",
      type: "arrival",
    },
  ],
}

export default function TripDetailPage() {
  const params = useParams()
  const [isSaved, setIsSaved] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)

  // In a real app, fetch trip data based on params.id
  const trip = mockTrip

  const getSeatsColor = (seats: number) => {
    if (seats === 0) return "bg-seats-full text-white"
    if (seats <= 5) return "bg-seats-low text-foreground"
    return "bg-seats-available text-white"
  }

  const getStatusBadge = (status: TripStatus) => {
    const statusConfig = {
      active: { label: "Activo", className: "bg-seats-available text-white" },
      full: { label: "Completo", className: "bg-muted text-muted-foreground" },
      cancelled: { label: "Cancelado", className: "bg-seats-full text-white" },
      completed: { label: "Completado", className: "bg-primary text-primary-foreground" },
    }
    return statusConfig[status]
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

  const vehicleInfo = getVehicleInfo(trip.vehicleType)
  const VehicleIcon = vehicleInfo.icon
  const statusBadge = getStatusBadge(trip.status)

  const handleRequestSeat = async () => {
    setIsRequesting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRequesting(false)
  }

  const canSeePhone = trip.isCurrentUserDriver || trip.isCurrentUserPassenger

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

          {/* Status Badge */}
          <div className="mb-4">
            <Badge className={cn("text-sm", statusBadge.className)}>
              {statusBadge.label}
            </Badge>
          </div>

          {/* Match Info Card with Stadium Image */}
          <Card className="mb-6 overflow-hidden">
            {/* Stadium Image Header */}
            <div className="relative h-48 w-full">
              <Image
                src={trip.stadiumImage}
                alt={trip.stadiumName}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white">
                  <Building2 className="h-5 w-5" />
                  <span className="text-lg font-semibold">{trip.stadiumName}</span>
                </div>
                <p className="text-sm text-white/80 mt-1">{trip.stadiumCity}</p>
              </div>
              <Badge variant="secondary" className="absolute top-4 left-4 text-xs font-medium">
                {trip.competition}
              </Badge>
            </div>
            
            <CardContent className="p-6">
              {/* Teams */}
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-2">
                  {trip.homeTeamCrest && (
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-border bg-white shadow-sm">
                      <Image
                        src={trip.homeTeamCrest}
                        alt={trip.homeTeam}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <span className="text-lg font-bold text-card-foreground">{trip.homeTeam}</span>
                </div>

                <span className="text-2xl font-bold text-muted-foreground">vs</span>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-2">
                  {trip.awayTeamCrest && (
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-border bg-white shadow-sm">
                      <Image
                        src={trip.awayTeamCrest}
                        alt={trip.awayTeam}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <span className="text-lg font-bold text-card-foreground">{trip.awayTeam}</span>
                </div>
              </div>

              {/* Match Date/Time */}
              <div className="mt-6 flex items-center justify-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{trip.matchDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{trip.matchTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Departure Info with Itinerary Button */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Información de salida</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Route className="h-4 w-4" />
                        Ver itinerario
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Route className="h-5 w-5 text-primary" />
                          Itinerario del viaje
                        </DialogTitle>
                        <DialogDescription>
                          Cronograma detallado del viaje a {trip.stadiumName}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        {/* Timeline */}
                        <div className="relative space-y-0">
                          {trip.itinerary.map((step, index) => {
                            const getStepIcon = (type: ItineraryStep["type"]) => {
                              switch (type) {
                                case "meeting":
                                  return <Users className="h-4 w-4" />
                                case "departure":
                                  return <Car className="h-4 w-4" />
                                case "match":
                                  return <Trophy className="h-4 w-4" />
                                case "return":
                                  return <ArrowLeft className="h-4 w-4" />
                                case "arrival":
                                  return <Flag className="h-4 w-4" />
                                default:
                                  return <CircleDot className="h-4 w-4" />
                              }
                            }

                            const getStepColor = (type: ItineraryStep["type"]) => {
                              switch (type) {
                                case "match":
                                  return "bg-primary text-primary-foreground"
                                case "departure":
                                case "return":
                                  return "bg-seats-available text-white"
                                case "arrival":
                                  return "bg-seats-low text-foreground"
                                default:
                                  return "bg-secondary text-secondary-foreground"
                              }
                            }

                            const isLast = index === trip.itinerary.length - 1

                            return (
                              <div key={step.id} className="flex gap-4">
                                {/* Timeline line and dot */}
                                <div className="flex flex-col items-center">
                                  <div
                                    className={cn(
                                      "flex h-10 w-10 items-center justify-center rounded-full",
                                      getStepColor(step.type)
                                    )}
                                  >
                                    {getStepIcon(step.type)}
                                  </div>
                                  {!isLast && (
                                    <div className="h-12 w-0.5 bg-border" />
                                  )}
                                </div>
                                {/* Content */}
                                <div className="flex-1 pb-8">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-primary">
                                      {step.time}
                                    </span>
                                    <span className="font-semibold text-card-foreground">
                                      {step.title}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-card-foreground">{trip.departureAddress}</p>
                      <p className="text-sm text-muted-foreground">{trip.departureCity}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm">{trip.departureDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">{trip.departureTime}</span>
                    </div>
                  </div>
                  
                  {/* Quick Itinerary Preview */}
                  <Separator />
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <h4 className="flex items-center gap-2 text-sm font-medium text-card-foreground mb-3">
                      <Route className="h-4 w-4 text-primary" />
                      Resumen del viaje
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-seats-available" />
                        <span className="text-muted-foreground">Salida:</span>
                        <span className="font-medium">{trip.departureTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Partido:</span>
                        <span className="font-medium">{trip.matchTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4 text-seats-available" />
                        <span className="text-muted-foreground">Regreso:</span>
                        <span className="font-medium">
                          {trip.itinerary.find(s => s.type === "return")?.time || "Por confirmar"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-seats-low" />
                        <span className="text-muted-foreground">Llegada:</span>
                        <span className="font-medium">
                          {trip.itinerary[trip.itinerary.length - 1]?.time || "Por confirmar"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vehicle Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Vehículo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                      <VehicleIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">
                        {trip.vehicleBrand} {trip.vehicleModel}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {vehicleInfo.label} - {trip.vehicleColor}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Driver's Passengers Section (only visible if current user is driver) */}
              {trip.isCurrentUserDriver && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Pasajeros confirmados</CardTitle>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Gestionar solicitudes
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {trip.passengers.filter(p => p.status === "confirmed").length > 0 ? (
                      <div className="space-y-3">
                        {trip.passengers
                          .filter((p) => p.status === "confirmed")
                          .map((passenger) => (
                            <div key={passenger.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={passenger.avatar} alt={passenger.name} />
                                  <AvatarFallback className="bg-primary/10 text-primary">
                                    {passenger.name.split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{passenger.name}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Phone className="h-4 w-4" />
                                Contactar
                              </Button>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        Aún no hay pasajeros confirmados para este viaje.
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Driver Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Conductor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-14 w-14 border-2 border-card">
                        <AvatarImage src={trip.driverAvatar} alt={trip.driverName} />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {trip.driverName.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      {trip.isTopDriver && (
                        <div className="absolute -right-1 -top-1 rounded-full bg-yellow-500 p-1">
                          <Trophy className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-card-foreground">{trip.driverName}</span>
                        {trip.isTopDriver && (
                          <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 text-xs">
                            TOP
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span>{trip.driverRating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Phone number - only visible to driver or accepted passenger */}
                  {canSeePhone && trip.driverPhone && (
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-secondary p-3">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{trip.driverPhone}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Seats & Price */}
              <Card>
                <CardContent className="p-6">
                  {/* Available Seats */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground">Plazas disponibles</span>
                    <div
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold",
                        getSeatsColor(trip.availableSeats)
                      )}
                    >
                      <Users className="h-4 w-4" />
                      {trip.availableSeats === 0
                        ? "Completo"
                        : `${trip.availableSeats}/${trip.totalSeats}`}
                    </div>
                  </div>

                  {/* Price */}
                  {trip.price !== undefined && (
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-muted-foreground">Precio por persona</span>
                      <div className="flex items-center gap-1 text-xl font-bold text-card-foreground">
                        <Euro className="h-5 w-5 text-primary" />
                        <span>{trip.price}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={trip.availableSeats === 0 || trip.status !== "active" || isRequesting}
                      onClick={handleRequestSeat}
                    >
                      {isRequesting
                        ? "Solicitando..."
                        : trip.availableSeats === 0
                        ? "Completo"
                        : trip.status !== "active"
                        ? "No disponible"
                        : "Solicitar plaza"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => setIsSaved(!isSaved)}
                    >
                      <Bookmark
                        className={cn("h-4 w-4", isSaved && "fill-primary text-primary")}
                      />
                      {isSaved ? "Guardado" : "Guardar viaje"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
