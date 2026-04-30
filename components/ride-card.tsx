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
    if (seats === 0) return "bg-red-500/90 text-white"
    if (seats <= 5) return "bg-amber-400/90 text-foreground"
    return "bg-emerald-500/90 text-white"
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
      <Card className="group relative overflow-hidden border-border transition-all hover:shadow-xl hover:border-primary/30 min-h-[280px]">
        {/* Full Background Stadium Image */}
        {stadiumImage && (
          <>
            <Image
              src={stadiumImage}
              alt={stadiumName || "Estadio"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 blur-[2px]"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          </>
        )}
        
        {/* Content container */}
        <CardContent className={cn(
          "relative z-10 p-0 h-full",
          !stadiumImage && "bg-card"
        )}>
          <div className="flex flex-col h-full">
            {/* Main Content Area */}
            <div className="flex-1 p-5">
              {/* Top Row: Competition Badge & Stadium Info */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs font-semibold",
                      stadiumImage && "bg-white/20 text-white border-white/30 backdrop-blur-sm"
                    )}
                  >
                    {competition}
                  </Badge>
                  {stadiumName && (
                    <div className={cn(
                      "flex items-center gap-1.5 text-xs rounded-full px-2.5 py-1",
                      stadiumImage 
                        ? "bg-white/15 text-white/90 backdrop-blur-sm" 
                        : "text-muted-foreground"
                    )}>
                      <Building2 className="h-3.5 w-3.5" />
                      <span className="font-medium">{stadiumName}</span>
                      {stadiumCity && <span className="opacity-75">• {stadiumCity}</span>}
                    </div>
                  )}
                </div>
                
                {/* Seats Badge */}
                <div className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold backdrop-blur-sm",
                  getSeatsColor(availableSeats)
                )}>
                  <Users className="h-4 w-4" />
                  {getSeatsText(availableSeats)}
                </div>
              </div>
              
              {/* Match with Team Crests - Centered */}
              <div className="flex items-center justify-center gap-4 py-4">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-2">
                  {homeTeamCrest && (
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white/30 bg-white shadow-lg">
                      <Image
                        src={homeTeamCrest}
                        alt={homeTeam}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <span className={cn(
                    "text-base font-bold text-center max-w-[120px]",
                    stadiumImage ? "text-white" : "text-card-foreground"
                  )}>
                    {homeTeam}
                  </span>
                </div>
                
                <div className={cn(
                  "flex items-center justify-center rounded-full px-3 py-1.5",
                  stadiumImage ? "bg-white/20 backdrop-blur-sm" : "bg-muted"
                )}>
                  <span className={cn(
                    "text-lg font-bold",
                    stadiumImage ? "text-white" : "text-muted-foreground"
                  )}>vs</span>
                </div>
                
                {/* Away Team */}
                <div className="flex flex-col items-center gap-2">
                  {awayTeamCrest && (
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white/30 bg-white shadow-lg">
                      <Image
                        src={awayTeamCrest}
                        alt={awayTeam}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <span className={cn(
                    "text-base font-bold text-center max-w-[120px]",
                    stadiumImage ? "text-white" : "text-card-foreground"
                  )}>
                    {awayTeam}
                  </span>
                </div>
              </div>
              
              {/* Location, Time & Vehicle */}
              <div className={cn(
                "mt-2 flex flex-wrap items-center justify-center gap-3 text-sm",
                stadiumImage ? "text-white/90" : "text-muted-foreground"
              )}>
                <div className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                  stadiumImage ? "bg-white/15 backdrop-blur-sm" : "bg-muted/50"
                )}>
                  <MapPin className={cn("h-4 w-4", stadiumImage ? "text-white" : "text-primary")} />
                  <span>Desde {departureCity}</span>
                </div>
                <div className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                  stadiumImage ? "bg-white/15 backdrop-blur-sm" : "bg-muted/50"
                )}>
                  <Calendar className={cn("h-4 w-4", stadiumImage ? "text-white" : "text-primary")} />
                  <span>{departureDate}</span>
                </div>
                <div className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                  stadiumImage ? "bg-white/15 backdrop-blur-sm" : "bg-muted/50"
                )}>
                  <Clock className={cn("h-4 w-4", stadiumImage ? "text-white" : "text-primary")} />
                  <span>{departureTime}</span>
                </div>
                <div className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                  stadiumImage ? "bg-white/15 backdrop-blur-sm" : "bg-secondary"
                )}>
                  <VehicleIcon className={cn("h-4 w-4", stadiumImage ? "text-white" : "text-primary")} />
                  <span className="font-medium">{vehicleInfo.label}</span>
                </div>
              </div>
            </div>

            {/* Driver Info & Price - Bottom Bar */}
            <div className={cn(
              "flex items-center justify-between gap-4 p-4 mt-auto",
              stadiumImage 
                ? "bg-black/40 backdrop-blur-md border-t border-white/10" 
                : "bg-muted/30 border-t border-border"
            )}>
              {/* Driver */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className={cn(
                    "h-10 w-10 border-2",
                    stadiumImage ? "border-white/30" : "border-card"
                  )}>
                    <AvatarImage src={driverAvatar} alt={driverName} />
                    <AvatarFallback className={cn(
                      stadiumImage 
                        ? "bg-white/20 text-white" 
                        : "bg-primary/10 text-primary"
                    )}>
                      {driverName.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isTopDriver && (
                    <div className="absolute -right-1 -top-1 rounded-full bg-yellow-500 p-0.5 shadow-lg">
                      <Trophy className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "font-medium",
                      stadiumImage ? "text-white" : "text-card-foreground"
                    )}>
                      {driverName}
                    </span>
                    {isTopDriver && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 text-xs border-yellow-500/30">
                        TOP
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                    <span className={stadiumImage ? "text-white/80" : "text-muted-foreground"}>
                      {driverRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center gap-4">
                {price !== undefined && (
                  <div className={cn(
                    "flex items-center gap-1 text-lg font-bold",
                    stadiumImage ? "text-white" : "text-card-foreground"
                  )}>
                    <Euro className={cn("h-5 w-5", stadiumImage ? "text-white" : "text-primary")} />
                    <span>{price}</span>
                    <span className={cn(
                      "text-sm font-normal",
                      stadiumImage ? "text-white/70" : "text-muted-foreground"
                    )}>/persona</span>
                  </div>
                )}
                <Button 
                  className={cn(
                    "font-semibold shadow-lg",
                    stadiumImage 
                      ? "bg-white text-gray-900 hover:bg-white/90" 
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
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
