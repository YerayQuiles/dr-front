"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Car,
  Bus,
  Search,
  Check,
  MapPin,
  Calendar,
  Clock,
  Users,
  Euro,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Info,
  Megaphone,
  CheckCircle2,
  XCircle,
  Building2,
  Trophy,
  ArrowRight,
  CircleDot,
  Flag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

type VehicleType = "car" | "van" | "minibus" | "bus"

interface Vehicle {
  id: string
  type: VehicleType
  brand: string
  model: string
  color: string
  seats: number
  licensePlate: string
}

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamCrest: string
  awayTeamCrest: string
  competition: string
  date: string
  time: string
  stadium: string
  stadiumCity: string
}

interface CustomStop {
  id: string
  time: string
  title: string
  description: string
}

interface TripFormData {
  // Step 1 - Vehicle
  vehicleId: string
  // Step 2 - Match
  matchId: string
  customMatch?: {
    homeTeam: string
    awayTeam: string
    competition: string
    date: string
    time: string
  }
  // Step 3 - Trip data
  origin: string
  departurePoint: string
  departurePointCoords?: { lat: number; lng: number }
  meetingPoint: string
  meetingPointCoords?: { lat: number; lng: number }
  departureDate: string
  departureTime: string
  seatsOffered: number
  pricePerPerson?: number
  // Step 4 - Itinerary
  arrivalStadiumTime: string
  returnTime: string
  arrivalOriginTime: string
  customStops: CustomStop[]
  // Step 5 - Additional info
  includes: string[]
  notIncluded: string[]
  importantNote: string
  additionalInfo: string
  organizerRules: string
}

const vehicleTypeIcons: Record<VehicleType, typeof Car> = {
  car: Car,
  van: Car,
  minibus: Bus,
  bus: Bus,
}

const vehicleTypeLabels: Record<VehicleType, string> = {
  car: "Coche",
  van: "Furgoneta",
  minibus: "Minibús",
  bus: "Autobús",
}

// Mock user vehicles
const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    type: "car",
    brand: "Seat",
    model: "León",
    color: "Blanco",
    seats: 4,
    licensePlate: "1234 ABC",
  },
  {
    id: "v2",
    type: "minibus",
    brand: "Mercedes",
    model: "Sprinter",
    color: "Gris",
    seats: 15,
    licensePlate: "5678 DEF",
  },
]

// Mock matches
const mockMatches: Match[] = [
  {
    id: "m1",
    homeTeam: "Real Madrid",
    awayTeam: "FC Barcelona",
    homeTeamCrest: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    awayTeamCrest: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    competition: "La Liga",
    date: "2025-05-15",
    time: "21:00",
    stadium: "Santiago Bernabéu",
    stadiumCity: "Madrid",
  },
  {
    id: "m2",
    homeTeam: "Atlético de Madrid",
    awayTeam: "Sevilla FC",
    homeTeamCrest: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
    awayTeamCrest: "https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg",
    competition: "La Liga",
    date: "2025-05-18",
    time: "18:30",
    stadium: "Cívitas Metropolitano",
    stadiumCity: "Madrid",
  },
  {
    id: "m3",
    homeTeam: "Valencia CF",
    awayTeam: "Athletic Club",
    homeTeamCrest: "https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg",
    awayTeamCrest: "https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg",
    competition: "Copa del Rey",
    date: "2025-05-20",
    time: "20:00",
    stadium: "Mestalla",
    stadiumCity: "Valencia",
  },
]

