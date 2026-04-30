"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Mis Viajes", href: "/mis-viajes" },
  { label: "Publicar Viaje", href: "/publicar" },
  { label: "Perfil", href: "/perfil" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-header-bg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Car className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary">
            Derby Radio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/login">
            <Button className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90">
              Iniciar Sesión
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-header-bg border-white/10">
            <div className="flex items-center justify-between py-4">
              <span className="text-lg font-bold text-primary">Derby Radio</span>
            </div>
            <nav className="mt-8 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Iniciar Sesión
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
