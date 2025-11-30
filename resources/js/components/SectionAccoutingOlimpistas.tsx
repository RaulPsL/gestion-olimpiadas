import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";

export function SectionAccountingOlimpistas({ datos }:{ datos?: any[] }) {
  return (
    <div className={datos && datos?.length > 4 ? 
      "grid auto-rows-min gap-6 md:grid-cols-3"
      :
      "grid auto-rows-min gap-6 md:grid-cols-4"
    }>
      { datos?.map((dato: any, index: any) => (
        <Card 
          key={index}
          className="@container/card group relative cursor-pointer overflow-hidden duration-300 active:scale-95 hover-lift shadow-premium border-border/50 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm"
        >
          {/* Efecto de brillo sutil en hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Borde brillante animado */}
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-sm" />
          </div>
          
          {/* Contenido de la card */}
          <CardHeader className="relative z-10">
            <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              <CardDescription className="text-sm font-medium text-muted-foreground mb-2">
                { dato.title }
              </CardDescription> 
              { dato.descripction }
            </CardTitle>
            <CardAction>
              <Badge 
                variant="outline" 
                className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 transition-colors duration-200"
              >
                <dato.badge.icon className="mr-1" />
                { dato.badge.content }
              </Badge>
            </CardAction>
          </CardHeader>
          
          <CardFooter className="relative z-10 flex-col items-start gap-1.5 text-sm">
            <div className="text-sm line-clamp-1 flex gap-2 font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
              { dato.footer.description } 
              <dato.footer.icon className="size-4" />
            </div>
          </CardFooter>

          {/* Overlay con glassmorphism mejorado - MÁS CLARO Y CENTRADO */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 border border-border/50">
            {/* Efecto de brillo sutil en el fondo del overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
            
            <div className="relative z-10 flex flex-col gap-2 w-full px-4">
              {
                dato && dato?.options.length > 0 ? (
                  <>
                    {
                      dato.options.map((option: any, idx: any) => (
                        <Button
                          key={idx}
                          variant="ghost"
                          onClick={option.action}
                          className="w-full bg-primary/10 hover:bg-primary/20 text-foreground border border-primary/20 hover:border-primary/40 transition-all duration-200 hover:scale-105"
                        >
                          { option.title }
                        </Button>
                      ))
                    }
                  </>
                ) : (
                  <>
                    { typeof dato.options === "object" && !Array.isArray(dato.options)
                      ? dato.options
                      : (
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Click para abrir</p>
                          </div>
                        )
                    }
                  </>
                )
              }
            </div>
          </div>
        </Card>
      )) }
    </div>
  )
}
