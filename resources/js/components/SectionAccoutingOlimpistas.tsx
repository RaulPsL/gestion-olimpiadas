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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpDown } from "lucide-react";
import { useAuth } from "@/hooks/use-context";
import { Button } from "./ui/button";

export function SectionAccountingOlimpistas() {
  const { data } = useAuth();
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      
      <Card
        className="@container/card cursor-pointer duration-300 hover:bg-gray-100 hover:opacity-55 active:scale-95"
      >
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <CardDescription>Total Concursantes</CardDescription> 250
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUsers />
              250
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-sm line-clamp-1 flex gap-2 font-medium">
            Todos los concursantes que aun participan de todas las áreas. <TrendingUpDown className="size-4" />
          </div>
        </CardFooter>
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xl font-bold text-gray-900">
            Generar reporte
          </p>
          <p className="text-sm text-gray-600 mt-1">Click para abrir</p>
        </div>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Concursantes clasificados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            12
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUserPlus />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Concursantes que pasaron a la siguiente fase en general.<IconTrendingUp className="size-4" />+
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Concursantes no clasificados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            15
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUserMinus />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Concursantes que no pasaron a la siguiente fase en general.<IconTrendingDown className="size-4" />-
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Concursantes desclasificados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            15
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUserOff />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Concursantes que salieron de la competencia en general.<IconTrendingDown className="size-4" />-
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
