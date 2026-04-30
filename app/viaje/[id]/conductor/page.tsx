"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Euro,
  Car,
  Bus,
  ArrowLeft,
  Edit2,
  X,
  Check,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Phone,
  Plus,
  Trash2,
  Save,
  Info,
  Megaphone,
  Route,
  CircleDot,
  Flag,
  Home,
  Utensils,
  Camera,
  Coffee,
  Fuel,
  Navigation,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Header } from "@/components/header"
import { cn } from "@/lib/utils"

type TripStatus = "active" | "full" | "cancelled" | "completed"

interface PendingRequest {
  id: string
  name: string
  avatar?: string
  requestDate: string
  phone?: string
}

interface ConfirmedPassenger {
  id: string
  name: string
  avatar?: string
  phone: string
}

interface ItineraryStop {
  id: string
  time: string
  title: string
  description?: string
  type: "departure" | "meeting" | "stadium_arrival" | "match" | "return" | "arrival" | "meal" | "visit" | "rest_stop" | "custom"
  location?: {
    address: string
    lat?: number
    lng?: number
  }
  isFixed?: boolean
}

interface TripData {
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamCrest?: string
  awayTeamCrest?: string
  competition: string
  matchDate: string
  matchTime: string
  status: TripStatus
  vehicleType: string
  vehicleBrand: string
  vehicleModel: string
  departureAddress: string
  departureCity: string
  meetingPoint?: string
  meetingPointDifferent: boolean
  departureDate: string
  departureTime: string
  totalSeats: number
  availableSeats: number
  price?: number
  itinerary: ItineraryStop[]
  includes: string[]
  notIncluded: string[]
  importantNote?: string
  additionalInfo?: string
  organizerRules?: string
  pendingRequests: PendingRequest[]
  confirmedPassengers: ConfirmedPassenger[]
  departureLocation?: { lat: number; lng: number }
}

const teamCrests: Record<string, string> = {
  "Real Madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  "FC Barcelona": "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
  "Valencia CF": "https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg",
  "Sevilla FC": "https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg",
}

const mockTripData: TripData = {
  id: "d1",
  homeTeam: "Valencia CF",
  awayTeam: "Sevilla FC",
  homeTeamCrest: teamCrests["Valencia CF"],
  awayTeamCrest: teamCrests["Sevilla FC"],
  competition: "La Liga",
  matchDate: "5 Abr 2025",
  matchTime: "21:00",
  status: "active",
  vehicleType: "car",
  vehicleBrand: "Volkswagen",
  vehicleModel: "Golf",
  departureAddress: "Plaza del Ayuntamiento, 1",
  departureCity: "Madrid",
  meetingPoint: "Frente al Corte Ingles",
  meetingPointDifferent: true,
  departureDate: "5 Abr 2025",
  departureTime: "14:00",
  totalSeats: 4,
  availableSeats: 2,
  price: 25,
  departureLocation: { lat: 40.416775, lng: -3.703790 },
  itinerary: [
    {
      id: "1",
      time: "13:30",
      title: "Punto de encuentro",
      description: "Frente al Corte Ingles",
      type: "meeting",
      isFixed: true,
      location: { address: "Plaza del Ayuntamiento, 1 - Madrid", lat: 40.416775, lng: -3.703790 },
    },
    {
      id: "2",
      time: "14:00",
      title: "Salida",
      description: "Inicio del viaje",
      type: "departure",
      isFixed: true,
    },
    {
      id: "3",
      time: "16:30",
      title: "Parada para comer",
      description: "Area de servicio La Mancha",
      type: "meal",
      isFixed: false,
    },
    {
      id: "4",
      time: "19:00",
      title: "Llegada al estadio",
      description: "Mestalla",
      type: "stadium_arrival",
      isFixed: true,
      location: { address: "Av. de Suecia, Valencia", lat: 39.474531, lng: -0.358355 },
    },
    {
      id: "5",
      time: "21:00",
      title: "Partido",
      description: "Valencia CF vs Sevilla FC",
      type: "match",
      isFixed: true,
    },
    {
      id: "6",
      time: "23:15",
      title: "Regreso",
      description: "Salida hacia Madrid",
      type: "return",
      isFixed: true,
    },
    {
      id: "7",
      time: "02:30",
      title: "Llegada a origen",
      description: "Madrid",
      type: "arrival",
      isFixed: true,
      location: { address: "Plaza del Ayuntamiento, 1 - Madrid", lat: 40.416775, lng: -3.703790 },
    },
  ],
  includes: ["Entrada al partido", "Transporte ida y vuelta", "Seguro de viaje"],
  notIncluded: ["Comidas", "Bebidas"],
  importantNote: "Es obligatorio llevar el DNI o pasaporte para acceder al estadio.",
  additionalInfo: "Haremos una parada de 45 minutos para comer. Llevar ropa comoda para el viaje.",
  organizerRules: "Prohibido fumar en el vehiculo. Respeto entre pasajeros. Puntualidad obligatoria.",
  pendingRequests: [
    { id: "r1", name: "Laura Martinez", avatar: undefined, requestDate: "28 Mar 2025", phone: "+34 611 222 333" },
    { id: "r2", name: "Pedro Sanchez", avatar: undefined, requestDate: "29 Mar 2025", phone: "+34 622 333 444" },
    { id: "r3", name: "Ana Garcia", avatar: undefined, requestDate: "30 Mar 2025", phone: "+34 633 444 555" },
  ],
  confirmedPassengers: [
    { id: "c1", name: "Maria Lopez", avatar: undefined, phone: "+34 612 345 678" },
    { id: "c2", name: "Juan Perez", avatar: undefined, phone: "+34 623 456 789" },
  ],
}