const allTeams = [
  { name: "Real Madrid", crest: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
  { name: "FC Barcelona", crest: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
  { name: "Atlético de Madrid", crest: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg" },
  { name: "Sevilla FC", crest: "https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg" },
  { name: "Real Betis", crest: "https://upload.wikimedia.org/wikipedia/en/1/13/Real_betis_logo.svg" },
  { name: "Valencia CF", crest: "https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg" },
  { name: "Athletic Club", crest: "https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg" },
  { name: "Real Sociedad", crest: "https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg" },
  { name: "Villarreal CF", crest: "https://upload.wikimedia.org/wikipedia/en/7/70/Villarreal_CF_logo.svg" },
]

const competitions = [
  "La Liga",
  "Copa del Rey",
  "Champions League",
  "Europa League",
  "Conference League",
  "Supercopa de España",
]

const STEPS = [
  { number: 1, title: "Vehículo", description: "Selecciona tu vehículo" },
  { number: 2, title: "Partido", description: "Elige el partido" },
  { number: 3, title: "Datos del viaje", description: "Configura el viaje" },
  { number: 4, title: "Itinerario", description: "Define las paradas" },
  { number: 5, title: "Información", description: "Detalles adicionales" },
]

export default function PublicarViajePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCustomMatchDialog, setShowCustomMatchDialog] = useState(false)
  const [matchSearch, setMatchSearch] = useState("")
  
  const [formData, setFormData] = useState<TripFormData>({
    vehicleId: "",
    matchId: "",
    origin: "",
    departurePoint: "",
    meetingPoint: "",
    departureDate: "",
    departureTime: "",
    seatsOffered: 1,
    arrivalStadiumTime: "",
    returnTime: "",
    arrivalOriginTime: "",
    customStops: [],
    includes: [],
    notIncluded: [],
    importantNote: "",
    additionalInfo: "",
    organizerRules: "",
  })

  const [includeInput, setIncludeInput] = useState("")
  const [notIncludedInput, setNotIncludedInput] = useState("")
  
  const [customMatchData, setCustomMatchData] = useState({
    homeTeam: "",
    awayTeam: "",
    competition: "",
    date: "",
    time: "",
  })

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedVehicle = mockVehicles.find(v => v.id === formData.vehicleId)
  const selectedMatch = formData.matchId === "custom" 
    ? null 
    : mockMatches.find(m => m.id === formData.matchId)

  const filteredMatches = useMemo(() => {
    if (!matchSearch) return mockMatches
    const search = matchSearch.toLowerCase()
    return mockMatches.filter(
      m => 
        m.homeTeam.toLowerCase().includes(search) ||
        m.awayTeam.toLowerCase().includes(search) ||
        m.competition.toLowerCase().includes(search)
    )
  }, [matchSearch])

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.vehicleId) {
          newErrors.vehicleId = "Selecciona un vehículo"
        }
        break
      case 2:
        if (!formData.matchId) {
          newErrors.matchId = "Selecciona un partido"
        }
        if (formData.matchId === "custom") {
          if (!customMatchData.homeTeam) newErrors.homeTeam = "Selecciona el equipo local"
          if (!customMatchData.awayTeam) newErrors.awayTeam = "Selecciona el equipo visitante"
          if (!customMatchData.competition) newErrors.competition = "Selecciona la competición"
          if (!customMatchData.date) newErrors.date = "Selecciona la fecha"
          if (!customMatchData.time) newErrors.time = "Selecciona la hora"
        }
        break
      case 3:
        if (!formData.origin) newErrors.origin = "Introduce el origen"
        if (!formData.departurePoint) newErrors.departurePoint = "Introduce el punto de salida"
        if (!formData.departureDate) newErrors.departureDate = "Selecciona la fecha de salida"
        if (!formData.departureTime) newErrors.departureTime = "Selecciona la hora de salida"
        if (formData.seatsOffered < 1) newErrors.seatsOffered = "Mínimo 1 plaza"
        break
      case 4:
        if (!formData.arrivalStadiumTime) newErrors.arrivalStadiumTime = "Introduce la hora de llegada al estadio"
        if (!formData.returnTime) newErrors.returnTime = "Introduce la hora de regreso"
        if (!formData.arrivalOriginTime) newErrors.arrivalOriginTime = "Introduce la hora de llegada al origen"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleAddCustomStop = () => {
    if (formData.customStops.length >= 10) return
    const newStop: CustomStop = {
      id: `stop-${Date.now()}`,
      time: "",
      title: "",
      description: "",
    }
    setFormData(prev => ({
      ...prev,
      customStops: [...prev.customStops, newStop],
    }))
  }

  const handleRemoveCustomStop = (stopId: string) => {
    setFormData(prev => ({
      ...prev,
      customStops: prev.customStops.filter(s => s.id !== stopId),
    }))
  }

  const handleUpdateCustomStop = (stopId: string, field: keyof CustomStop, value: string) => {
    setFormData(prev => ({
      ...prev,
      customStops: prev.customStops.map(s =>
        s.id === stopId ? { ...s, [field]: value } : s
      ),
    }))
  }

  const handleAddInclude = () => {
    if (includeInput.trim() && !formData.includes.includes(includeInput.trim())) {
      setFormData(prev => ({
        ...prev,
        includes: [...prev.includes, includeInput.trim()],
      }))
      setIncludeInput("")
    }
  }

  const handleRemoveInclude = (item: string) => {
    setFormData(prev => ({
      ...prev,
      includes: prev.includes.filter(i => i !== item),
    }))
  }

  const handleAddNotIncluded = () => {
    if (notIncludedInput.trim() && !formData.notIncluded.includes(notIncludedInput.trim())) {
      setFormData(prev => ({
        ...prev,
        notIncluded: [...prev.notIncluded, notIncludedInput.trim()],
      }))
      setNotIncludedInput("")
    }
  }

  const handleRemoveNotIncluded = (item: string) => {
    setFormData(prev => ({
      ...prev,
      notIncluded: prev.notIncluded.filter(i => i !== item),
    }))
  }

  const handleSaveCustomMatch = () => {
    if (!customMatchData.homeTeam || !customMatchData.awayTeam || !customMatchData.competition || !customMatchData.date || !customMatchData.time) {
      return
    }
    setFormData(prev => ({
      ...prev,
      matchId: "custom",
      customMatch: { ...customMatchData },
    }))
    setShowCustomMatchDialog(false)
  }

  const handlePublish = async () => {
    if (!validateStep(currentStep)) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    router.push("/mis-viajes")
  }

  const handleSaveDraft = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    router.push("/mis-viajes")
  }

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  currentStep === step.number
                    ? "border-primary bg-primary text-primary-foreground"
                    : currentStep > step.number
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted-foreground/30 bg-muted text-muted-foreground"
                )}
              >
                {currentStep > step.number ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium hidden sm:block",
                  currentStep === step.number
                    ? "text-primary"
                    : currentStep > step.number
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-8 sm:w-16 mx-2",
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Selecciona tu vehículo</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Elige el vehículo que utilizarás para este viaje
        </p>
      </div>

      {mockVehicles.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Car className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">
              No tienes vehículos registrados
            </p>
            <Button variant="outline" className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Añadir vehículo
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {mockVehicles.map(vehicle => {
            const VehicleIcon = vehicleTypeIcons[vehicle.type]
            const isSelected = formData.vehicleId === vehicle.id
            return (
              <Card
                key={vehicle.id}
                className={cn(
                  "cursor-pointer transition-all hover:border-primary/50",
                  isSelected && "border-primary bg-primary/5 ring-1 ring-primary"
                )}
                onClick={() => setFormData(prev => ({ ...prev, vehicleId: vehicle.id }))}
              >
                <CardContent className="flex items-start gap-4 p-4">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg",
                    isSelected ? "bg-primary/10" : "bg-muted"
                  )}>
                    <VehicleIcon className={cn(
                      "h-6 w-6",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      {isSelected && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {vehicleTypeLabels[vehicle.type]} · {vehicle.color}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {vehicle.seats} plazas
                      </span>
                      <span>{vehicle.licensePlate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {errors.vehicleId && (
        <p className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {errors.vehicleId}
        </p>
      )}

      <Button variant="outline" className="w-full sm:w-auto">
        <Plus className="mr-2 h-4 w-4" />
        Añadir nuevo vehículo
      </Button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Selecciona el partido</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Elige el partido al que vas a ir
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar partidos..."
          value={matchSearch}
          onChange={e => setMatchSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Matches list */}
      <div className="space-y-3">
        {filteredMatches.map(match => {
          const isSelected = formData.matchId === match.id
          return (
            <Card
              key={match.id}
              className={cn(
                "cursor-pointer transition-all hover:border-primary/50",
                isSelected && "border-primary bg-primary/5 ring-1 ring-primary"
              )}
              onClick={() => setFormData(prev => ({ ...prev, matchId: match.id, customMatch: undefined }))}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Teams */}
                    <div className="flex items-center gap-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white shadow-sm">
                        <Image
                          src={match.homeTeamCrest}
                          alt={match.homeTeam}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">vs</span>
                      <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white shadow-sm">
                        <Image
                          src={match.awayTeamCrest}
                          alt={match.awayTeam}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {match.homeTeam} vs {match.awayTeam}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {match.competition}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(match.date).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {match.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Building2 className="h-3 w-3" />
                  <span>{match.stadium}, {match.stadiumCity}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredMatches.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">
              No se encontraron partidos
            </p>
          </div>
        )}

        {/* Custom match card */}
        {formData.matchId === "custom" && formData.customMatch && (
          <Card className="border-primary bg-primary/5 ring-1 ring-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="mb-2 text-xs">
                    Partido personalizado
                  </Badge>
                  <h3 className="font-medium text-foreground">
                    {formData.customMatch.homeTeam} vs {formData.customMatch.awayTeam}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                      {formData.customMatch.competition}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(formData.customMatch.date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formData.customMatch.time}
                    </span>
                  </div>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {errors.matchId && (
        <p className="flex items-center gap-1.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {errors.matchId}
        </p>
      )}

      {/* Custom match button */}
      <Dialog open={showCustomMatchDialog} onOpenChange={setShowCustomMatchDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            El partido no está en la lista
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crear partido personalizado</DialogTitle>
            <DialogDescription>
              Introduce los datos del partido
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="homeTeam">Equipo local *</Label>
              <Select
                value={customMatchData.homeTeam}
                onValueChange={val => setCustomMatchData(prev => ({ ...prev, homeTeam: val }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar equipo" />
                </SelectTrigger>
                <SelectContent>
                  {allTeams.map(team => (
                    <SelectItem key={team.name} value={team.name}>
                      <div className="flex items-center gap-2">
                        <div className="relative h-5 w-5 overflow-hidden rounded-full bg-white">
                          <Image src={team.crest} alt={team.name} fill className="object-contain p-0.5" />
                        </div>
                        {team.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.homeTeam && <p className="text-sm text-destructive">{errors.homeTeam}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="awayTeam">Equipo visitante *</Label>
              <Select
                value={customMatchData.awayTeam}
                onValueChange={val => setCustomMatchData(prev => ({ ...prev, awayTeam: val }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar equipo" />
                </SelectTrigger>
                <SelectContent>
                  {allTeams.filter(t => t.name !== customMatchData.homeTeam).map(team => (
                    <SelectItem key={team.name} value={team.name}>
                      <div className="flex items-center gap-2">
                        <div className="relative h-5 w-5 overflow-hidden rounded-full bg-white">
                          <Image src={team.crest} alt={team.name} fill className="object-contain p-0.5" />
                        </div>
                        {team.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.awayTeam && <p className="text-sm text-destructive">{errors.awayTeam}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="competition">Competición *</Label>
              <Select
                value={customMatchData.competition}
                onValueChange={val => setCustomMatchData(prev => ({ ...prev, competition: val }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar competición" />
                </SelectTrigger>
                <SelectContent>
                  {competitions.map(comp => (
                    <SelectItem key={comp} value={comp}>
                      {comp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.competition && <p className="text-sm text-destructive">{errors.competition}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="matchDate">Fecha *</Label>
                <Input
                  id="matchDate"
                  type="date"
                  value={customMatchData.date}
                  onChange={e => setCustomMatchData(prev => ({ ...prev, date: e.target.value }))}
                />
                {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="matchTime">Hora *</Label>
                <Input
                  id="matchTime"
                  type="time"
                  value={customMatchData.time}
                  onChange={e => setCustomMatchData(prev => ({ ...prev, time: e.target.value }))}
                />
                {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSaveCustomMatch}>Guardar partido</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Datos del viaje</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Configura los detalles de salida y llegada
        </p>
      </div>

      <div className="space-y-4">
        {/* Origin */}
        <div className="space-y-2">
          <Label htmlFor="origin">
            Origen <span className="text-destructive">*</span>
          </Label>
          <Input
            id="origin"
            placeholder="Ej: Sevilla, Málaga..."
            value={formData.origin}
            onChange={e => setFormData(prev => ({ ...prev, origin: e.target.value }))}
            aria-invalid={!!errors.origin}
          />
          {errors.origin && <p className="text-sm text-destructive">{errors.origin}</p>}
        </div>

        {/* Departure point */}
        <div className="space-y-2">
          <Label htmlFor="departurePoint">
            Punto de salida <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="departurePoint"
              placeholder="Ej: Estación de Santa Justa, Sevilla"
              className="pl-10"
              value={formData.departurePoint}
              onChange={e => setFormData(prev => ({ ...prev, departurePoint: e.target.value }))}
              aria-invalid={!!errors.departurePoint}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Introduce la dirección o selecciona en el mapa
          </p>
          {errors.departurePoint && <p className="text-sm text-destructive">{errors.departurePoint}</p>}
          
          {/* Map placeholder */}
          <div className="mt-2 h-40 rounded-lg border-2 border-dashed border-muted bg-muted/30 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="mx-auto h-8 w-8 mb-2" />
              <p className="text-sm">Selector de mapa</p>
            </div>
          </div>
        </div>

        {/* Meeting point */}
        <div className="space-y-2">
          <Label htmlFor="meetingPoint">
            Punto de encuentro
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="meetingPoint"
              placeholder="Por defecto igual al punto de salida"
              className="pl-10"
              value={formData.meetingPoint}
              onChange={e => setFormData(prev => ({ ...prev, meetingPoint: e.target.value }))}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Deja vacío si es el mismo que el punto de salida
          </p>
        </div>

        <Separator />

        {/* Date and time */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="departureDate">
              Fecha de salida <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="departureDate"
                type="date"
                className="pl-10"
                value={formData.departureDate}
                onChange={e => setFormData(prev => ({ ...prev, departureDate: e.target.value }))}
                aria-invalid={!!errors.departureDate}
              />
            </div>
            {errors.departureDate && <p className="text-sm text-destructive">{errors.departureDate}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="departureTime">
              Hora de salida <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="departureTime"
                type="time"
                className="pl-10"
                value={formData.departureTime}
                onChange={e => setFormData(prev => ({ ...prev, departureTime: e.target.value }))}
                aria-invalid={!!errors.departureTime}
              />
            </div>
            {errors.departureTime && <p className="text-sm text-destructive">{errors.departureTime}</p>}
          </div>
        </div>

        <Separator />

        {/* Seats and price */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="seatsOffered">
              Plazas ofertadas <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="seatsOffered"
                type="number"
                min={1}
                max={selectedVehicle?.seats || 50}
                className="pl-10"
                value={formData.seatsOffered}
                onChange={e => setFormData(prev => ({ ...prev, seatsOffered: parseInt(e.target.value) || 1 }))}
                aria-invalid={!!errors.seatsOffered}
              />
            </div>
            {selectedVehicle && (
              <p className="text-xs text-muted-foreground">
                Máximo {selectedVehicle.seats} plazas en tu {vehicleTypeLabels[selectedVehicle.type].toLowerCase()}
              </p>
            )}
            {errors.seatsOffered && <p className="text-sm text-destructive">{errors.seatsOffered}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricePerPerson">
              Precio por persona (opcional)
            </Label>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="pricePerPerson"
                type="number"
                min={0}
                step={0.5}
                placeholder="Gratis"
                className="pl-10"
                value={formData.pricePerPerson || ""}
                onChange={e => setFormData(prev => ({ ...prev, pricePerPerson: parseFloat(e.target.value) || undefined }))}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Deja vacío si el viaje es gratuito
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Itinerario</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Define los horarios del viaje
        </p>
      </div>

      <div className="space-y-4">
        {/* Main times */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Horarios principales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="arrivalStadiumTime">
                Hora llegada al estadio <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="arrivalStadiumTime"
                  type="time"
                  className="pl-10"
                  value={formData.arrivalStadiumTime}
                  onChange={e => setFormData(prev => ({ ...prev, arrivalStadiumTime: e.target.value }))}
                  aria-invalid={!!errors.arrivalStadiumTime}
                />
              </div>
              {errors.arrivalStadiumTime && <p className="text-sm text-destructive">{errors.arrivalStadiumTime}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="returnTime">
                Hora de regreso <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="returnTime"
                  type="time"
                  className="pl-10"
                  value={formData.returnTime}
                  onChange={e => setFormData(prev => ({ ...prev, returnTime: e.target.value }))}
                  aria-invalid={!!errors.returnTime}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Hora estimada de salida del estadio
              </p>
              {errors.returnTime && <p className="text-sm text-destructive">{errors.returnTime}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalOriginTime">
                Hora llegada al origen <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="arrivalOriginTime"
                  type="time"
                  className="pl-10"
                  value={formData.arrivalOriginTime}
                  onChange={e => setFormData(prev => ({ ...prev, arrivalOriginTime: e.target.value }))}
                  aria-invalid={!!errors.arrivalOriginTime}
                />
              </div>
              {errors.arrivalOriginTime && <p className="text-sm text-destructive">{errors.arrivalOriginTime}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Custom stops */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Paradas personalizadas</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {formData.customStops.length}/10
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.customStops.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay paradas añadidas
              </p>
            ) : (
              <div className="space-y-3">
                {formData.customStops.map((stop, index) => (
                  <div key={stop.id} className="rounded-lg border bg-muted/30 p-3">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-sm font-medium text-foreground">
                        Parada {index + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveCustomStop(stop.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Hora orientativa</Label>
                        <Input
                          type="time"
                          value={stop.time}
                          onChange={e => handleUpdateCustomStop(stop.id, "time", e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <Label className="text-xs">Título (opcional)</Label>
                        <Input
                          placeholder="Ej: Parada para comer"
                          value={stop.title}
                          onChange={e => handleUpdateCustomStop(stop.id, "title", e.target.value)}
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      <Label className="text-xs">Descripción (opcional)</Label>
                      <Textarea
                        placeholder="Detalles adicionales..."
                        value={stop.description}
                        onChange={e => handleUpdateCustomStop(stop.id, "description", e.target.value)}
                        className="min-h-[60px] text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Button
              variant="outline"
              className="w-full"
              onClick={handleAddCustomStop}
              disabled={formData.customStops.length >= 10}
            >
              <Plus className="mr-2 h-4 w-4" />
              Añadir parada
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Información adicional</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Añade detalles opcionales sobre tu viaje
        </p>
      </div>

      <div className="space-y-6">
        {/* Includes */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-seats-available" />
            Incluye
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Ej: Desayuno, wifi..."
              value={includeInput}
              onChange={e => setIncludeInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddInclude())}
            />
            <Button variant="outline" size="icon" onClick={handleAddInclude}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.includes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.includes.map(item => (
                <Badge key={item} variant="secondary" className="gap-1.5 pr-1">
                  {item}
                  <button
                    onClick={() => handleRemoveInclude(item)}
                    className="ml-1 rounded-full p-0.5 hover:bg-muted"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Not included */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-destructive" />
            No incluye
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Ej: Entrada al partido..."
              value={notIncludedInput}
              onChange={e => setNotIncludedInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddNotIncluded())}
            />
            <Button variant="outline" size="icon" onClick={handleAddNotIncluded}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.notIncluded.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.notIncluded.map(item => (
                <Badge key={item} variant="outline" className="gap-1.5 pr-1">
                  {item}
                  <button
                    onClick={() => handleRemoveNotIncluded(item)}
                    className="ml-1 rounded-full p-0.5 hover:bg-muted"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Important note */}
        <div className="space-y-2">
          <Label htmlFor="importantNote" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-warning" />
            Nota destacada
          </Label>
          <Textarea
            id="importantNote"
            placeholder="Información importante que quieras destacar..."
            value={formData.importantNote}
            onChange={e => setFormData(prev => ({ ...prev, importantNote: e.target.value }))}
          />
        </div>

        {/* Additional info */}
        <div className="space-y-2">
          <Label htmlFor="additionalInfo" className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            Información adicional
          </Label>
          <Textarea
            id="additionalInfo"
            placeholder="Cualquier otra información relevante..."
            value={formData.additionalInfo}
            onChange={e => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
          />
        </div>

        {/* Organizer rules */}
        <div className="space-y-2">
          <Label htmlFor="organizerRules" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            Normas del organizador
          </Label>
          <Textarea
            id="organizerRules"
            placeholder="Normas que deben cumplir los viajeros..."
            value={formData.organizerRules}
            onChange={e => setFormData(prev => ({ ...prev, organizerRules: e.target.value }))}
          />
        </div>

        <Separator />

        {/* Summary */}
        <Card className="bg-muted/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Resumen del viaje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Match */}
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">
                  {formData.matchId === "custom" && formData.customMatch
                    ? `${formData.customMatch.homeTeam} vs ${formData.customMatch.awayTeam}`
                    : selectedMatch
                    ? `${selectedMatch.homeTeam} vs ${selectedMatch.awayTeam}`
                    : "No seleccionado"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formData.matchId === "custom" && formData.customMatch
                    ? formData.customMatch.competition
                    : selectedMatch?.competition}
                </p>
              </div>
            </div>

            {/* Vehicle */}
            <div className="flex items-center gap-3">
              {selectedVehicle ? (
                <>
                  {(() => {
                    const VehicleIcon = vehicleTypeIcons[selectedVehicle.type]
                    return <VehicleIcon className="h-5 w-5 text-primary" />
                  })()}
                  <div>
                    <p className="font-medium text-foreground">
                      {selectedVehicle.brand} {selectedVehicle.model}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedVehicle.seats} plazas · {selectedVehicle.color}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Car className="h-5 w-5 text-muted-foreground" />
                  <p className="text-muted-foreground">No seleccionado</p>
                </>
              )}
            </div>

            {/* Route */}
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">
                  {formData.origin || "Origen no especificado"}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowRight className="h-3 w-3" />
                  <span>
                    {formData.matchId === "custom" && formData.customMatch
                      ? "Destino"
                      : selectedMatch?.stadium || "Destino"}
                  </span>
                </div>
              </div>
            </div>

            {/* Date and time */}
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">
                  {formData.departureDate
                    ? new Date(formData.departureDate).toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })
                    : "Fecha no especificada"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Salida: {formData.departureTime || "--:--"}
                </p>
              </div>
            </div>

            {/* Seats and price */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">{formData.seatsOffered} plazas</span>
              </div>
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  {formData.pricePerPerson ? `${formData.pricePerPerson}€/persona` : "Gratis"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-6">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Publicar viaje</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Completa los pasos para publicar tu viaje
          </p>
        </div>

        {/* Step indicator */}
        {renderStepIndicator()}

        {/* Step content */}
        <div className="flex-1">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between border-t pt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || isSubmitting}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>

          <div className="flex items-center gap-3">
            {currentStep === 5 && (
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
              >
                Guardar borrador
              </Button>
            )}
            
            {currentStep < 5 ? (
              <Button onClick={handleNext} disabled={isSubmitting}>
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handlePublish} disabled={isSubmitting}>
                {isSubmitting ? "Publicando..." : "Publicar viaje"}
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
