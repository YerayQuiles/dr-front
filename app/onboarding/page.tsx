"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import Image from "next/image"

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
  { name: "Celta de Vigo", crest: "https://upload.wikimedia.org/wikipedia/en/1/12/RC_Celta_de_Vigo_logo.svg" },
  { name: "Getafe CF", crest: "https://upload.wikimedia.org/wikipedia/en/4/46/Getafe_logo.svg" },
  { name: "Osasuna", crest: "https://upload.wikimedia.org/wikipedia/en/d/db/CA_Osasuna_logo.svg" },
  { name: "Rayo Vallecano", crest: "https://upload.wikimedia.org/wikipedia/en/1/12/Rayo_Vallecano_logo.svg" },
  { name: "RCD Mallorca", crest: "https://upload.wikimedia.org/wikipedia/en/e/e0/Rcd_mallorca.svg" },
  { name: "Girona FC", crest: "https://upload.wikimedia.org/wikipedia/en/5/54/Girona_FC_Logo.svg" },
  { name: "UD Las Palmas", crest: "https://upload.wikimedia.org/wikipedia/en/5/5e/UD_Las_Palmas_logo.svg" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const filteredTeams = useMemo(() => {
    if (!search) return allTeams
    return allTeams.filter((team) =>
      team.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const toggleTeam = (teamName: string) => {
    setSelectedTeams((prev) =>
      prev.includes(teamName)
        ? prev.filter((t) => t !== teamName)
        : [...prev, teamName]
    )
  }

  const handleFinish = async () => {
    setIsLoading(true)
    // Simulate saving preferences
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    router.push("/")
  }

  const handleSkip = () => {
    router.push("/")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Selecciona tus equipos favoritos
          </h1>
          <p className="mt-2 text-muted-foreground">
            Te mostraremos viajes a los partidos de tus equipos primero
          </p>
        </div>

        {/* Selected Teams */}
        {selectedTeams.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {selectedTeams.map((teamName) => {
              const team = allTeams.find((t) => t.name === teamName)
              return (
                <Badge
                  key={teamName}
                  variant="secondary"
                  className="flex items-center gap-2 py-1.5 pl-2 pr-1"
                >
                  {team?.crest && (
                    <div className="relative h-5 w-5 overflow-hidden rounded-full bg-white">
                      <Image
                        src={team.crest}
                        alt={teamName}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                  )}
                  <span>{teamName}</span>
                  <button
                    onClick={() => toggleTeam(teamName)}
                    className="ml-1 rounded-full p-0.5 hover:bg-muted"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span className="sr-only">Eliminar {teamName}</span>
                  </button>
                </Badge>
              )
            })}
          </div>
        )}

        {/* Search */}
        <div className="relative mt-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar equipos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Teams Grid */}
        <div className="mt-6 flex-1 overflow-auto">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {filteredTeams.map((team) => {
              const isSelected = selectedTeams.includes(team.name)
              return (
                <button
                  key={team.name}
                  onClick={() => toggleTeam(team.name)}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white shadow-sm">
                    <Image
                      src={team.crest}
                      alt={team.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="text-center text-sm font-medium text-card-foreground">
                    {team.name}
                  </span>
                </button>
              )
            })}
          </div>
          
          {filteredTeams.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">
                No se encontraron equipos con &quot;{search}&quot;
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button variant="ghost" onClick={handleSkip} disabled={isLoading}>
            Omitir este paso
          </Button>
          <Button
            onClick={handleFinish}
            disabled={isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading
              ? "Guardando..."
              : selectedTeams.length > 0
              ? `Continuar con ${selectedTeams.length} equipo${selectedTeams.length > 1 ? "s" : ""}`
              : "Continuar"}
          </Button>
        </div>
      </main>
    </div>
  )
}
