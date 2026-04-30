import Link from "next/link"
import { Car, Twitter, Instagram, Facebook } from "lucide-react"

const footerLinks = {
  plataforma: [
    { label: "Cómo funciona", href: "/como-funciona" },
    { label: "Publicar viaje", href: "/publicar" },
    { label: "Buscar viajes", href: "/" },
    { label: "Preguntas frecuentes", href: "/faq" },
  ],
  legal: [
    { label: "Términos y condiciones", href: "/terminos" },
    { label: "Política de privacidad", href: "/privacidad" },
    { label: "Política de cookies", href: "/cookies" },
  ],
  soporte: [
    { label: "Centro de ayuda", href: "/ayuda" },
    { label: "Contacto", href: "/contacto" },
    { label: "Reportar problema", href: "/reportar" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
]

export function Footer() {
  return (
    <footer className="bg-header-bg text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Car className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold tracking-tight text-primary">
                Derby Radio
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              La plataforma de carpooling para aficionados del fútbol. 
              Comparte viajes a partidos con otros aficionados.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Plataforma
            </h3>
            <ul className="space-y-2">
              {footerLinks.plataforma.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Soporte
            </h3>
            <ul className="space-y-2">
              {footerLinks.soporte.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/50">
              {new Date().getFullYear()} Derby Radio. Todos los derechos reservados.
            </p>
            <p className="text-sm text-white/50">
              Hecho con pasión para los aficionados del fútbol
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
