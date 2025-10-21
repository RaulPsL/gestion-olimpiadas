import {
  IconTrendingDown,
  IconTrendingUp,
  IconUserMinus,
  IconUserOff,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpDown } from "lucide-react";
import { useAuth } from "@/hooks/use-context";
import { Button } from "./ui/button";
import { generarListaPDF } from "@/pdfs/ListUsersPDF";
import React from "react";
import { getOlimpistas } from "@/api/Olimpistas";
import { Usuario } from "@/pdfs/interfaces/UsuarioPDF";

export function SectionAccountingOlimpistas() {

  const { data } = useAuth();
  const [olimpistas, setOlimpistas] = React.useState<any[]>();

  React.useEffect(() => {
    const staticData = async () => {
      const result = await getOlimpistas();
      setOlimpistas(result);
    }
    staticData();
  }, []);

  let datos = [
    {
      title: 'Total concursantes',
      descripction: 250,
      badge: {
        icon: IconUsers,
        content: 250,
      },
      footer: {
        description: 'Todos los concursantes que aun participan de todas las áreas.',
        icon: TrendingUpDown,
      },
      options: [
        {
          title: "Generar en PDF",
          action: "",
        }
      ],
    },
    {
      title: 'Concursantes clasificados',
      descripction: 12,
      badge: {
        icon: IconUserPlus,
        content: "+12.5%",
      },
      footer: {
        description: 'Concursantes que pasaron a la siguiente fase en general.',
        icon: IconTrendingUp,
      },
      options: [],
    },
    {
      title: 'Concursantes no clasificados',
      descripction: 15,
      badge: {
        icon: IconUserMinus,
        content: "-20%",
      },
      footer: {
        description: 'Concursantes que no pasaron a la siguiente fase en general.',
        icon: IconTrendingDown,
      },
      options: [],
    },
    {
      title: 'Concursantes desclasificados',
      descripction: 15,
      badge: {
        icon: IconUserOff,
        content: "-20%",
      },
      footer: {
        description: 'Concursantes que salieron de la competencia en general.',
        icon: IconTrendingDown,
      },
      options: [],
    },
    {
      title: 'Total concursantes',
      descripction: 250,
      badge: {
        icon: IconUsers,
        content: 250,
      },
      footer: {
        description: 'Todos los concursantes que aun participan de todas las áreas.',
        icon: TrendingUpDown,
      },
      options: [],
    },
    {
      title: 'Total concursantes',
      descripction: 250,
      badge: {
        icon: IconUsers,
        content: 250,
      },
      footer: {
        description: 'Todos los concursantes que aun participan de todas las áreas.',
        icon: TrendingUpDown,
      },
      options: [],
    },
    {
      title: 'Total concursantes',
      descripction: 250,
      badge: {
        icon: IconUsers,
        content: 250,
      },
      footer: {
        description: 'Todos los concursantes que aun participan de todas las áreas.',
        icon: TrendingUpDown,
      },
      options: [],
    },
  ];
  // if (data?.rol.sigla === 'ADM') {
  //   datos = [];
  // }
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      { datos?.map((dato) => (
        <Card className="@container/card group relative cursor-pointer overflow-hidden duration-300 active:scale-95">
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
              data && dato?.options.length > 0 ? (
                <>
                  {
                    dato.options.map((option) => (
                      <Button 
                        variant="ghost"
                        onClick={
                          () => generarListaPDF(olimpistas as Usuario[], '', 'todos los olimpistas', true)
                        }
                      >
                        { option.title }
                      </Button>
                    ))
                  }
                </>
              ) : (
                <>
                  <p className="text-xl font-bold text-white">
                    Generar reporte
                  </p>
                  <p className="text-sm text-gray-200 mt-1">Click para abrir</p>
                </>
              )
            }
          </div>
        </Card>
      )) }
    </div>
  )
}
