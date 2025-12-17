import { AlertCircle, ArrowLeft, BookUser } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { getClasificacionesByArea, getClasificacionesGrupoByArea } from "@/api/Clasificacciones";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/DataTable";
import { columnsGrupo } from "@/components/tables/ColumnsClasificacionesGrupo";
import { columns } from "@/components/tables/ColumnsClasificaciones";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PageClasificaciones() {
    const { state } = useLocation();
    const [clasificaciones, setClasificaciones] = React.useState<any>();
    const [keys, setKeys] = React.useState<string[]>();
    const [esGrupo, setEsgrupo] = React.useState<boolean>(state.esGrupo);
    const [columnsClasificaciones, setColumnsClasificaciones] = React.useState<any>(columns);
    const navigate = useNavigate();

    React.useEffect(() => {
        setClasificaciones(state.clasificaciones);
        setEsgrupo(state.esGrupo);
        if (esGrupo) {
            setColumnsClasificaciones(columnsGrupo);
        }
    }, [state]);

    React.useEffect(() => {
        if (clasificaciones) {
            setKeys(Object.keys(clasificaciones));
        }
    }, [clasificaciones]);

    const estados = ["clasificado", "activo", "no clasificado", "desclasificado"];

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
                                    Clasificaciones - {state.nombre.toLowerCase()}
                                </Label>
                                <p className="text-muted-foreground mt-1">
                                    {esGrupo ? 'Clasificaciones por grupo' : 'Clasificaciones individuales'}
                                </p>
                            </div>
                        </div>
                    </div>

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
                                        <DataTable
                                            columns={columnsClasificaciones}
                                            data={clasificaciones?.[estado] || []}
                                            filter={true}
                                            fieldSearch="nombre"
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
                <Footer />
            </SidebarInset>
        </SidebarProvider>
    );
}