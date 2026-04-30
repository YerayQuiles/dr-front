import { MapPin, Calendar, Clock, Users, Star, Trophy, Euro, Car, Bus, Building2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type VehicleType = "car" | "van" | "minibus" | "bus"

interface RideCardProps {
  id?: string
  homeTeam: string
  awayTeam: string
  homeTeamCrest?: string
  awayTeamCrest?: string
  competition: string
  departureCity: string
  departureDate: string
  departureTime: string
  availableSeats: number
  price?: number
  driverName: string
  driverRating: number
  driverAvatar?: string
  isTopDriver?: boolean
  vehicleType?: VehicleType
  stadiumName?: string
  stadiumImage?: string
  stadiumCity?: string
}

export function RideCard({
  id = "1",
  homeTeam,
  awayTeam,
  homeTeamCrest,
  awayTeamCrest,
  competition,
  departureCity,
  departureDate,
  departureTime,
  availableSeats,
  price,
  driverName,
  driverRating,
  driverAvatar,
  isTopDriver,
  vehicleType = "car",
  stadiumName,
  stadiumImage,
  stadiumCity,
}: RideCardProps) {
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

  const vehicleInfo = getVehicleInfo(vehicleType)
  const VehicleIcon = vehicleInfo.icon

  return (
    <Link href={`/viaje/${id}`} className="block">
      <Card className="group overflow-hidden border-border bg-card transition-all hover:shadow-lg hover:border-primary/30">
        <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Stadium Image */}
          {stadiumImage && (
            <div className="relative h-40 w-full lg:h-auto lg:w-48 flex-shrink-0 overflow-hidden">
              <Image
                src={stadiumImage}
                alt={stadiumName || "Estadio"}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-1.5 text-white">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm font-medium truncate">{stadiumName}</span>
                </div>
                {stadiumCity && (
                  <p className="text-xs text-white/80 mt-0.5">{stadiumCity}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Match Info */}
          <div className="flex-1 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Competition Badge & Stadium Name (when no image) */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {competition}
                  </Badge>
                  {stadiumName && !stadiumImage && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{stadiumName}</span>
                    </div>
                  )}
                </div>
                
                {/* Match with Team Crests */}
                <div className="flex items-center gap-3">
                  {/* Home Team */}
                  <div className="flex items-center gap-2">
                    {homeTeamCrest && (
                      <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-border bg-white shadow-sm">
                        <Image
                          src={homeTeamCrest}
                          alt={homeTeam}
                          fill
                          className="object-contain p-0.5"
                        />
                      </div>
                    )}
                    <span className="text-lg font-bold text-card-foreground">{homeTeam}</span>
                  </div>
                  
                  <span className="text-muted-foreground font-medium">vs</span>
                  
                  {/* Away Team */}
                  <div className="flex items-center gap-2">
                    {awayTeamCrest && (
                      <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-border bg-white shadow-sm">
                        <Image
                          src={awayTeamCrest}
                          alt={awayTeam}
                          fill
                          className="object-contain p-0.5"
                        />
                      </div>
                    )}
                    <span className="text-lg font-bold text-card-foreground">{awayTeam}</span>
                  </div>
                </div>
                
                {/* Location, Time & Vehicle */}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Desde {departureCity}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{departureDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{departureTime}</span>
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
                getSeatsColor(availableSeats)
              )}>
                <Users className="h-4 w-4" />
                {getSeatsText(availableSeats)}
              </div>
            </div>
          </div>

          {/* Driver Info & Price */}
          <div className="flex items-center justify-between gap-4 border-t border-border bg-muted/30 p-5 lg:w-72 lg:flex-col lg:items-stretch lg:justify-center lg:border-l lg:border-t-0">
            {/* Driver */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-card">
                  <AvatarImage src={driverAvatar} alt={driverName} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {driverName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {isTopDriver && (
                  <div className="absolute -right-1 -top-1 rounded-full bg-yellow-500 p-0.5">
                    <Trophy className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-card-foreground">{driverName}</span>
                  {isTopDriver && (
                    <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 text-xs">
                      TOP
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  <span>{driverRating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center gap-4 lg:mt-3 lg:flex-col lg:items-stretch">
              {price !== undefined && (
                <div className="flex items-center gap-1 text-lg font-bold text-card-foreground lg:justify-center">
                  <Euro className="h-5 w-5 text-primary" />
                  <span>{price}</span>
                  <span className="text-sm font-normal text-muted-foreground">/persona</span>
                </div>
              )}
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={availableSeats === 0}
              >
                {availableSeats === 0 ? "Completo" : "Reservar"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      </Card>
    </Link>
  )
}
