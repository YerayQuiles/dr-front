"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { SearchableSelect } from "@/components/searchable-select"
import { format } from "date-fns"
import { es } from "date-fns/locale"

const teams = [
  "Todos los equipos",
  "Real Madrid",
  "FC Barcelona",
  "Atlético de Madrid",
  "Sevilla FC",
  "Real Betis",
  "Valencia CF",
  "Athletic Club",
  "Real Sociedad",
  "Villarreal CF",
  "Celta de Vigo",
]

const cities = [
  "Todas las ciudades",
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Bilbao",
  "San Sebastián",
  "Vitoria",
  "Toledo",
  "Castellón",
  "Huelva",
  "Girona",
]

export function RideFilters() {
  const [date, setDate] = useState<Date>()
  const [team, setTeam] = useState<string>("")
  const [rivalTeam, setRivalTeam] = useState<string>("")
  const [city, setCity] = useState<string>("")

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm lg:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-card-foreground">Filtrar viajes</h3>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Team Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Equipo</label>
          <SearchableSelect
            options={teams}
            value={team}
            onValueChange={setTeam}
            placeholder="Seleccionar equipo"
            searchPlaceholder="Buscar equipo..."
            emptyMessage="No se encontró el equipo."
          />
        </div>

        {/* Rival Team Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Rival</label>
          <SearchableSelect
            options={teams}
            value={rivalTeam}
            onValueChange={setRivalTeam}
            placeholder="Seleccionar rival"
            searchPlaceholder="Buscar rival..."
            emptyMessage="No se encontró el equipo."
          />
        </div>

        {/* Departure City Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Ciudad de salida</label>
          <SearchableSelect
            options={cities}
            value={city}
            onValueChange={setCity}
            placeholder="Seleccionar ciudad"
            searchPlaceholder="Buscar ciudad..."
            emptyMessage="No se encontró la ciudad."
          />
        </div>

        {/* Date Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Fecha</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                {date ? (
                  format(date, "PPP", { locale: es })
                ) : (
                  <span className="text-muted-foreground">Seleccionar fecha</span>
                )}
                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Search className="h-4 w-4" />
            Buscar
          </Button>
        </div>
      </div>
    </div>
  )
}
