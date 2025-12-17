import { BookUser, ArrowLeft, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { getClasificacionesByAreaEspecifica, getClasificacionesGrupoByAreaEspecifica } from "@/api/Clasificacciones";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";
import { columnsGrupo } from "@/components/tables/ColumnsClasificacionesGrupo";
import { columns } from "@/components/tables/ColumnsClasificaciones";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PageClasificacionesArea({ esGrupo }: { esGrupo: boolean }) {
    const { siglaArea } = useParams<{ siglaArea: string }>();
    const navigate = useNavigate();
    const [clasificaciones, setClasificaciones] = React.useState<any>();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>("");
    const columnsClasificaciones = esGrupo ? columnsGrupo : columns;

    React.useEffect(() => {
        const fetchClasificaciones = async () => {
            if (!siglaArea) return;
            
            try {
                setLoading(true);
                setError("");
                const response = esGrupo 
                    ? await getClasificacionesGrupoByAreaEspecifica(siglaArea)
                    : await getClasificacionesByAreaEspecifica(siglaArea);
                setClasificaciones(response);
            } catch (err: any) {
                console.error("Error al cargar clasificaciones:", err);
                if (err.response?.status === 404) {
                    setError("No se encontraron clasificaciones para esta área.");
                } else {
                    setError("Error al cargar las clasificaciones. Por favor, intenta nuevamente.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchClasificaciones();
    }, [siglaArea, esGrupo]);

    const estados = ["clasificado", "activo", "no clasificado", "desclasificado"];

    const tieneDatos = () => {
        if (!clasificaciones) return false;
        return estados.some(estado => 
            clasificaciones[estado] && clasificaciones[estado].length > 0
        );
    };

    const getTotalPorEstado = (estado: string) => {
        return clasificaciones?.[estado]?.length || 0;
    };

    const handleVolver = () => {
        navigate(esGrupo ? '/clasificaciones/grupo' : '/clasificaciones');
    };

    return (
        <SidebarProvider>
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4 mb-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleVolver}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex flex-row gap-4 items-center">
                            <BookUser className="w-8 h-8" />
                            <div>
                                <Label className="text-3xl font-bold">
                                    Clasificaciones - {siglaArea?.toUpperCase()}
                                </Label>
                                <p className="text-muted-foreground mt-1">
                                    {esGrupo ? 'Clasificaciones por grupo' : 'Clasificaciones individuales'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {loading && (
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-48" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-64 w-full" />
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {!loading && !error && !clasificaciones && (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Sin información</AlertTitle>
                            <AlertDescription>
                                Aún no se tienen fases registradas para esta área.
                            </AlertDescription>
                        </Alert>
                    )}

                    {!loading && !error && clasificaciones && !tieneDatos() && (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Sin clasificaciones</AlertTitle>
                            <AlertDescription>
                                Aún no se tienen olimpistas registrados en esta área.
                            </AlertDescription>
                        </Alert>
                    )}

                    {!loading && !error && clasificaciones && tieneDatos() && (
                        <Tabs defaultValue="clasificado" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="clasificado">
                                    Clasificados
                                    {getTotalPorEstado("clasificado") > 0 && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                                            {getTotalPorEstado("clasificado")}
                                        </span>
                                    )}
                                </TabsTrigger>
                                <TabsTrigger value="activo">
                                    Activos
                                    {getTotalPorEstado("activo") > 0 && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                                            {getTotalPorEstado("activo")}
                                        </span>
                                    )}
                                </TabsTrigger>
                                <TabsTrigger value="no clasificado">
                                    No Clasificados
                                    {getTotalPorEstado("no clasificado") > 0 && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                                            {getTotalPorEstado("no clasificado")}
                                        </span>
                                    )}
                                </TabsTrigger>
                                <TabsTrigger value="desclasificado">
                                    Desclasificados
                                    {getTotalPorEstado("desclasificado") > 0 && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                                            {getTotalPorEstado("desclasificado")}
                                        </span>
                                    )}
                                </TabsTrigger>
                            </TabsList>

                            {estados.map((estado) => (
                                <TabsContent value={estado} key={estado}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="capitalize">
                                                Olimpistas {estado}s
                                            </CardTitle>
                                            <CardDescription>
                                                Lista de olimpistas en estado {estado}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            {getTotalPorEstado(estado) > 0 ? (
                                                <DataTable
                                                    columns={columnsClasificaciones}
                                                    data={clasificaciones[estado]}
                                                    fieldSearch="nombre"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                                                    <h3 className="text-lg font-semibold mb-2">
                                                        No hay datos disponibles
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        No se encontraron olimpistas {estado}s en esta área.
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            ))}
                        </Tabs>
                    )}
                </div>
                <Footer />
            </SidebarInset>
        </SidebarProvider>
    );
}
