import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox, useComboboxField } from "@/components/Combobox";
import { UsuarioForm } from "./interfaces/Usuario";
import { createUsuario, getStaticData } from "@/api/Usuarios";
import { AlertCircle, CheckCircle } from "lucide-react";
import { validationRules } from "./validations/UsuarioValidate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

export default function FormUsuario({ tipoUsuario }: { tipoUsuario: string }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);

    const [areas, setAreas] = React.useState<any[]>([]);
    const [roles, setRoles] = React.useState<any[]>([]);
    const [niveles, setNiveles] = React.useState<any[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        trigger,
    } = useForm<UsuarioForm>({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            ci: "",
            celular: "",
            email: "",
            areas: [],
            rol: "",
            nivel: 0,
        }
    });

    React.useEffect(() => {
        const staticData = async () => {
            const staticData = await getStaticData();
            setAreas(staticData.areas);
            setRoles(staticData.roles);
        };
        staticData();
    }, []);

    React.useEffect(() => {
        setValue('rol', 'EVA');
        if (tipoUsuario !== "Evaluador") {
            setValue('rol', 'EDA');
        }
    }, [tipoUsuario])


    // const rolesField = useComboboxField("rol", setValue, false, trigger);
    const areaField = useComboboxField("areas", setValue, false, trigger);
    const rolField = useComboboxField("rol", setValue, false, trigger);

    React.useEffect(() => {
        if (areaField.value.length > 0) {
            setNiveles(areas.find((area) => area.value === areaField.value[0]).niveles);
        }
    }, [areaField]);

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
                    <AlertDialogTitle className="text-center" />
                    {isLoading && (
                        <>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-center">
                                    Registrando usuario...
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="flex justify-center items-center py-8">
                                <Spinner className="h-12 w-12" />
                            </div>
                            <AlertDialogDescription className="text-center text-muted-foreground">
                                Por favor espera mientras se registran los datos.
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
                                <AlertTitle>Error al guardar</AlertTitle>
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
                                <AlertTitle className="text-green-800">Registro exitoso</AlertTitle>
                                <AlertDescription className="text-green-700">
                                    El usuario se registró exitosamente.
                                </AlertDescription>
                            </Alert>
                        </>
                    )}
                </AlertDialogContent>
            </AlertDialog>
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Registro de Usuario</CardTitle>
                    <CardDescription>
                        Complete todos los campos para crear una nueva cuenta de usuario
                    </CardDescription>
                </CardHeader>

                <div>
                    <CardContent className="space-y-4">
                        {/* Grid para organizar campos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Campo Roles */}
                            <div className="space-y-2">
                                <Label htmlFor="fases">
                                    Rol usuario <span className="text-red-500">*</span>
                                </Label>
                                <Combobox
                                    items={roles}
                                    value={rolField.value}
                                    onChange={rolField.onChange}
                                    placeholder="Seleccionar tipo fase..."
                                    searchPlaceholder="Buscar tipo fase..."
                                    multiple={false}
                                />
                                {errors.nivel && (
                                    <p className="text-sm text-red-500">Debe seleccionar al menos un tipo de fase</p>
                                )}
                            </div>
                            {/* Campo Nombre */}
                            <div className="space-y-2">
                                <Label htmlFor="nombre">
                                    Nombres <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="nombre"
                                    type="text"
                                    placeholder="Juan Carlos"
                                    {...register("nombre", validationRules.nombres)}
                                    className={errors.nombre ? "border-red-500" : ""}
                                />
                                {errors.nombre && (
                                    <p className="text-sm text-red-500">{errors.nombre.message}</p>
                                )}
                            </div>

                            {/* Campo Apellido Paterno */}
                            <div className="space-y-2">
                                <Label htmlFor="apellido_paterno">
                                    Apellido Paterno <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="apellido_paterno"
                                    type="text"
                                    placeholder="García"
                                    {...register("apellido_paterno", validationRules.apellido_paterno)}
                                    className={errors.apellido_paterno ? "border-red-500" : ""}
                                />
                                {errors.apellido_paterno && (
                                    <p className="text-sm text-red-500">{errors.apellido_paterno.message}</p>
                                )}
                            </div>

                            {/* Campo Apellido Materno */}
                            <div className="space-y-2">
                                <Label htmlFor="apellido_materno">
                                    Apellido Materno <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="apellido_materno"
                                    type="text"
                                    placeholder="López"
                                    {...register("apellido_materno", validationRules.apellido_materno)}
                                    className={errors.apellido_materno ? "border-red-500" : ""}
                                />
                                {errors.apellido_materno && (
                                    <p className="text-sm text-red-500">{errors.apellido_materno.message}</p>
                                )}
                            </div>

                            {/* Campo CI */}
                            <div className="space-y-2">
                                <Label htmlFor="ci">
                                    Cédula de Identidad <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="ci"
                                    type="string"
                                    placeholder="12345678"
                                    {...register("ci", validationRules.ci)}
                                    className={errors.ci ? "border-red-500" : ""}
                                />
                                {errors.ci && (
                                    <p className="text-sm text-red-500">{errors.ci.message}</p>
                                )}
                            </div>

                            {/* Campo Celular */}
                            <div className="space-y-2">
                                <Label htmlFor="celular">
                                    Celular <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="celular"
                                    type="tel"
                                    placeholder="70123456"
                                    {...register("celular", validationRules.celular)}
                                    className={errors.celular ? "border-red-500" : ""}
                                />
                                {errors.celular && (
                                    <p className="text-sm text-red-500">{errors.celular.message}</p>
                                )}
                            </div>

                            {/* Campo Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="usuario@example.com"
                                    {...register("email", validationRules.email)}
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Campo Áreas */}
                            <div className="space-y-2">
                                <Label htmlFor="areas">
                                    Áreas <span className="text-red-500">*</span>
                                </Label>
                                <Combobox
                                    items={areas}
                                    value={areaField.value}
                                    onChange={areaField.onChange}
                                    placeholder="Seleccionar área..."
                                    searchPlaceholder="Buscar área..."
                                    multiple={false}
                                />
                                {errors.areas && (
                                    <p className="text-sm text-red-500">{errors.areas.message}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <Button
                            type="button"
                            onClick={() => {
                                setApiError("");
                                setSuccess(false);
                                setDialogOpen(true);
                                handleSubmit(
                                    async (data) => {
                                        await createUsuario(
                                            data,
                                            areaField.value as string[],
                                            rolField.value as number[],
                                            setIsLoading,
                                            setSuccess,
                                            setApiError,
                                            reset,
                                            () => areaField.reset(),
                                            () => rolField.reset(),
                                        );
                                    }
                                )();
                            }}
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Registrando..." : "Registrar Usuario"}
                        </Button>

                        {!success && (
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    reset();
                                    setApiError("");
                                }}
                            >
                                Limpiar Formulario
                            </Button>
                        )}
                    </CardFooter>
                </div>
            </Card>
        </>
    );
};