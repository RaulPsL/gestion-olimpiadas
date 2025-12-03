import { AlertCircle, BookCopy, CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import Footer from "@/components/layout/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SectionAccountingOlimpistas } from "@/components/SectionAccoutingOlimpistas";
import { useAuth } from "@/hooks/use-context";
import React from "react";
import useStaticData from "@/hooks/use-static-data";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, FileText, Users } from "lucide-react";
import { generarCertificados, generarPreviewPDF } from "@/pdfs/CertificatePdf";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function PageGenerarDocs() {
    const { data } = useAuth();
    const [datos, setDatos] = React.useState<any>();
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [selectedData, setSelectedData] = React.useState<any>(null);
    const [downloading, setDownloading] = React.useState<boolean>(false);
    const [press, setPress] = React.useState<boolean>(false);
    const [pdfPreviewUrl, setPdfPreviewUrl] = React.useState<string>('');
    const [loadingPreview, setLoadingPreview] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState({
        titulo: 'CERTIFICADO',
        subtitulo: 'DE RECONOCIMIENTO',
        descripcion: `por su destacada participación en la olimpiada,`,
    });

    useStaticData({
        data: data,
        setData: setDatos,
        setOpenDialog: setOpenDialog,
        setSelectedData: setSelectedData
    });

    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            setDownloading(false);
            setOpenDialog(false);

        }, 2500);
        return () => clearTimeout(timeOut);
    }, [press])

    // Generar preview del PDF cuando cambie el formulario
    React.useEffect(() => {
        if (openDialog && selectedData) {
            setLoadingPreview(true);
            const generatePreview = async () => {
                try {
                    const url = await generarPreviewPDF(
                        selectedData?.area || 'Área',
                        selectedData?.encargado,
                        formData.titulo,
                        formData.subtitulo,
                        formData.descripcion,
                    );
                    setPdfPreviewUrl(url);
                } catch (error) {
                    console.error('Error generando preview:', error);
                } finally {
                    setLoadingPreview(false);
                }
            };
            generatePreview();
        }
    }, [openDialog, selectedData, formData]);

    // Limpiar URL del blob cuando se cierre el diálogo
    React.useEffect(() => {
        return () => {
            if (pdfPreviewUrl) {
                URL.revokeObjectURL(pdfPreviewUrl);
            }
        };
    }, [pdfPreviewUrl]);


    const handleGenerateCertificates = () => {
        setPress(prev => !prev);
        console.log('Generando certificados con:', {
            ...formData,
            ganadores: selectedData.ganadores
        });

        setDownloading(true);
        generarCertificados(selectedData, selectedData?.area, selectedData?.encargado, formData);

        // Reset form
        setFormData({
            titulo: 'CERTIFICADO',
            subtitulo: 'DE RECONOCIMIENTO',
            descripcion: `por su destacada participación en la olimpiada,`,
        });
    };

    return (
        <SidebarProvider>
            {data && <AppSidebar />}
            <SidebarInset>
                <Header />
                <div className="container mx-auto px-4">
                    <div className="flex w-full flex-row gap-6 p-4 items-center">
                        <BookCopy />
                        <Label className="text-2xl">Generar documentos</Label>
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <SectionAccountingOlimpistas datos={datos} />
                    </div>

                </div>
                <Dialog open={downloading} onOpenChange={setDownloading}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center">
                                Descargando certificados...
                            </DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-center items-center py-8">
                            <Spinner className="h-12 w-12" />
                        </div>
                        <DialogDescription className="text-center text-muted-foreground">
                            Por favor espera mientras se cargan los certificados.
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
                {/* Dialog para generar certificados */}
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="max-h-[90vh] max-w-[95vw] lg:max-w-[1400px] border-border/50 bg-card/95 backdrop-blur-xl overflow-hidden flex flex-col">

                        <DialogHeader className="relative z-10 flex-shrink-0">
                            <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                                <Award className="h-6 w-6 text-primary" />
                                Generar Certificados
                            </DialogTitle>
                            <DialogDescription>
                                Configura los detalles para generar los certificados de los ganadores
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-hidden flex flex-col xl:flex-row gap-4">
                            {/* Columna izquierda - Formulario */}
                            <div className="flex-1 xl:w-1/3 overflow-y-auto">
                                <Card className="w-full">
                                    <CardContent className="space-y-4">
                                        {/* Alertas */}

                                        {/* {apiError && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{apiError}</AlertDescription>
                                    </Alert>
                                )} */}
                                        {/* Información de ganadores */}
                                        {selectedData && (
                                            <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Users className="h-4 w-4 text-primary" />
                                                    <p className="text-sm font-semibold text-primary">
                                                        Ganadores seleccionados
                                                    </p>
                                                </div>
                                                <p className="text-sm text-foreground">
                                                    <span className="font-bold">{selectedData?.integrantes?.length || 0}</span> ganadores
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Área: {selectedData?.area || 'N/A'} - Nivel: {selectedData?.nivel || 'N/A'}
                                                </p>
                                            </div>
                                        )}

                                        {/* Formulario */}
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="titulo" className="text-sm font-semibold">
                                                    Título del Certificado
                                                </Label>
                                                <Input
                                                    id="titulo"
                                                    placeholder="Ej: Primer Lugar en Olimpiadas de Matemáticas"
                                                    value={formData.titulo}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        titulo: e.target.value
                                                    }))}
                                                    className="bg-background/60 border-border/50 focus:border-primary/50"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="subtitulo" className="text-sm font-semibold">
                                                    Organización
                                                </Label>
                                                <Input
                                                    id="subtitulo"
                                                    value={formData.subtitulo}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        subtitulo: e.target.value
                                                    }))}
                                                    className="bg-background/60 border-border/50 focus:border-primary/50"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="descripcion" className="text-sm font-semibold">
                                                    Descripcion
                                                </Label>
                                                <Input
                                                    id="descripcion"
                                                    value={formData.descripcion}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        descripcion: e.target.value
                                                    }))}
                                                    className="bg-background/60 border-border/50 focus:border-primary/50"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Columna derecha - Vista previa del PDF */}
                            <div className="flex-1 xl:w-2/3 overflow-hidden">
                                <Card className="w-full h-full">
                                    <CardContent className="p-4 h-full flex flex-col">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FileText className="h-4 w-4 text-primary" />
                                            <p className="text-sm font-semibold">Vista Previa del Certificado</p>
                                        </div>
                                        <div className="flex-1 border rounded-lg overflow-hidden bg-muted/30">
                                            {loadingPreview ? (
                                                <div className="flex items-center justify-center h-full">
                                                    <Spinner className="h-8 w-8" />
                                                </div>
                                            ) : pdfPreviewUrl ? (
                                                <iframe
                                                    src={`${pdfPreviewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                                    className="w-full h-full border-0"
                                                    title="Vista previa del certificado"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                                    <p className="text-sm">No hay vista previa disponible</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <DialogFooter className="relative z-10 mt-4 flex-shrink-0">
                            <Button
                                variant="outline"
                                onClick={() => setOpenDialog(false)}
                                className="hover:bg-muted"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleGenerateCertificates}
                                disabled={!formData.titulo.trim()}
                                className="bg-primary hover:bg-primary/90"
                            >
                                <Award className="h-4 w-4 mr-2" />
                                Generar Certificados
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </SidebarInset>
        </SidebarProvider>
    );
}
