import { RideCard } from "./ride-card"
import { Car } from "lucide-react"

const teamCrests: Record<string, string> = {
  "Real Madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  "FC Barcelona": "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
  "Atlético de Madrid": "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
  "Sevilla FC": "https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg",
  "Athletic Club": "https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg",
  "Real Sociedad": "https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg",
  "Valencia CF": "https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg",
  "Villarreal CF": "https://upload.wikimedia.org/wikipedia/en/7/70/Villarreal_CF_logo.svg",
  "Real Betis": "https://upload.wikimedia.org/wikipedia/en/1/13/Real_betis_logo.svg",
  "Celta de Vigo": "https://upload.wikimedia.org/wikipedia/en/1/12/RC_Celta_de_Vigo_logo.svg",
  "Manchester City": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
}

const mockRides = [
  {
    homeTeam: "Real Madrid",
    awayTeam: "FC Barcelona",
    homeTeamCrest: teamCrests["Real Madrid"],
    awayTeamCrest: teamCrests["FC Barcelona"],
    competition: "La Liga",
    departureCity: "Valencia",
    departureDate: "15 Dic 2024",
    departureTime: "14:00",
    availableSeats: 3,
    price: 25,
    driverName: "Carlos García",
    driverRating: 4.9,
    isTopDriver: true,
    vehicleType: "car" as const,
  },
  {
    homeTeam: "Atlético de Madrid",
    awayTeam: "Sevilla FC",
    homeTeamCrest: teamCrests["Atlético de Madrid"],
    awayTeamCrest: teamCrests["Sevilla FC"],
    competition: "La Liga",
    departureCity: "Toledo",
    departureDate: "16 Dic 2024",
    departureTime: "16:30",
    availableSeats: 7,
    price: 15,
    driverName: "María López",
    driverRating: 4.7,
    isTopDriver: false,
    vehicleType: "van" as const,
  },
  {
    homeTeam: "Athletic Club",
    awayTeam: "Real Sociedad",
    homeTeamCrest: teamCrests["Athletic Club"],
    awayTeamCrest: teamCrests["Real Sociedad"],
    competition: "Copa del Rey",
    departureCity: "Vitoria",
    departureDate: "17 Dic 2024",
    departureTime: "18:00",
    availableSeats: 2,
    price: 12,
    driverName: "Iñaki Etxebarria",
    driverRating: 4.8,
    isTopDriver: true,
    vehicleType: "car" as const,
  },
  {
    homeTeam: "Valencia CF",
    awayTeam: "Villarreal CF",
    homeTeamCrest: teamCrests["Valencia CF"],
    awayTeamCrest: teamCrests["Villarreal CF"],
    competition: "La Liga",
    departureCity: "Castellón",
    departureDate: "18 Dic 2024",
    departureTime: "19:00",
    availableSeats: 0,
    price: 10,
    driverName: "Pau Martínez",
    driverRating: 4.5,
    isTopDriver: false,
    vehicleType: "minibus" as const,
  },
  {
    homeTeam: "Real Betis",
    awayTeam: "Celta de Vigo",
    homeTeamCrest: teamCrests["Real Betis"],
    awayTeamCrest: teamCrests["Celta de Vigo"],
    competition: "Champions League",
    departureCity: "Huelva",
    departureDate: "19 Dic 2024",
    departureTime: "20:00",
    availableSeats: 4,
    driverName: "Ana Fernández",
    driverRating: 4.6,
    isTopDriver: false,
    vehicleType: "bus" as const,
  },
  {
    homeTeam: "FC Barcelona",
    awayTeam: "Manchester City",
    homeTeamCrest: teamCrests["FC Barcelona"],
    awayTeamCrest: teamCrests["Manchester City"],
    competition: "Champions League",
    departureCity: "Girona",
    departureDate: "20 Dic 2024",
    departureTime: "17:00",
    availableSeats: 1,
    price: 30,
    driverName: "Jordi Puig",
    driverRating: 5.0,
    isTopDriver: true,
    vehicleType: "car" as const,
  },
]

export function RidesList() {
  return (
    <section className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Viajes disponibles</h2>
        </div>
        <span className="text-sm text-muted-foreground">
          {mockRides.length} viajes encontrados
        </span>
      </div>
      
      <div className="grid gap-4">
        {mockRides.map((ride, index) => (
          <RideCard key={index} {...ride} />
        ))}
      </div>
    </section>
  )
}
