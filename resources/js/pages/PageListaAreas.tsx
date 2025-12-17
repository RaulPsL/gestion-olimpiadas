import { BookUser, ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllAreas } from "@/api/Areas";
import { getClasificacionesByArea, getClasificacionesGrupoByArea } from "@/api/Clasificacciones";

export default function PageListaAreas() {
    const [areas, setAreas] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>("");
    const navigate = useNavigate();
    const hasFetched = React.useRef(false);

    React.useEffect(() => {
        const fetchAreas = async () => {
            try {
                setLoading(true);
                const response = await Promise.all([
                    getClasificacionesByArea(),
                    getClasificacionesGrupoByArea()
                ]);
                setAreas(response[1].concat(response[0]));
            } catch (err) {
                setError("Error al cargar las áreas. Por favor, intenta nuevamente.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchAreas();
        }
    }, []);

    React.useEffect(() => {
      console.log(areas);
    }, [areas])
    

    const handleAreaClick = (area: any) => {
        let grupo = false;
        if (['INF', 'ROB'].includes(area.sigla)) {
            grupo = true;
        }
        navigate(
            `/clasificaciones/${area.sigla.toLowerCase()}`,
            {
                state: {
                    nombre: area.nombre,
                    clasificaciones: area.clasificaciones,
                    esGrupo: grupo
                }
            }
        );
    };

    return (
        <SidebarProvider>
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4 py-6">
                    <div id="headerTablaClasificaciones" className="w-full flex flex-row gap-6 p-4 items-center mb-6">
                        <BookUser className="w-8 h-8" />
                        <div>
                            <Label className="text-3xl font-bold">
                                Todas las calificaciones de las olimpiadas
                            </Label>
                            <p className="text-muted-foreground mt-1">
                                Selecciona un área para ver las clasificaciones
                            </p>
                        </div>
                    </div>

                    {loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Card key={i}>
                                    <CardHeader>
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2 mt-2" />
                                    </CardHeader>
                                    <CardContent>
                                        <Skeleton className="h-4 w-full" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {!loading && !error && areas.length === 0 && (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>No hay áreas disponibles</AlertTitle>
                            <AlertDescription>
                                Aún no se han registrado áreas en el sistema.
                            </AlertDescription>
                        </Alert>
                    )}

                    {!loading && !error && areas.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {areas.map((area) => (
                                <Card
                                    key={area.sigla}
                                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                                    onClick={() => handleAreaClick(area)}
                                >
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-xl">{area.nombre}</CardTitle>
                                                <CardDescription className="mt-1">
                                                    {`Alias (${area.sigla})`}
                                                </CardDescription>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {area.descripcion || "Área académica"}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
                <Footer />
            </SidebarInset>
        </SidebarProvider>
    );
}
