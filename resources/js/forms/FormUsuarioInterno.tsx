import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox, useComboboxField } from "@/components/Combobox";
import { UsuarioForm } from "./interfaces/Usuario";
import { createUsuario, getStaticData } from "@/api/Usuarios";
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { validationRules } from "./validations/UsuarioValidate";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function FormUsuario({ tipoUsuario }: { tipoUsuario: string }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
    const [selectedFases, setSelectedFases] = React.useState<string[]>([]);
    const [selectedAreas, setSelectedAreas] = React.useState<string[]>([]);
    const [showPassword, setShowPassword] = React.useState(false);

    const [areas, setAreas] = React.useState<any[]>();
    const [roles, setRoles] = React.useState<any[]>();
    const [tipoFase, setTipoFase] = React.useState<any[]>();
    
    React.useEffect(() => {
        const staticData = async () => {
            const staticData = await getStaticData();
            setAreas(staticData.areas);
            setRoles(staticData.roles);
            setTipoFase(staticData.tipo_fases);
        };
        staticData();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
        getValues
    } = useForm<UsuarioForm>({
        defaultValues: {
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            ci: undefined,
            celular: "",
            email: "",
            password: "",
            confirmPassword: "",
            areas: [],
            rol: "",
            fases: []
        }
    });

    const rolesField = useComboboxField("rol", setValue, false);
    const areaField = useComboboxField("areas", setValue, false);
    const faseField = useComboboxField("fases", setValue, false);

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Registro de Usuario</CardTitle>
                <CardDescription>
                    Complete todos los campos para crear una nueva cuenta de usuario
                </CardDescription>
            </CardHeader>
            
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

                    {/* Grid para organizar campos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                type="number"
                                placeholder="12345678"
                                {...register("ci", {
                                    ...validationRules.ci,
                                    valueAsNumber: true
                                })}
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

                    {/* Campo Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">
                            Contraseña <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                {...register("password", validationRules.password)}
                                className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
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
                                multiple={true}
                            />
                            {selectedAreas.length === 0 && apiError.includes("areas") && (
                                <p className="text-sm text-red-500">Debe seleccionar al menos un rol</p>
                            )}
                        </div>

                        {/* Campo Roles */}
                        <div className="space-y-2">
                            <Label htmlFor="roles">
                                Roles <span className="text-red-500">*</span>
                            </Label>
                            <Combobox
                                items={roles}
                                value={rolesField.value}
                                onChange={rolesField.onChange}
                                placeholder="Seleccionar roles..."
                                searchPlaceholder="Buscar roles..."
                                multiple={false}
                            />
                            {selectedRoles.length === 0 && apiError.includes("rol") && (
                                <p className="text-sm text-red-500">Debe seleccionar al menos un rol</p>
                            )}
                        </div>

                        {/* Campo Roles */}
                        { (tipoUsuario === 'Evaluador') ? (
                            <div className="space-y-2">
                                <Label htmlFor="fases">
                                    Fases <span className="text-red-500">*</span>
                                </Label>
                                <Combobox
                                    items={tipoFase}
                                    value={faseField.value}
                                    onChange={faseField.onChange}
                                    placeholder="Seleccionar tipo fase..."
                                    searchPlaceholder="Buscar tipo fase..."
                                    multiple={true}
                                />
                                {/* {selectedFases.length === 0 && (
                                    <p className="text-sm text-red-500">Debe seleccionar al menos un tipo de fase</p>
                                )} */}
                            </div>
                          ) : (<></>) }
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                    <Button 
                        type="button"
                        onClick={
                            handleSubmit(
                                (data) => createUsuario(
                                    data,
                                    areaField.value as string[],
                                    rolesField.value as string[],
                                    faseField.value as string[],
                                    setIsLoading,
                                    setSuccess,
                                    setApiError,
                                    reset,
                                    () => areaField.reset(),
                                    () => rolesField.reset(),
                                    () => faseField.reset(),
                                )
                            )} 
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
    );
};