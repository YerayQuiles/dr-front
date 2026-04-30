"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Car,
  Bus,
  Save,
  X,
  Bike,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

interface FormErrors {
  type?: string
  brand?: string
  model?: string
  capacity?: string
}

const vehicleTypes = [
  { value: "car", label: "Coche", icon: Car },
  { value: "van", label: "Furgoneta", icon: Car },
  { value: "caravan", label: "Caravana", icon: Bus },
  { value: "minibus", label: "Minibus", icon: Bus },
  { value: "bus", label: "Autobus", icon: Bus },
  { value: "motorcycle", label: "Motocicleta", icon: Bike },
]

export default function AddVehiclePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Form state
  const [formData, setFormData] = useState({
    type: "",
    brand: "",
    model: "",
    capacity: "",
    color: "",
    plate: "",
  })

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "type":
        if (!value) return "Selecciona un tipo de vehiculo"
        break
      case "brand":
        if (!value.trim()) return "La marca es obligatoria"
        break
      case "model":
        if (!value.trim()) return "El modelo es obligatorio"
        break
      case "capacity":
        if (!value) return "La capacidad es obligatoria"
        if (parseInt(value) < 1) return "La capacidad debe ser al menos 1"
        if (parseInt(value) > 60) return "La capacidad maxima es 60 plazas"
        break
    }
    return undefined
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    const typeError = validateField("type", formData.type)
    if (typeError) newErrors.type = typeError
    
    const brandError = validateField("brand", formData.brand)
    if (brandError) newErrors.brand = brandError
    
    const modelError = validateField("model", formData.model)
    if (modelError) newErrors.model = modelError
    
    const capacityError = validateField("capacity", formData.capacity)
    if (capacityError) newErrors.capacity = capacityError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name as keyof typeof formData])
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({
      type: true,
      brand: true,
      model: true,
      capacity: true,
    })

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, save to backend here
    console.log("Vehicle saved:", formData)
    
    setIsSubmitting(false)
    router.push("/perfil")
  }

  const handleCancel = () => {
    router.push("/perfil")
  }

  const getSelectedVehicleIcon = () => {
    const selected = vehicleTypes.find(v => v.value === formData.type)
    return selected?.icon || Car
  }

  const SelectedIcon = getSelectedVehicleIcon()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-6">
          {/* Back Button */}
          <Link
            href="/perfil"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al perfil
          </Link>

          {/* Form Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                Añadir vehiculo
              </CardTitle>
              <CardDescription>
                Añade un nuevo vehiculo para organizar viajes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Vehicle Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">
                    Tipo de vehiculo <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleChange("type", value)}
                  >
                    <SelectTrigger 
                      id="type"
                      className={cn(
                        touched.type && errors.type && "border-destructive focus:ring-destructive"
                      )}
                      onBlur={() => handleBlur("type")}
                    >
                      <SelectValue placeholder="Selecciona un tipo">
                        {formData.type && (
                          <div className="flex items-center gap-2">
                            <SelectedIcon className="h-4 w-4" />
                            {vehicleTypes.find(v => v.value === formData.type)?.label}
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {touched.type && errors.type && (
                    <p className="text-sm text-destructive">{errors.type}</p>
                  )}
                </div>

                {/* Brand and Model in a row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Brand */}
                  <div className="space-y-2">
                    <Label htmlFor="brand">
                      Marca <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="brand"
                      placeholder="Ej: Volkswagen"
                      value={formData.brand}
                      onChange={(e) => handleChange("brand", e.target.value)}
                      onBlur={() => handleBlur("brand")}
                      className={cn(
                        touched.brand && errors.brand && "border-destructive focus-visible:ring-destructive"
                      )}
                    />
                    {touched.brand && errors.brand && (
                      <p className="text-sm text-destructive">{errors.brand}</p>
                    )}
                  </div>

                  {/* Model */}
                  <div className="space-y-2">
                    <Label htmlFor="model">
                      Modelo <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="model"
                      placeholder="Ej: Golf"
                      value={formData.model}
                      onChange={(e) => handleChange("model", e.target.value)}
                      onBlur={() => handleBlur("model")}
                      className={cn(
                        touched.model && errors.model && "border-destructive focus-visible:ring-destructive"
                      )}
                    />
                    {touched.model && errors.model && (
                      <p className="text-sm text-destructive">{errors.model}</p>
                    )}
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <Label htmlFor="capacity">
                    Capacidad total de plazas <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    max="60"
                    placeholder="Ej: 4"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                    onBlur={() => handleBlur("capacity")}
                    className={cn(
                      "w-full sm:w-32",
                      touched.capacity && errors.capacity && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {touched.capacity && errors.capacity && (
                    <p className="text-sm text-destructive">{errors.capacity}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Incluye al conductor en el conteo
                  </p>
                </div>

                {/* Color and Plate in a row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Color */}
                  <div className="space-y-2">
                    <Label htmlFor="color">
                      Color <span className="text-muted-foreground text-xs">(opcional)</span>
                    </Label>
                    <Input
                      id="color"
                      placeholder="Ej: Gris"
                      value={formData.color}
                      onChange={(e) => handleChange("color", e.target.value)}
                    />
                  </div>

                  {/* Plate */}
                  <div className="space-y-2">
                    <Label htmlFor="plate">
                      Matricula <span className="text-muted-foreground text-xs">(opcional)</span>
                    </Label>
                    <Input
                      id="plate"
                      placeholder="Ej: 1234 ABC"
                      value={formData.plate}
                      onChange={(e) => handleChange("plate", e.target.value)}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      "Guardando..."
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Guardar vehiculo
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