function getStatusBadge(status: TripStatus) {
  switch (status) {
    case "active":
      return <Badge className="bg-seats-available text-white">Activo</Badge>
    case "full":
      return <Badge className="bg-primary text-primary-foreground">Completo</Badge>
    case "cancelled":
      return <Badge className="bg-destructive text-destructive-foreground">Cancelado</Badge>
    case "completed":
      return <Badge variant="secondary">Realizado</Badge>
  }
}

function getVehicleIcon(type: string) {
  switch (type) {
    case "bus":
      return <Bus className="h-5 w-5" />
    default:
      return <Car className="h-5 w-5" />
  }
}

function getStepIcon(type: string) {
  switch (type) {
    case "departure": return <Route className="h-4 w-4" />
    case "meeting": return <CircleDot className="h-4 w-4" />
    case "stadium_arrival": return <Flag className="h-4 w-4" />
    case "match": return <Flag className="h-4 w-4" />
    case "return": return <Route className="h-4 w-4" />
    case "arrival": return <Home className="h-4 w-4" />
    case "meal": return <Utensils className="h-4 w-4" />
    case "visit": return <Camera className="h-4 w-4" />
    case "rest_stop": return <Coffee className="h-4 w-4" />
    default: return <MapPin className="h-4 w-4" />
  }
}

