"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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
  const [editingVehicle, setEditingVehicle] = useState<typeof mockVehicles[0] | null>(null)

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
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8 lg:px-8">
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
                    {userData.hasTopBadge && (
                      <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2 py-0.5" title="Organizador destacado">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        <span className="text-xs font-medium text-amber-600">Top</span>
                      </div>
                    )}
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

              {/* Favorite Teams - Integrated in Personal Data */}
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Equipos favoritos</span>
                  </div>
                  <Dialog open={isAddTeamOpen} onOpenChange={setIsAddTeamOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                        <Plus className="h-3 w-3 mr-1" />
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
                {favoriteTeams.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {favoriteTeams.map(team => (
                      <div
                        key={team.id}
                        className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 py-1.5 px-3 pr-1.5"
                      >
                        <Image
                          src={team.logo}
                          alt={team.name}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                        <span className="text-xs font-medium">{team.name}</span>
                        <button
                          onClick={() => handleRemoveFavoriteTeam(team.id)}
                          className="ml-0.5 rounded-full p-0.5 hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-xs">
                    No tienes equipos favoritos
                  </p>
                )}
              </div>
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
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Car className="h-4 w-4 text-primary" />
                    Mis vehiculos
                  </CardTitle>
                  <Link href="/perfil/vehiculo/nuevo">
                    <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                      <Plus className="h-3 w-3 mr-1" />
                      Añadir
                    </Button>
                  </Link>
              </div>
            </CardHeader>
              <CardContent className="pt-0">
                {vehicles.length > 0 ? (
                  <div className="space-y-2">
                    {vehicles.map(vehicle => (
                      <div
                        key={vehicle.id}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/30"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="rounded-full bg-primary/10 p-1.5 text-primary">
                            {getVehicleIcon(vehicle.type)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {vehicle.brand} {vehicle.model}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {vehicle.capacity} plazas
                              {vehicle.hasActiveTrip && " · Viaje activo"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <Dialog
                            open={editingVehicle?.id === vehicle.id}
                            onOpenChange={open => !open && setEditingVehicle(null)}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleEditVehicle(vehicle)}
                              >
                                <Pencil className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Editar vehiculo</DialogTitle>
                                <DialogDescription>Modifica los datos de tu vehiculo</DialogDescription>
                              </DialogHeader>
                              {editingVehicle && (
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>Tipo de vehiculo</Label>
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
                                        <SelectItem value="bus">Autobus</SelectItem>
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
                                      <Label htmlFor="edit-plate">Matricula (opcional)</Label>
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
                              "h-6 w-6",
                              vehicle.hasActiveTrip && "opacity-50 cursor-not-allowed"
                            )}
                            disabled={vehicle.hasActiveTrip}
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                            title={vehicle.hasActiveTrip ? "No puedes eliminar un vehiculo con viaje activo" : "Eliminar vehiculo"}
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-xs">
                    No tienes vehiculos registrados
                  </p>
                )}
              </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
