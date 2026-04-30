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

const stadiums: Record<string, { name: string; image: string; city: string }> = {
  "Real Madrid": {
    name: "Santiago Bernabeu",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    city: "Madrid"
  },
  "FC Barcelona": {
    name: "Spotify Camp Nou",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80",
    city: "Barcelona"
  },
  "Atlético de Madrid": {
    name: "Civitas Metropolitano",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    city: "Madrid"
  },
  "Athletic Club": {
    name: "San Mames",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    city: "Bilbao"
  },
  "Valencia CF": {
    name: "Mestalla",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    city: "Valencia"
  },
  "Real Betis": {
    name: "Benito Villamarin",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
    city: "Sevilla"
  },
}

const mockRides = [
  {
    id: "1",
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
    stadiumName: stadiums["Real Madrid"].name,
    stadiumImage: stadiums["Real Madrid"].image,
    stadiumCity: stadiums["Real Madrid"].city,
  },
  {
    id: "2",
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
    stadiumName: stadiums["Atlético de Madrid"].name,
    stadiumImage: stadiums["Atlético de Madrid"].image,
    stadiumCity: stadiums["Atlético de Madrid"].city,
  },
  {
    id: "3",
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
    stadiumName: stadiums["Athletic Club"].name,
    stadiumImage: stadiums["Athletic Club"].image,
    stadiumCity: stadiums["Athletic Club"].city,
  },
  {
    id: "4",
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
    stadiumName: stadiums["Valencia CF"].name,
    stadiumImage: stadiums["Valencia CF"].image,
    stadiumCity: stadiums["Valencia CF"].city,
  },
  {
    id: "5",
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
    stadiumName: stadiums["Real Betis"].name,
    stadiumImage: stadiums["Real Betis"].image,
    stadiumCity: stadiums["Real Betis"].city,
  },
  {
    id: "6",
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
    stadiumName: stadiums["FC Barcelona"].name,
    stadiumImage: stadiums["FC Barcelona"].image,
    stadiumCity: stadiums["FC Barcelona"].city,
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
        {mockRides.map((ride) => (
          <RideCard key={ride.id} {...ride} />
        ))}
      </div>
    </section>
  )
}
