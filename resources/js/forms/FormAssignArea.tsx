import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox, useComboboxField } from "@/components/Combobox";
import { UsuarioForm } from "./interfaces/Usuario";
import { createUsuario, getStaticData, updateUsuario } from "@/api/Usuarios";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { DialogClose, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth, UserData } from "@/hooks/use-context";
import { useFilterAreasUser } from "@/hooks/use-areas-user";

export default function FormAssignArea({ otherData }: { otherData: any }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
    } = useForm<UsuarioForm>({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            nombre: "",
            apellido_paterno: "",
            ci: "",
            celular: "",
            email: "",
            areas: [],
            nivel: 0,
        }
    });

    React.useEffect(() => {
        const nombre_apellidos = otherData.nombre.split(' ');
        setValue('nombre', nombre_apellidos[0]);
        setValue('apellido_paterno', nombre_apellidos[1]);
        setValue('celular', otherData.celular);
        setValue('ci', otherData.ci);
        setValue('email', otherData.email);
    }, [otherData]);

    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (isLoading || apiError !== '') {
            setDialogOpen(true);
        }
        if (success) {
            const timer = setTimeout(() => {
                setDialogOpen(false);
                setSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isLoading, dialogOpen]);

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setApiError('');
        setIsLoading(false);
        setSuccess(false);
    };

    return (
        <>
            <AlertDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                defaultOpen={dialogOpen}>
                <AlertDialogTrigger asChild />

                <AlertDialogContent>
                    <AlertDialogTitle className="text-center"/>
                    {isLoading && (
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-center">
                                    Asignando área...
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="flex justify-center items-center py-8">
                                <Spinner className="h-12 w-12" />
                            </div>
                            <AlertDialogDescription className="text-center text-muted-foreground">
                                Por favor espera mientras se asigna el área.
                            </AlertDialogDescription>
                        </>
                    )}

                    {(apiError !== '') && (
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-red-500 text-center">
                                    Ocurrió un error
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error al asignar</AlertTitle>
                                <AlertDescription>
                                    {apiError}
                                </AlertDescription>
                            </Alert>
                            <AlertDialogFooter>
                                <AlertDialogAction onClick={handleCloseDialog}>
                                    Entendido
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </>
                    )}

                    {success && (
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-green-600 text-center">
                                    ¡Éxito en la acción!
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <Alert className="border-green-200 bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertTitle className="text-green-800">Asignación exitosa</AlertTitle>
                                <AlertDescription className="text-green-700">
                                    El área se asignó exitosamente al usuario.
                                </AlertDescription>
                            </Alert>
                        </>
                    )}
                </AlertDialogContent>
            </AlertDialog>
            <DialogHeader>
                <DialogTitle>Asignación de área</DialogTitle>
                <DialogDescription>
                    Solo se puede agregar hasta 3 áreas para un usuario.
                </DialogDescription>
            </DialogHeader>

            <div>
                <CardContent className="space-y-4">
                    <div>
                        {/* Grid para organizar campos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Campo Nombre */}
                            <div className="space-y-2">
                                <Label htmlFor="nombre">
                                    Nombres y apellidos
                                </Label>
                                <Input
                                    id="nombre"
                                    type="text"
                                    className="w-full"
                                    defaultValue={otherData.nombre}
                                    {...register('nombre', otherData.nombre.split(' ')[0])}
                                />
                            </div>

                            <div hidden>
                                <Input
                                    type="text"
                                    {...register('apellido_paterno', otherData.nombre.split(' ')[1])}
                                />
                            </div>
                            {/* Campo CI */}
                            <div className="space-y-2">
                                <Label htmlFor="ci">
                                    Cédula de Identidad
                                </Label>
                                <Input
                                    id="ci"
                                    type="string"
                                    value={otherData.ci}
                                    {...register('ci', otherData.ci)}
                                />
                            </div>

                            {/* Campo Celular */}
                            <div className="space-y-2">
                                <Label htmlFor="celular">
                                    Celular
                                </Label>
                                <Input
                                    id="celular"
                                    type="tel"
                                    defaultValue={otherData.celular}
                                    {...register('celular', otherData.celular)}
                                />
                            </div>

                            {/* Campo Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={otherData.email}
                                    {...register('email', otherData.email)}
                                />
                            </div>
                        </div>

                        {/* Campo áreas */}
                        <div className="w-full space-y-2">
                            <Label htmlFor="email">
                                Áreas asignadas
                            </Label>
                            <Input
                                readOnly
                                id="areas"
                                type="text"
                                value={otherData.areas}
                            />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 py-4">
                    <Button
                        type="button"
                        onClick={() => {
                            setApiError("");
                            setSuccess(false);
                            setDialogOpen(true);
                            handleSubmit(
                                async (data) => {
                                    await updateUsuario(
                                        otherData.ci,
                                        data,
                                        setIsLoading,
                                        setSuccess,
                                        setApiError,
                                    );
                                }
                            )();
                        }}
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Guardando cambios..." : "Editar usuario"}
                    </Button>
                    <Button
                        variant={'destructive'}
                        className="w-full"
                    >
                        <DialogClose>Cancelar</DialogClose>
                    </Button>
                </CardFooter>
            </div>
        </>
    );
};