"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Camera,
  Save,
  Plus,
  X,
  Search,
  Trophy,
  Car,
  MapPin,
  Bookmark,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Timer,
  ChevronRight,
  Trash2,
  Pencil,
  Users,
  Palette,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data
const mockUserData = {
  firstName: "Carlos",
  lastName: "García López",
  phone: "+34 612 345 678",
  email: "carlos.garcia@email.com",
  accountType: "person" as "person" | "organization",
  organizationName: "",
  profileImage: null as string | null,
  hasTopBadge: true,
}

const mockFavoriteTeams = [
  { id: "1", name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" },
  { id: "2", name: "Athletic Club", logo: "https://media.api-sports.io/football/teams/531.png" },
]

const mockRequests = [
  { id: "1", tripName: "Final Copa del Rey", destination: "Sevilla", date: "15 Mar 2025", status: "pending" as const },
  { id: "2", tripName: "Derbi Madrileño", destination: "Madrid", date: "22 Feb 2025", status: "accepted" as const },
  { id: "3", tripName: "Liga Jornada 20", destination: "Barcelona", date: "10 Ene 2025", status: "rejected" as const },
  { id: "4", tripName: "Champions League", destination: "París", date: "5 Dic 2024", status: "cancelled" as const },
  { id: "5", tripName: "Liga Jornada 15", destination: "Valencia", date: "20 Nov 2024", status: "expired" as const },
]

const mockSavedTrips = [
  { id: "1", name: "Viaje a Wembley", destination: "Londres", date: "1 Jun 2025", organizer: "Peña Madridista" },
  { id: "2", name: "Final Supercopa", destination: "Riad", date: "12 Ene 2025", organizer: "Club Deportivo" },
]

const mockVehicles = [
  { id: "1", type: "car", brand: "Volkswagen", model: "Golf", capacity: 4, color: "Gris", plate: "1234 ABC", hasActiveTrip: true },
  { id: "2", type: "minivan", brand: "Mercedes", model: "Vito", capacity: 8, color: "Blanco", plate: "5678 DEF", hasActiveTrip: false },
]

const allTeams = [
  { id: "3", name: "FC Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" },
  { id: "4", name: "Atlético Madrid", logo: "https://media.api-sports.io/football/teams/530.png" },
  { id: "5", name: "Sevilla FC", logo: "https://media.api-sports.io/football/teams/536.png" },
  { id: "6", name: "Valencia CF", logo: "https://media.api-sports.io/football/teams/532.png" },
  { id: "7", name: "Real Sociedad", logo: "https://media.api-sports.io/football/teams/548.png" },
  { id: "8", name: "Real Betis", logo: "https://media.api-sports.io/football/teams/543.png" },
  { id: "9", name: "Villarreal CF", logo: "https://media.api-sports.io/football/teams/533.png" },
  { id: "10", name: "Osasuna", logo: "https://media.api-sports.io/football/teams/727.png" },
]

type RequestStatus = "pending" | "accepted" | "rejected" | "cancelled" | "expired"

function getRequestStatusBadge(status: RequestStatus) {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/10 gap-1">
          <Clock className="h-3 w-3" />
          Pendiente
        </Badge>
      )
    case "accepted":
      return (
        <Badge className="bg-seats-available/10 text-seats-available border-seats-available/20 hover:bg-seats-available/10 gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Aceptada
        </Badge>
      )
    case "rejected":
      return (
        <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10 gap-1">
          <XCircle className="h-3 w-3" />
          Rechazada
        </Badge>
      )
    case "cancelled":
      return (
        <Badge variant="secondary" className="text-muted-foreground gap-1">
          <AlertCircle className="h-3 w-3" />
          Cancelada
        </Badge>
      )
    case "expired":
      return (
        <Badge variant="outline" className="text-muted-foreground gap-1">
          <Timer className="h-3 w-3" />
          Expirada
        </Badge>
      )
  }
}

function getVehicleIcon(type: string) {
  switch (type) {
    case "car":
      return <Car className="h-5 w-5" />
    case "minivan":
      return <Users className="h-5 w-5" />
    case "bus":
      return <Car className="h-5 w-5" />
    default:
      return <Car className="h-5 w-5" />
  }
}

