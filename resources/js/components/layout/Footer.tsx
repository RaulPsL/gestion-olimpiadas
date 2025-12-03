import React from 'react';
import { Facebook, Instagram, Music2 } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@ohsansi',
      icon: Music2,
      color: '#000000',
      hoverColor: '#00f2ea',
      bgColor: 'bg-black/10 hover:bg-black/20',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/people/Ohsansi/61560666333554/',
      icon: Facebook,
      color: '#1877F2',
      hoverColor: '#1877F2',
      bgColor: 'bg-blue-500/10 hover:bg-blue-500/20',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ohsansi/',
      icon: Instagram,
      color: '#E4405F',
      hoverColor: '#E4405F',
      bgColor: 'bg-pink-500/10 hover:bg-pink-500/20',
    },
  ];

  return (
    <footer className="relative mt-auto border-t border-border/50 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Título */}
          <div className="text-center">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Síguenos en Redes Sociales
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Mantente al día con todas nuestras novedades
            </p>
          </div>

          {/* Iconos de redes sociales */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.bgColor}`}
                  aria-label={`Visitar ${social.name}`}
                >
                  {/* Efecto de brillo */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{ backgroundColor: social.color, filter: 'blur(20px)' }}
                  />
                  
                  <IconComponent
                    className="w-6 h-6 relative z-10 transition-colors duration-300"
                    style={{ color: social.color }}
                  />
                  
                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-popover text-popover-foreground text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg border border-border">
                    {social.name}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center pt-4 border-t border-border/50 w-full">
            <p className="text-sm text-muted-foreground">
              © {currentYear} <span className="font-semibold text-foreground">Ohsansi</span> - Olimpiadas Científicas
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
