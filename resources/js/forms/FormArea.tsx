import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { CheckCircle, CircleAlert, Plus, SaveAll, Trash2, X } from 'lucide-react';
import { Combobox, useComboboxField } from '@/components/Combobox';
import { AreaForm, Nivel } from './interfaces/Area';
import { createArea, getStaticData } from '@/api/Areas';
import { DataTable } from '@/components/tables/DataTable';
import { createColumns } from '@/components/tables/ColumnsNivel';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function FormArea() {

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        reset,
        formState: { errors },
    } = useForm<AreaForm>({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {
            nombre: '',
            sigla: '',
            descripcion: '',
            niveles: [],
            evaluadores: [],
            encargados: [],
            grados: [],
        },
    });

    const evaluadoresField = useComboboxField('evaluadores', setValue, true, trigger);
    const encargadosField = useComboboxField('encargados', setValue, true, trigger);

    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [success, setSuccess] = React.useState<boolean>(false);
    const [openLoading, setOpenLoading] = React.useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [nivelesAgregados, setNivelesAgregados] = React.useState<Nivel[]>([]);
    const [nivelesBackend, setNivelesBackend] = React.useState<any[]>([]);
    const [grados, setGrados] = React.useState<any[]>([]);
    const [evaluadores, setEvaluadores] = React.useState<any[]>([]);
    const [encargados, setEncargados] = React.useState<any[]>([]);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [modoEdicion, setModoEdicion] = React.useState<boolean>(false);
    const [press, setPress] = React.useState<boolean>(false);
    const [indiceEdicion, setIndiceEdicion] = React.useState<number | null>(null);

    // Estado para el nuevo nivel en el diálogo
    const [nuevoNivel, setNuevoNivel] = React.useState<Nivel>({
        nombre: '',
        grados: [],
        gradosInfo: [],
    });

    React.useEffect(() => {
        const staticData = async () => {
            const data = await getStaticData();
            setNivelesBackend(data.niveles);
            setEvaluadores(data.evaluadores);
            setEncargados(data.encargados);
            setGrados(data.grados);
        }
        staticData();
    }, []);


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

    // Función para resetear todo el formulario
    const resetearFormulario = () => {
        reset();
        setValue('evaluadores', []);
        setValue('encargados', []);
        setValue('niveles', []);
        setNivelesAgregados([]);
        setApiError("");
        setSuccess(false);
    };

    const agregarNivel = () => {
        // Convertir a string y validar
        const nombreNivel = typeof nuevoNivel.nombre === 'string'
            ? nuevoNivel.nombre
            : String(nuevoNivel.nombre || '');

        if (!nombreNivel.trim()) {
            alert('Por favor ingresa un nombre para el nivel');
            return;
        }

        if (nuevoNivel.grados.length === 0) {
            alert('Por favor selecciona al menos un grado');
            return;
        }

        // Preparar nivel con IDs para el formulario y info completa para la tabla
        const nivelParaGuardar = {
            nombre: nombreNivel,
            grados: nuevoNivel.grados, // Ya son IDs
            gradosInfo: nuevoNivel.gradosInfo, // Info completa para mostrar
        };

        let nuevosNiveles;

        if (modoEdicion && indiceEdicion !== null) {
            // Modo edición: actualizar el nivel existente
            nuevosNiveles = [...nivelesAgregados];
            nuevosNiveles[indiceEdicion] = nivelParaGuardar;
        } else {
            // Modo agregar: añadir nuevo nivel
            nuevosNiveles = [...nivelesAgregados, nivelParaGuardar];
        }

        setNivelesAgregados(nuevosNiveles);

        // Registrar en el formulario solo con IDs
        const nivelesParaFormulario = nuevosNiveles.map(nivel => ({
            nombre: nivel.nombre,
            grados: nivel.grados, // Solo IDs
        }));
        setValue('niveles', nivelesParaFormulario);

        // Resetear el formulario y estados
        setNuevoNivel({
            nombre: '',
            grados: [],
            gradosInfo: [],
        });
        setModoEdicion(false);
        setIndiceEdicion(null);
        setOpenDialog(false);
        setPress(false);
    };

    const eliminarNivel = (index: number) => {
        const nuevosNiveles = nivelesAgregados.filter((_, i) => i !== index);
        setNivelesAgregados(nuevosNiveles);

        // Registrar en el formulario solo con IDs
        const nivelesParaFormulario = nuevosNiveles.map(nivel => ({
            nombre: nivel.nombre,
            grados: nivel.grados, // Solo IDs
        }));
        setValue('niveles', nivelesParaFormulario);
    };

    const editarNivel = (index: number, nivel: Nivel) => {
        setNuevoNivel(nivel);
        setModoEdicion(true);
        setIndiceEdicion(index);
        setOpenDialog(true);
    };

    const abrirDialogoNuevo = () => {
        setNuevoNivel({ nombre: '', grados: [], gradosInfo: [] });
        setModoEdicion(false);
        setIndiceEdicion(null);
        setPress(false);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setApiError('');
        setIsLoading(false);
        setSuccess(false)
    };

    const columnsWithActions = React.useMemo(
        () => createColumns({
            onEdit: editarNivel,
            onDelete: eliminarNivel,
        }),
        [nivelesAgregados]
    );

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
                                    Registrando área...
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
                                <CircleAlert className="h-4 w-4" />
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
                                <AlertTitle className="text-green-800">Registro de área correcto</AlertTitle>
                                <AlertDescription className="text-green-700">
                                    Eñl área y los niveles se registraron exitosamente.
                                </AlertDescription>
                            </Alert>
                        </>
                    )}
                </AlertDialogContent>
            </AlertDialog>
            <Card className="w-full max-w-5xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">Registro de Área</CardTitle>
                    <CardDescription>
                        Completa la información del área académica, asigna personal y configura los niveles educativos
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Sección: Información Básica */}
                    <div className="space-y-4 rounded-lg border p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombre">
                                    Nombre del Área <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="nombre"
                                    {...register('nombre', {
                                        required: 'El nombre es requerido',
                                    })}
                                    placeholder="Ej: ASTRONOMÍA - ASTROFÍSICA"
                                    className={errors.nombre ? 'border-destructive' : ''}
                                />
                                {errors.nombre && (
                                    <p className="text-sm text-destructive">
                                        {errors.nombre.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sigla">
                                    Sigla <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="sigla"
                                    {...register('sigla', {
                                        required: 'La sigla es requerida',
                                    })}
                                    placeholder="Ej: ASTRO"
                                    className={errors.sigla ? 'border-destructive' : ''}
                                />
                                {errors.sigla && (
                                    <p className="text-sm text-destructive">
                                        {errors.sigla.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="descripcion">Descripción</Label>
                            <Textarea
                                id="descripcion"
                                {...register('descripcion')}
                                placeholder="Descripción del área..."
                                rows={3}
                                className="resize-none"
                            />
                        </div>
                    </div>

                    {/* Sección: Layout de dos columnas */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border p-4">
                            <div className="space-y-2">
                                <Label>Evaluadores</Label>
                                <Combobox
                                    items={evaluadores}
                                    value={evaluadoresField.value}
                                    onChange={evaluadoresField.onChange}
                                    placeholder="Seleccionar evaluadores..."
                                    searchPlaceholder="Buscar evaluadores..."
                                    multiple={true}
                                />
                                {errors.evaluadores && (
                                    <p className="text-sm text-red-500">{errors.evaluadores.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label>Encargados de área</Label>
                                <Combobox
                                    items={encargados}
                                    value={encargadosField.value}
                                    onChange={encargadosField.onChange}
                                    placeholder="Seleccionar encargados..."
                                    searchPlaceholder="Buscar encargados..."
                                    multiple={true}
                                />
                                {errors.encargados && (
                                    <p className="text-sm text-red-500">{errors.encargados.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4 rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold mb-1">Niveles y Grados</h3>
                                    <p className="text-sm text-muted-foreground">Configura los niveles educativos</p>
                                </div>
                                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                    <DialogTrigger asChild>
                                        <Button
                                            type="button"
                                            onClick={abrirDialogoNuevo}
                                            variant="outline"
                                            size="sm"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Agregar
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-[95vw] w-full max-h-[90vh] h-fit flex flex-col">
                                        <DialogHeader>
                                            <DialogTitle className="text-lg">
                                                {modoEdicion ? 'Editar Nivel' : 'Agregar Nivel'}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <DialogDescription className="text-sm text-muted-foreground">
                                            {modoEdicion ? 'Edita la información del nivel' : 'Completa la información del nuevo nivel'}
                                        </DialogDescription>
                                        <Card>
                                            <CardContent className="pt-6">
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-medium">
                                                            Nombre del Nivel <span className="text-destructive">*</span>
                                                        </Label>
                                                        {
                                                            press ? (
                                                                <div className='flex flex-row space-x-4'>
                                                                    <Input
                                                                        value={nuevoNivel.nombre}
                                                                        onChange={(e) =>
                                                                            setNuevoNivel({ ...nuevoNivel, nombre: e.target.value })
                                                                        }
                                                                        placeholder="Ej: 3ro Primaria"
                                                                    />
                                                                    <Button
                                                                        variant={'ghost'}
                                                                        onClick={() => setPress(prev => !prev)}
                                                                    >
                                                                        Volver
                                                                    </Button>
                                                                </div>
                                                            ) : (
                                                                <div className='flex flex-row space-x-4'>
                                                                    <Combobox
                                                                        items={nivelesBackend}
                                                                        value={nuevoNivel.nombre ? [nuevoNivel.nombre] : []}
                                                                        onChange={(selectedValues) => {
                                                                            const nivelId = selectedValues[0] || '';
                                                                            const nivelEncontrado = nivelesBackend.find((nivel) => nivel.value === nivelId);

                                                                            if (nivelEncontrado) {
                                                                                // Extraer IDs de grados
                                                                                const gradosIds = nivelEncontrado.grados?.map((grado: any) => grado.value) || [];
                                                                                // Extraer info completa de grados
                                                                                const gradosCompletos = nivelEncontrado.grados?.map((grado: any) => ({
                                                                                    id: grado.value,
                                                                                    label: grado.label
                                                                                })) || [];

                                                                                setNuevoNivel({
                                                                                    ...nuevoNivel,
                                                                                    nombre: nivelEncontrado.label, // Guardar el LABEL, no el ID
                                                                                    grados: gradosIds, // IDs de los grados
                                                                                    gradosInfo: gradosCompletos, // Info completa de los grados
                                                                                });
                                                                            }
                                                                        }}
                                                                        placeholder='Seleccionar el nivel...'
                                                                        searchPlaceholder='Buscar el nivel...'
                                                                        multiple={false}
                                                                        className='w-full'
                                                                    />
                                                                    <Button
                                                                        variant={'ghost'}
                                                                        onClick={() => setPress(prev => !prev)}
                                                                    >
                                                                        Nuevo nivel
                                                                    </Button>
                                                                </div>
                                                            )
                                                        }
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-medium">
                                                            Grados asociados <span className="text-destructive">*</span>
                                                        </Label>
                                                        <Combobox
                                                            items={grados}
                                                            value={nuevoNivel.grados}
                                                            onChange={(selectedIds) => {
                                                                // Encontrar la información completa de los grados seleccionados
                                                                const gradosCompletos = grados.filter(grado =>
                                                                    selectedIds.includes(grado.value)
                                                                ).map(grado => ({
                                                                    id: grado.value,
                                                                    label: grado.label
                                                                }));

                                                                setNuevoNivel({
                                                                    ...nuevoNivel,
                                                                    grados: selectedIds, // IDs
                                                                    gradosInfo: gradosCompletos // Info completa
                                                                });
                                                            }}
                                                            placeholder='Seleccionar grados...'
                                                            searchPlaceholder='Buscar grados...'
                                                            multiple={true}
                                                            className='w-full'
                                                        />
                                                        {nuevoNivel.grados.length === 0 && (
                                                            <p className="text-xs text-muted-foreground">
                                                                Selecciona al menos un grado
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex justify-end gap-2 pt-4">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={() => {
                                                                setNuevoNivel({ nombre: '', grados: [], gradosInfo: [] });
                                                                setPress(false);
                                                                setOpenDialog(false);
                                                            }}
                                                        >
                                                            Cancelar
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            onClick={agregarNivel}
                                                        >
                                                            <Plus className="w-4 h-4 mr-2" />
                                                            {modoEdicion ? 'Guardar Cambios' : 'Agregar Nivel'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <DataTable
                                columns={columnsWithActions}
                                data={nivelesAgregados ?? []}
                                filter={false}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button
                        type="button"
                        className="w-full"
                        disabled={isLoading}
                        onClick={() => {
                            setApiError("");
                            setSuccess(false);
                            setDialogOpen(true);
                            handleSubmit(
                                async (data) => {
                                    await createArea(
                                        data,
                                        resetearFormulario,
                                        setIsLoading,
                                        setSuccess,
                                        setApiError
                                    );
                                }
                            )();
                        }}
                    >
                        {isLoading ? 'Creando...' : 'Crear Área'}
                    </Button>
                    <Button
                        type="button"
                        className="w-full"
                        variant="outline"
                        onClick={resetearFormulario}
                    >
                        Cancelar
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
