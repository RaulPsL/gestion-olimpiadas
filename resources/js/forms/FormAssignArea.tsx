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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DialogClose, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth, UserData } from "@/hooks/use-context";
import { useFilterAreasUser } from "@/hooks/use-areas-user";

export default function FormAssignArea({ otherData }: { otherData: any }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);

    const [areas, setAreas] = React.useState<any[]>([]);
    const [niveles, setNiveles] = React.useState<any[]>([]);
    const { data } = useAuth();
    const [areasFiltradas, setAreasFiltradas] = React.useState<any[]>([]);

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
        const staticData = async () => {
            const staticData = await getStaticData();
            setAreas(staticData.areas);
        };
        staticData();
    }, []);

    // Filtrar las areas segun las areas del usuario (SOLO UNA VEZ)
    useFilterAreasUser(areas, data as UserData, areasFiltradas, setAreasFiltradas);

    const areaField = useComboboxField("areas", setValue, false, trigger);
    const nivelField = useComboboxField("nivel", setValue, false, trigger);

    React.useEffect(() => {
        if (areaField.value.length > 0) {
            setNiveles(areas.find((area) => area.value === areaField.value[0]).niveles);
        }
    }, [areaField]);

    React.useEffect(() => {
        const nombre_apellidos = otherData.nombre.split(' ');
        setValue('nombre', nombre_apellidos[0]);
        setValue('apellido_paterno', nombre_apellidos[1]);
        setValue('celular', otherData.celular);
        setValue('ci', otherData.ci);
        setValue('email', otherData.email);
    }, [otherData]);

    React.useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }

    }, [isLoading]);

    return (
        <>
            <DialogHeader>
                <DialogTitle>Asignación de área</DialogTitle>
                <DialogDescription>
                    Solo se puede agregar hasta 3 áreas para un usuario.
                </DialogDescription>
            </DialogHeader>

            <div>
                <CardContent className="space-y-4">
                    {/* Alertas de éxito o error */}
                    {success && (
                        <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                                ¡Usuario registrado exitosamente!
                            </AlertDescription>
                        </Alert>
                    )}

                    {apiError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                {apiError}
                            </AlertDescription>
                        </Alert>
                    )}

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
                                    value={otherData.nombre}
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
                                    value={otherData.celular}
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

                            {/* Campo Áreas */}
                            <div className="space-y-2">
                                <Label htmlFor="areas">
                                    Áreas
                                </Label>
                                <Combobox
                                    items={areasFiltradas}
                                    value={areaField.value}
                                    onChange={areaField.onChange}
                                    placeholder="Seleccionar área..."
                                    searchPlaceholder="Buscar área..."
                                    multiple={true}
                                />
                            </div>

                            {/* Campo Niveles */}
                            <div className="space-y-2">
                                <Label htmlFor="areas">
                                    Niveles
                                </Label>
                                <Combobox
                                    items={niveles}
                                    value={nivelField.value}
                                    onChange={nivelField.onChange}
                                    placeholder="Seleccionar nivel..."
                                    searchPlaceholder="Buscar nivel..."
                                    multiple={true}
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

                <CardFooter className="flex flex-col gap-3">
                    <Button
                        type="button"
                        onClick={
                            handleSubmit(
                                (data) => updateUsuario(
                                    otherData.ci,
                                    data,
                                    areaField.value as string[],
                                    nivelField.value as number[],
                                    setIsLoading,
                                    setSuccess,
                                    setApiError,
                                    () => areaField.reset(),
                                    () => nivelField.reset(),
                                )
                            )}
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Asignando..." : "Asignar área"}
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