export default function DriverPanelPage() {
  const params = useParams()
  const router = useRouter()
  const [trip, setTrip] = useState<TripData>(mockTripData)
  const [isEditingTripData, setIsEditingTripData] = useState(false)
  const [isEditingItinerary, setIsEditingItinerary] = useState(false)
  const [isEditingInfo, setIsEditingInfo] = useState(false)
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false)
  const [expandedMaps, setExpandedMaps] = useState<Record<string, boolean>>({})

  // Editable form states
  const [editForm, setEditForm] = useState({
    departureTime: trip.departureTime,
    meetingPoint: trip.meetingPoint || "",
    totalSeats: trip.totalSeats,
    price: trip.price || 0,
  })

  const [editItinerary, setEditItinerary] = useState<ItineraryStop[]>(trip.itinerary)
  
  const [editInfo, setEditInfo] = useState({
    includes: trip.includes.join(", "),
    notIncluded: trip.notIncluded.join(", "),
    importantNote: trip.importantNote || "",
    additionalInfo: trip.additionalInfo || "",
    organizerRules: trip.organizerRules || "",
  })

  const toggleMap = (stopId: string) => {
    setExpandedMaps(prev => ({ ...prev, [stopId]: !prev[stopId] }))
  }

  const handleAcceptRequest = (requestId: string) => {
    const request = trip.pendingRequests.find(r => r.id === requestId)
    if (request && trip.availableSeats > 0) {
      setTrip(prev => ({
        ...prev,
        pendingRequests: prev.pendingRequests.filter(r => r.id !== requestId),
        confirmedPassengers: [...prev.confirmedPassengers, {
          id: request.id,
          name: request.name,
          avatar: request.avatar,
          phone: request.phone || "",
        }],
        availableSeats: prev.availableSeats - 1,
      }))
    }
  }

  const handleRejectRequest = (requestId: string) => {
    setTrip(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests.filter(r => r.id !== requestId),
    }))
  }

  const handleSaveTripData = () => {
    setTrip(prev => ({
      ...prev,
      departureTime: editForm.departureTime,
      meetingPoint: editForm.meetingPoint,
      totalSeats: editForm.totalSeats,
      price: editForm.price,
      availableSeats: editForm.totalSeats - prev.confirmedPassengers.length,
    }))
    setIsEditingTripData(false)
    setShowSaveConfirmation(true)
    setTimeout(() => setShowSaveConfirmation(false), 3000)
  }

  const handleSaveItinerary = () => {
    setTrip(prev => ({ ...prev, itinerary: editItinerary }))
    setIsEditingItinerary(false)
    setShowSaveConfirmation(true)
    setTimeout(() => setShowSaveConfirmation(false), 3000)
  }

  const handleSaveInfo = () => {
    setTrip(prev => ({
      ...prev,
      includes: editInfo.includes.split(",").map(s => s.trim()).filter(Boolean),
      notIncluded: editInfo.notIncluded.split(",").map(s => s.trim()).filter(Boolean),
      importantNote: editInfo.importantNote,
      additionalInfo: editInfo.additionalInfo,
      organizerRules: editInfo.organizerRules,
    }))
    setIsEditingInfo(false)
    setShowSaveConfirmation(true)
    setTimeout(() => setShowSaveConfirmation(false), 3000)
  }

  const handleAddStop = () => {
    if (editItinerary.length >= 10) return
    const newStop: ItineraryStop = {
      id: `new-${Date.now()}`,
      time: "",
      title: "Nueva parada",
      type: "custom",
      isFixed: false,
    }
    setEditItinerary(prev => [...prev, newStop])
  }

  const handleRemoveStop = (stopId: string) => {
    const stop = editItinerary.find(s => s.id === stopId)
    if (stop?.isFixed) return
    setEditItinerary(prev => prev.filter(s => s.id !== stopId))
  }

  const handleUpdateStop = (stopId: string, field: string, value: string) => {
    setEditItinerary(prev => prev.map(stop => 
      stop.id === stopId ? { ...stop, [field]: value } : stop
    ))
  }

  const handleCancelTrip = () => {
    setTrip(prev => ({ ...prev, status: "cancelled" }))
  }

  const handleMarkCompleted = () => {
    setTrip(prev => ({ ...prev, status: "completed" }))
  }

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert("Descargando PDF del viaje...")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        {/* Back Button */}
        <Link href="/mis-viajes" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a mis viajes</span>
        </Link>

        {/* Save Confirmation Toast */}
        {showSaveConfirmation && (
          <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-seats-available text-white px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>Cambios guardados. Se notificara a los pasajeros confirmados.</span>
          </div>
        )}

        {/* Header Section */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            {/* Match Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {trip.homeTeamCrest && (
                    <Image src={trip.homeTeamCrest} alt={trip.homeTeam} width={40} height={40} className="object-contain" />
                  )}
                  <span className="font-semibold text-lg">{trip.homeTeam}</span>
                  <span className="text-muted-foreground">vs</span>
                  <span className="font-semibold text-lg">{trip.awayTeam}</span>
                  {trip.awayTeamCrest && (
                    <Image src={trip.awayTeamCrest} alt={trip.awayTeam} width={40} height={40} className="object-contain" />
                  )}
                </div>
              </div>
              {getStatusBadge(trip.status)}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span>{trip.competition}</span>
              <span>•</span>
              <span>{trip.matchDate}</span>
              <span>•</span>
              <span>{trip.matchTime}</span>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="outline" className="gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {trip.totalSeats - trip.availableSeats}/{trip.totalSeats} plazas
              </Badge>
              {trip.pendingRequests.length > 0 && (
                <Badge variant="outline" className="gap-1.5 border-amber-500 text-amber-600">
                  <Clock className="h-3.5 w-3.5" />
                  {trip.pendingRequests.length} solicitudes pendientes
                </Badge>
              )}
              <Badge variant="outline" className="gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-seats-available" />
                {trip.confirmedPassengers.length} pasajeros confirmados
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Edit2 className="h-4 w-4" />
                    Editar viaje
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Editar datos del viaje</DialogTitle>
                    <DialogDescription>Modifica los datos principales del viaje</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="departureTime">Hora de salida</Label>
                        <Input
                          id="departureTime"
                          type="time"
                          value={editForm.departureTime}
                          onChange={e => setEditForm(prev => ({ ...prev, departureTime: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="totalSeats">Plazas ofertadas</Label>
                        <Input
                          id="totalSeats"
                          type="number"
                          min={trip.confirmedPassengers.length}
                          max={50}
                          value={editForm.totalSeats}
                          onChange={e => setEditForm(prev => ({ ...prev, totalSeats: parseInt(e.target.value) || 1 }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meetingPoint">Punto de encuentro</Label>
                      <Input
                        id="meetingPoint"
                        value={editForm.meetingPoint}
                        onChange={e => setEditForm(prev => ({ ...prev, meetingPoint: e.target.value }))}
                        placeholder="Ej: Frente al Corte Ingles"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Precio por persona (EUR)</Label>
                      <Input
                        id="price"
                        type="number"
                        min={0}
                        value={editForm.price}
                        onChange={e => setEditForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setEditForm({
                      departureTime: trip.departureTime,
                      meetingPoint: trip.meetingPoint || "",
                      totalSeats: trip.totalSeats,
                      price: trip.price || 0,
                    })}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveTripData}>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar cambios
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="gap-2 text-destructive hover:text-destructive" disabled={trip.status === "cancelled" || trip.status === "completed"}>
                    <XCircle className="h-4 w-4" />
                    Cancelar viaje
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancelar viaje</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta accion cancelara el viaje y notificara a todos los pasajeros confirmados. Esta accion no se puede deshacer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Volver</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancelTrip} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Cancelar viaje
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button variant="outline" className="gap-2" onClick={handleMarkCompleted} disabled={trip.status === "cancelled" || trip.status === "completed"}>
                <CheckCircle2 className="h-4 w-4" />
                Marcar como realizado
              </Button>

              <Button variant="outline" className="gap-2" onClick={handleDownloadPDF}>
                <Download className="h-4 w-4" />
                Descargar PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trip Data Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Datos del viaje
                </CardTitle>
                <CardDescription>Informacion del vehiculo y trayecto</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Vehicle */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                {getVehicleIcon(trip.vehicleType)}
              </div>
              <div>
                <p className="font-medium">{trip.vehicleBrand} {trip.vehicleModel}</p>
                <p className="text-sm text-muted-foreground">{trip.vehicleType === "car" ? "Coche" : trip.vehicleType === "bus" ? "Autobus" : "Minivan"}</p>
              </div>
            </div>

            {/* Departure Point with Map */}
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Punto de salida</p>
                  <p className="text-sm text-muted-foreground">{trip.departureAddress}, {trip.departureCity}</p>
                  {trip.departureLocation && (
                    <button
                      onClick={() => toggleMap("departure")}
                      className="flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                    >
                      <Navigation className="h-3 w-3" />
                      {expandedMaps["departure"] ? "Ocultar mapa" : "Ver mapa"}
                      <ChevronDown className={cn("h-3 w-3 transition-transform", expandedMaps["departure"] && "rotate-180")} />
                    </button>
                  )}
                  {expandedMaps["departure"] && trip.departureLocation && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-border">
                      <div className="relative h-32 w-full bg-muted">
                        <Image
                          src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+ef4444(${trip.departureLocation.lng},${trip.departureLocation.lat})/${trip.departureLocation.lng},${trip.departureLocation.lat},14,0/400x150@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`}
                          alt="Mapa del punto de salida"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Meeting Point */}
            {trip.meetingPointDifferent && trip.meetingPoint && (
              <div className="flex items-start gap-3">
                <CircleDot className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium">Punto de encuentro</p>
                  <p className="text-sm text-muted-foreground">{trip.meetingPoint}</p>
                </div>
              </div>
            )}

            {/* Date & Time */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Fecha de salida</p>
                  <p className="text-sm text-muted-foreground">{trip.departureDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Hora de salida</p>
                  <p className="text-sm text-muted-foreground">{trip.departureTime}</p>
                </div>
              </div>
            </div>

            {/* Seats & Price */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Plazas</p>
                  <p className="text-sm text-muted-foreground">{trip.availableSeats} disponibles de {trip.totalSeats}</p>
                </div>
              </div>
              {trip.price && trip.price > 0 && (
                <div className="flex items-center gap-3">
                  <Euro className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Precio por persona</p>
                    <p className="text-sm text-muted-foreground">{trip.price} EUR</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Itinerary Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-primary" />
                  Itinerario
                </CardTitle>
                <CardDescription>Horarios y paradas del viaje</CardDescription>
              </div>
              <Dialog open={isEditingItinerary} onOpenChange={setIsEditingItinerary}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit2 className="h-4 w-4" />
                    Editar
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Editar itinerario</DialogTitle>
                    <DialogDescription>Modifica los horarios y paradas (maximo 10 paradas)</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {editItinerary.map((stop, index) => (
                      <div key={stop.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                        <div className="flex-1 grid gap-3 sm:grid-cols-[80px_1fr]">
                          <Input
                            type="time"
                            value={stop.time}
                            onChange={e => handleUpdateStop(stop.id, "time", e.target.value)}
                            disabled={stop.isFixed && (stop.type === "match")}
                          />
                          <Input
                            value={stop.title}
                            onChange={e => handleUpdateStop(stop.id, "title", e.target.value)}
                            disabled={stop.isFixed && (stop.type === "match")}
                            placeholder="Titulo de la parada"
                          />
                          <div className="sm:col-span-2">
                            <Input
                              value={stop.description || ""}
                              onChange={e => handleUpdateStop(stop.id, "description", e.target.value)}
                              placeholder="Descripcion (opcional)"
                              className="text-sm"
                            />
                          </div>
                        </div>
                        {!stop.isFixed && (
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveStop(stop.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        {stop.isFixed && (
                          <Badge variant="secondary" className="text-xs">Fijo</Badge>
                        )}
                      </div>
                    ))}
                    {editItinerary.length < 10 && (
                      <Button variant="outline" className="w-full gap-2" onClick={handleAddStop}>
                        <Plus className="h-4 w-4" />
                        Anadir parada
                      </Button>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setEditItinerary(trip.itinerary)
                      setIsEditingItinerary(false)
                    }}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveItinerary}>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar cambios
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border" />
              <div className="space-y-4">
                {trip.itinerary.map((stop, index) => (
                  <div key={stop.id} className="relative flex gap-4">
                    <div className={cn(
                      "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-background",
                      stop.type === "match" ? "border-primary bg-primary/10 text-primary" : "border-border"
                    )}>
                      {getStepIcon(stop.type)}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2">
                        {stop.time && (
                          <span className="text-sm font-medium text-primary">{stop.time}</span>
                        )}
                        <span className="font-medium">{stop.title}</span>
                      </div>
                      {stop.description && (
                        <p className="text-sm text-muted-foreground">{stop.description}</p>
                      )}
                      {stop.location && (
                        <div className="mt-1">
                          <button
                            onClick={() => toggleMap(stop.id)}
                            className="flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <Navigation className="h-3 w-3" />
                            {expandedMaps[stop.id] ? "Ocultar mapa" : "Ver mapa"}
                            <ChevronDown className={cn("h-3 w-3 transition-transform", expandedMaps[stop.id] && "rotate-180")} />
                          </button>
                          {expandedMaps[stop.id] && stop.location.lat && stop.location.lng && (
                            <div className="mt-2 rounded-lg overflow-hidden border border-border">
                              <div className="relative h-32 w-full bg-muted">
                                <Image
                                  src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+ef4444(${stop.location.lng},${stop.location.lat})/${stop.location.lng},${stop.location.lat},14,0/400x150@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`}
                                  alt={`Mapa de ${stop.title}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Informacion adicional
                </CardTitle>
                <CardDescription>Detalles sobre lo que incluye el viaje</CardDescription>
              </div>
              <Dialog open={isEditingInfo} onOpenChange={setIsEditingInfo}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit2 className="h-4 w-4" />
                    Editar
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Editar informacion adicional</DialogTitle>
                    <DialogDescription>Modifica los detalles del viaje</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Incluye (separado por comas)</Label>
                      <Input
                        value={editInfo.includes}
                        onChange={e => setEditInfo(prev => ({ ...prev, includes: e.target.value }))}
                        placeholder="Ej: Entrada al partido, Transporte, Seguro"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>No incluye (separado por comas)</Label>
                      <Input
                        value={editInfo.notIncluded}
                        onChange={e => setEditInfo(prev => ({ ...prev, notIncluded: e.target.value }))}
                        placeholder="Ej: Comidas, Bebidas"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Nota importante</Label>
                      <Textarea
                        value={editInfo.importantNote}
                        onChange={e => setEditInfo(prev => ({ ...prev, importantNote: e.target.value }))}
                        placeholder="Informacion importante para los pasajeros"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Informacion adicional</Label>
                      <Textarea
                        value={editInfo.additionalInfo}
                        onChange={e => setEditInfo(prev => ({ ...prev, additionalInfo: e.target.value }))}
                        placeholder="Detalles extra sobre el viaje"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Normas del organizador</Label>
                      <Textarea
                        value={editInfo.organizerRules}
                        onChange={e => setEditInfo(prev => ({ ...prev, organizerRules: e.target.value }))}
                        placeholder="Reglas a seguir durante el viaje"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setEditInfo({
                        includes: trip.includes.join(", "),
                        notIncluded: trip.notIncluded.join(", "),
                        importantNote: trip.importantNote || "",
                        additionalInfo: trip.additionalInfo || "",
                        organizerRules: trip.organizerRules || "",
                      })
                      setIsEditingInfo(false)
                    }}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveInfo}>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar cambios
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Includes */}
            {trip.includes.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-seats-available" />
                  Incluye
                </p>
                <div className="flex flex-wrap gap-2">
                  {trip.includes.map((item, i) => (
                    <Badge key={i} variant="secondary" className="bg-seats-available/10 text-seats-available border-seats-available/20">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Not Included */}
            {trip.notIncluded.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                  No incluye
                </p>
                <div className="flex flex-wrap gap-2">
                  {trip.notIncluded.map((item, i) => (
                    <Badge key={i} variant="outline" className="text-muted-foreground">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Important Note */}
            {trip.importantNote && (
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
                <p className="text-sm font-medium mb-1 flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="h-4 w-4" />
                  Nota importante
                </p>
                <p className="text-sm text-amber-700">{trip.importantNote}</p>
              </div>
            )}

            {/* Additional Info */}
            {trip.additionalInfo && (
              <div>
                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  Informacion adicional
                </p>
                <p className="text-sm text-muted-foreground">{trip.additionalInfo}</p>
              </div>
            )}

            {/* Organizer Rules */}
            {trip.organizerRules && (
              <div>
                <p className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Megaphone className="h-4 w-4 text-primary" />
                  Normas del organizador
                </p>
                <p className="text-sm text-muted-foreground">{trip.organizerRules}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Requests Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Solicitudes pendientes
              {trip.pendingRequests.length > 0 && (
                <Badge className="bg-amber-500 text-white">{trip.pendingRequests.length}</Badge>
              )}
            </CardTitle>
            <CardDescription>Solicitudes de pasajeros esperando tu aprobacion</CardDescription>
          </CardHeader>
          <CardContent>
            {trip.pendingRequests.length > 0 ? (
              <div className="space-y-3">
                {trip.pendingRequests.map(request => (
                  <div key={request.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={request.avatar} />
                        <AvatarFallback>{request.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-muted-foreground">Solicitado el {request.requestDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rechazar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                        disabled={trip.availableSeats === 0}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Aceptar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No hay solicitudes pendientes</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confirmed Passengers Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-seats-available" />
              Pasajeros confirmados
              {trip.confirmedPassengers.length > 0 && (
                <Badge className="bg-seats-available text-white">{trip.confirmedPassengers.length}</Badge>
              )}
            </CardTitle>
            <CardDescription>Pasajeros que han sido aceptados para este viaje</CardDescription>
          </CardHeader>
          <CardContent>
            {trip.confirmedPassengers.length > 0 ? (
              <div className="space-y-3">
                {trip.confirmedPassengers.map(passenger => (
                  <div key={passenger.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={passenger.avatar} />
                        <AvatarFallback>{passenger.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{passenger.name}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{passenger.phone}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-seats-available/10 text-seats-available border-seats-available/20">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      Confirmado
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Aun no hay pasajeros confirmados</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
