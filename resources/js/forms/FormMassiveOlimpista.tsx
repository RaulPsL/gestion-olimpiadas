import { createMassiveOlimpistas } from "@/api/Olimpistas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, Download, FileText, Upload } from "lucide-react";
import React from "react";

export default function FormMassiveOlimista() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [importResult, setImportResult] = React.useState<any>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
                                 'application/vnd.ms-excel', 'text/csv'];
            
            if (!allowedTypes.includes(file.type)) {
                setApiError("Solo se permiten archivos Excel (.xlsx, .xls) o CSV");
                setSelectedFile(null);
                return;
            }

            // Validar tamaño (máximo 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setApiError("El archivo no puede ser mayor a 10MB");
                setSelectedFile(null);
                return;
            }

            setSelectedFile(file);
            setApiError("");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setApiError("Debe seleccionar un archivo");
            return;
        }

        setIsLoading(true);
        setApiError("");
        setSuccess(false);

        try {
            const result = await createMassiveOlimpistas(selectedFile);
            
            setSuccess(true);
            setImportResult(result);
            setSelectedFile(null);

            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
            
        } catch (error: any) {
            console.error("Error al importar archivo:", error);
            
            if (error.response?.status === 422) {
                setApiError("Formato de archivo inválido. Verifique que tenga las columnas requeridas.");
            } else if (error.response?.status === 413) {
                setApiError("El archivo es demasiado grande.");
            } else {
                setApiError(error.response?.data?.message || "Error al procesar el archivo");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const downloadTemplate = () => {
        const csvContent = "nombres,apellido_paterno,apellido_materno,codigo_sis,semestre,estado,areas\n" +
                          "Juan,García,López,12345678,3,activo,MAT\n" +
                          "María,Rodríguez,Pérez,87654321,5,activo,\"MAT,FIS\"";
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "plantilla_olimpistas.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Importación Masiva de Olimpistas
                </CardTitle>
                <CardDescription>
                    Suba un archivo Excel o CSV para importar múltiples olimpistas de una vez
                </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
                {/* Alertas */}
                {success && (
                    <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                            ¡Importación exitosa! Se procesaron {importResult?.total || 0} olimpistas.
                        </AlertDescription>
                    </Alert>
                )}

                {apiError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{apiError}</AlertDescription>
                    </Alert>
                )}

                {/* Instrucciones */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Instrucciones:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• El archivo debe contener las columnas: nombres, apellido_paterno, apellido_materno, codigo_sis</li>
                        <li>• Columnas opcionales: semestre, estado, areas (separadas por comas)</li>
                        <li>• Formatos permitidos: .xlsx, .xls, .csv</li>
                        <li>• Tamaño máximo: 10MB</li>
                    </ul>
                </div>

                {/* Botón de plantilla */}
                <div className="flex justify-center">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={downloadTemplate}
                        className="flex items-center gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Descargar Plantilla
                    </Button>
                </div>

                {/* Selector de archivo */}
                <div className="space-y-4">
                    <Label htmlFor="file-upload" className="text-base font-medium">
                        Seleccionar Archivo
                    </Label>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        
                        <div className="space-y-2">
                            <Label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-500">
                                Haga clic para seleccionar un archivo
                            </Label>
                            <Input
                                id="file-upload"
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <p className="text-sm text-gray-500">
                                o arrastre y suelte aquí
                            </p>
                        </div>

                        {selectedFile && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-900">
                                    Archivo seleccionado:
                                </p>
                                <p className="text-sm text-gray-600">
                                    {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
                <Button 
                    type="button"
                    onClick={handleUpload}
                    className="w-full"
                    disabled={isLoading || !selectedFile}
                >
                    {isLoading ? "Procesando..." : "Importar Olimpistas"}
                </Button>
                
                <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                        setSelectedFile(null);
                        setApiError("");
                        setSuccess(false);
                        setImportResult(null);
                        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                        if (fileInput) fileInput.value = '';
                    }}
                >
                    Limpiar
                </Button>
            </CardFooter>
        </Card>
    );
}