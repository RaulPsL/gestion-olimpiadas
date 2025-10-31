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
      "grid auto-rows-min gap-4 md:grid-cols-3"
      :
      "grid auto-rows-min gap-4 md:grid-cols-4"
    }>
      { datos?.map((dato: any, index: any) => (
        <Card 
          key={index}
          className="@container/card group relative cursor-pointer overflow-hidden duration-300 active:scale-95"
        >
          {/* Contenido original de la card */}
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <CardDescription>{ dato.title }</CardDescription> { dato.descripction }
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <dato.badge.icon />
                { dato.badge.content }
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-sm line-clamp-1 flex gap-2 font-medium">
              { dato.footer.description } <dato.footer.icon className="size-4" />
            </div>
          </CardFooter>

          {/* Overlay con mensaje "Generar reporte" */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
            {
              dato && dato?.options.length > 0 ? (
                <>
                  {
                    dato.options.map((option: any, idx: any) => (
                      <Button
                        key={idx}
                        variant="ghost"
                        onClick={option.action}
                        className="text-white hover:bg-white/20"
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
                        <>
                          <p className="text-sm text-gray-200 mt-1">Click para abrir</p>
                        </>
                      )
                  }
                </>
              )
            }
          </div>
        </Card>
      )) }
    </div>
  )
}