export default function PerfilPage() {
  // Personal data state
  const [userData, setUserData] = useState(mockUserData)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Favorite teams state
  const [favoriteTeams, setFavoriteTeams] = useState(mockFavoriteTeams)
  const [teamSearchQuery, setTeamSearchQuery] = useState("")
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false)

  // Vehicles state
  const [vehicles, setVehicles] = useState(mockVehicles)
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<typeof mockVehicles[0] | null>(null)
  const [newVehicle, setNewVehicle] = useState({
    type: "car",
    brand: "",
    model: "",
    capacity: 4,
    color: "",
    plate: "",
  })

  // Saved trips state
  const [savedTrips, setSavedTrips] = useState(mockSavedTrips)

  // Requests state
  const requests = mockRequests

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, profileImage: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    setIsEditingProfile(false)
    // Here you would save to backend
  }

  const handleRemoveFavoriteTeam = (teamId: string) => {
    setFavoriteTeams(prev => prev.filter(t => t.id !== teamId))
  }

  const handleAddFavoriteTeam = (team: typeof allTeams[0]) => {
    if (!favoriteTeams.find(t => t.id === team.id)) {
      setFavoriteTeams(prev => [...prev, team])
    }
    setIsAddTeamOpen(false)
    setTeamSearchQuery("")
  }

  const handleRemoveSavedTrip = (tripId: string) => {
    setSavedTrips(prev => prev.filter(t => t.id !== tripId))
  }

  const handleAddVehicle = () => {
    const vehicle = {
      id: Date.now().toString(),
      ...newVehicle,
      hasActiveTrip: false,
    }
    setVehicles(prev => [...prev, vehicle])
    setNewVehicle({ type: "car", brand: "", model: "", capacity: 4, color: "", plate: "" })
    setIsAddVehicleOpen(false)
  }

  const handleEditVehicle = (vehicle: typeof mockVehicles[0]) => {
    setEditingVehicle(vehicle)
  }

  const handleSaveEditVehicle = () => {
    if (editingVehicle) {
      setVehicles(prev => prev.map(v => v.id === editingVehicle.id ? editingVehicle : v))
      setEditingVehicle(null)
    }
  }

  const handleDeleteVehicle = (vehicleId: string) => {
    setVehicles(prev => prev.filter(v => v.id !== vehicleId))
  }

  const filteredTeamsToAdd = allTeams.filter(
    team => 
      !favoriteTeams.find(t => t.id === team.id) &&
      team.name.toLowerCase().includes(teamSearchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mi perfil</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona tu información personal y preferencias
          </p>
        </div>

        <div className="space-y-6">
          {/* Personal Data Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Datos personales
                  </CardTitle>
                  <CardDescription>Tu información de perfil y contacto</CardDescription>
                </div>
                {!isEditingProfile && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      {userData.profileImage ? (
                        <AvatarImage src={userData.profileImage} alt="Foto de perfil" />
                      ) : (
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                          {userData.firstName[0]}{userData.lastName[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {isEditingProfile && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />
                  </div>
                  {isEditingProfile && (
                    <span className="text-xs text-muted-foreground">Opcional</span>
                  )}
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input
                        id="firstName"
                        value={userData.firstName}
                        onChange={e => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditingProfile}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellidos</Label>
                      <Input
                        id="lastName"
                        value={userData.lastName}
                        onChange={e => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                        disabled={!isEditingProfile}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditingProfile}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Tipo de cuenta</Label>
                    <RadioGroup
                      value={userData.accountType}
                      onValueChange={(value: "person" | "organization") => 
                        setUserData(prev => ({ ...prev, accountType: value }))
                      }
                      disabled={!isEditingProfile}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="person" id="person" />
                        <Label htmlFor="person" className="cursor-pointer">Persona</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="organization" id="organization" />
                        <Label htmlFor="organization" className="cursor-pointer">Organización</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {userData.accountType === "organization" && (
                    <div className="space-y-2">
                      <Label htmlFor="organizationName">Nombre de la organización</Label>
                      <Input
                        id="organizationName"
                        placeholder="Peña, club, asociación..."
                        value={userData.organizationName}
                        onChange={e => setUserData(prev => ({ ...prev, organizationName: e.target.value }))}
                        disabled={!isEditingProfile}
                      />
                    </div>
                  )}

                  {isEditingProfile && (
                    <div className="flex gap-3 pt-2">
                      <Button onClick={handleSaveProfile} className="gap-2">
                        <Save className="h-4 w-4" />
                        Guardar cambios
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Favorite Teams Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Equipos favoritos
                  </CardTitle>
                  <CardDescription>Los equipos que sigues</CardDescription>
                </div>
                <Dialog open={isAddTeamOpen} onOpenChange={setIsAddTeamOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Añadir equipo favorito</DialogTitle>
                      <DialogDescription>Busca y selecciona un equipo para añadir a tus favoritos</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar equipo..."
                          value={teamSearchQuery}
                          onChange={e => setTeamSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {filteredTeamsToAdd.length > 0 ? (
                          filteredTeamsToAdd.map(team => (
                            <button
                              key={team.id}
                              onClick={() => handleAddFavoriteTeam(team)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                            >
                              <Image
                                src={team.logo}
                                alt={team.name}
                                width={32}
                                height={32}
                                className="object-contain"
                              />
                              <span className="font-medium">{team.name}</span>
                            </button>
                          ))
                        ) : (
                          <p className="text-center text-muted-foreground py-4">
                            No se encontraron equipos
                          </p>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {favoriteTeams.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {favoriteTeams.map(team => (
                    <div
                      key={team.id}
                      className="flex items-center gap-2 rounded-full border border-border bg-muted/50 py-2 px-4 pr-2"
                    >
                      <Image
                        src={team.logo}
                        alt={team.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      <span className="text-sm font-medium">{team.name}</span>
                      <button
                        onClick={() => handleRemoveFavoriteTeam(team.id)}
                        className="ml-1 rounded-full p-1 hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No tienes equipos favoritos. Añade uno para recibir notificaciones de viajes.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Top Badge Section */}
          {userData.hasTopBadge && (
            <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-transparent">
              <CardContent className="py-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-amber-500/10 p-3">
                    <Trophy className="h-8 w-8 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      Insignia Top
                      <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30 hover:bg-amber-500/20">
                        Verificado
                      </Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Eres un organizador destacado con excelentes valoraciones
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* My Trips as Driver Section */}
          <Card>
            <CardContent className="py-6">
              <Link href="/mis-viajes" className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Mis viajes como conductor</h3>
                    <p className="text-sm text-muted-foreground">Gestiona los viajes que organizas</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </CardContent>
          </Card>

          {/* My Requests Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Mis solicitudes
              </CardTitle>
              <CardDescription>Estado de tus solicitudes de plaza</CardDescription>
            </CardHeader>
            <CardContent>
              {requests.length > 0 ? (
                <div className="space-y-3">
                  {requests.map(request => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{request.tripName}</p>
                          <p className="text-xs text-muted-foreground">
                            {request.destination} · {request.date}
                          </p>
                        </div>
                      </div>
                      {getRequestStatusBadge(request.status)}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No tienes solicitudes</p>
              )}
            </CardContent>
          </Card>

          {/* Saved Trips Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-primary" />
                Mis viajes guardados
              </CardTitle>
              <CardDescription>Viajes que has guardado para más tarde</CardDescription>
            </CardHeader>
            <CardContent>
              {savedTrips.length > 0 ? (
                <div className="space-y-3">
                  {savedTrips.map(trip => (
                    <div
                      key={trip.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{trip.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {trip.destination} · {trip.date} · {trip.organizer}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveSavedTrip(trip.id)}
                        className="rounded-full p-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No tienes viajes guardados</p>
              )}
            </CardContent>
          </Card>

          {/* My Vehicles Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    Mis vehículos
                  </CardTitle>
                  <CardDescription>Gestiona los vehículos que usas para tus viajes</CardDescription>
                </div>
                <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir vehículo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Añadir vehículo</DialogTitle>
                      <DialogDescription>Introduce los datos de tu vehículo</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Tipo de vehículo</Label>
                        <Select
                          value={newVehicle.type}
                          onValueChange={value => setNewVehicle(prev => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="car">Coche</SelectItem>
                            <SelectItem value="minivan">Minivan</SelectItem>
                            <SelectItem value="bus">Autobús</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="brand">Marca *</Label>
                          <Input
                            id="brand"
                            value={newVehicle.brand}
                            onChange={e => setNewVehicle(prev => ({ ...prev, brand: e.target.value }))}
                            placeholder="Volkswagen"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="model">Modelo *</Label>
                          <Input
                            id="model"
                            value={newVehicle.model}
                            onChange={e => setNewVehicle(prev => ({ ...prev, model: e.target.value }))}
                            placeholder="Golf"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacidad (plazas) *</Label>
                        <Input
                          id="capacity"
                          type="number"
                          min={1}
                          max={50}
                          value={newVehicle.capacity}
                          onChange={e => setNewVehicle(prev => ({ ...prev, capacity: parseInt(e.target.value) || 1 }))}
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="color">Color (opcional)</Label>
                          <Input
                            id="color"
                            value={newVehicle.color}
                            onChange={e => setNewVehicle(prev => ({ ...prev, color: e.target.value }))}
                            placeholder="Gris"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="plate">Matrícula (opcional)</Label>
                          <Input
                            id="plate"
                            value={newVehicle.plate}
                            onChange={e => setNewVehicle(prev => ({ ...prev, plate: e.target.value }))}
                            placeholder="1234 ABC"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddVehicleOpen(false)}>
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleAddVehicle}
                        disabled={!newVehicle.brand || !newVehicle.model}
                      >
                        Añadir vehículo
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {vehicles.length > 0 ? (
                <div className="space-y-3">
                  {vehicles.map(vehicle => (
                    <div
                      key={vehicle.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2.5 text-primary">
                          {getVehicleIcon(vehicle.type)}
                        </div>
                        <div>
                          <p className="font-medium">
                            {vehicle.brand} {vehicle.model}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {vehicle.capacity} plazas
                            </span>
                            {vehicle.color && (
                              <span className="flex items-center gap-1">
                                <Palette className="h-3 w-3" />
                                {vehicle.color}
                              </span>
                            )}
                            {vehicle.plate && (
                              <span>{vehicle.plate}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {vehicle.hasActiveTrip && (
                          <Badge variant="secondary" className="text-xs">
                            Viaje activo
                          </Badge>
                        )}
                        <Dialog
                          open={editingVehicle?.id === vehicle.id}
                          onOpenChange={open => !open && setEditingVehicle(null)}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditVehicle(vehicle)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar vehículo</DialogTitle>
                              <DialogDescription>Modifica los datos de tu vehículo</DialogDescription>
                            </DialogHeader>
                            {editingVehicle && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Tipo de vehículo</Label>
                                  <Select
                                    value={editingVehicle.type}
                                    onValueChange={value => setEditingVehicle(prev => prev ? { ...prev, type: value } : null)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="car">Coche</SelectItem>
                                      <SelectItem value="minivan">Minivan</SelectItem>
                                      <SelectItem value="bus">Autobús</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-brand">Marca *</Label>
                                    <Input
                                      id="edit-brand"
                                      value={editingVehicle.brand}
                                      onChange={e => setEditingVehicle(prev => prev ? { ...prev, brand: e.target.value } : null)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-model">Modelo *</Label>
                                    <Input
                                      id="edit-model"
                                      value={editingVehicle.model}
                                      onChange={e => setEditingVehicle(prev => prev ? { ...prev, model: e.target.value } : null)}
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-capacity">Capacidad (plazas) *</Label>
                                  <Input
                                    id="edit-capacity"
                                    type="number"
                                    min={1}
                                    max={50}
                                    value={editingVehicle.capacity}
                                    onChange={e => setEditingVehicle(prev => prev ? { ...prev, capacity: parseInt(e.target.value) || 1 } : null)}
                                  />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-color">Color (opcional)</Label>
                                    <Input
                                      id="edit-color"
                                      value={editingVehicle.color}
                                      onChange={e => setEditingVehicle(prev => prev ? { ...prev, color: e.target.value } : null)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-plate">Matrícula (opcional)</Label>
                                    <Input
                                      id="edit-plate"
                                      value={editingVehicle.plate}
                                      onChange={e => setEditingVehicle(prev => prev ? { ...prev, plate: e.target.value } : null)}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setEditingVehicle(null)}>
                                Cancelar
                              </Button>
                              <Button onClick={handleSaveEditVehicle}>
                                Guardar cambios
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-8 w-8",
                            vehicle.hasActiveTrip && "opacity-50 cursor-not-allowed"
                          )}
                          disabled={vehicle.hasActiveTrip}
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          title={vehicle.hasActiveTrip ? "No puedes eliminar un vehículo con viaje activo" : "Eliminar vehículo"}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No tienes vehículos registrados. Añade uno para publicar viajes.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
