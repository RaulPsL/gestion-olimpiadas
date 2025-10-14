import { login } from "@/api/Usuarios";
import Header from "@/components/Header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { Login } from "@/forms/interfaces/LoginIntefase";
import { useAuth } from "@/hooks/use-context";
import { AlertCircle, CheckCircle, LogIn } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const rules = {
    ci: {
        required: "Debe ingresar la cedula de indentidad."
    },
    password: {
        required: "Debe ingresar la contraseña."
    }
}

export default function PageLogin() {
    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
        trigger
    } = useForm<Login>({
        defaultValues: {
            password: ""
        }
    });
    const [openSpinner, setOpenSpinner] = React.useState<boolean>(false);
    const [apiError, setApiError] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const { setToken, setData } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (success || apiError !== '') {
            const timer = setTimeout(() => {
                setOpenSpinner(false)
                if (success) {
                    navigate('/olimpistas/ver olimpistas');
                }
            }
            , 2500);
            return () => clearTimeout(timer);
        }
    }, [success, apiError]);

    const handleSendSubmit = async () => {
        const isValid = await trigger();
        if (isValid) {
            setOpenSpinner(true);
            handleSubmit(
                (data) => login(
                    data,
                    setApiError,
                    setIsLoading,
                    setSuccess,
                    setToken,
                    setData,
                    reset
                )
            )();
        }
    }

    return (
        <SidebarProvider>
            <SidebarInset>
                <Header />
                <div className="container mx-auto py-10">
                    <div className="flex w-full flex-col gap-6 p-4 items-center">
                        <div className="flex w-full flex-row gap-6 p-4 items-center justify-center">
                            <LogIn />
                            <Label className="text-2xl">Inicio de sesión</Label>
                        </div>
                        <Card className="w-full max-w-sm">
                            <CardHeader>
                                <CardTitle>Ingresa a tu cuenta</CardTitle>
                                <CardDescription>
                                    Ingresa tu cedula de identidad y contraseña
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {apiError !== '' && (
                                    <Alert variant="destructive" className="px-4">
                                        <AlertCircle className="h-4 w-4 px-4" />
                                        <AlertDescription>{apiError}</AlertDescription>
                                    </Alert>
                                )}
                                <AlertDialog
                                    open={openSpinner}
                                    onOpenChange={setOpenSpinner}
                                >    
                                    <AlertDialogContent>
                                        {
                                            success ? (
                                                <>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-center">
                                                        Ingresando al sistema...
                                                        </AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <div className="flex justify-center items-center py-8">
                                                        <Spinner className="h-12 w-12" />
                                                    </div>
                                                    <AlertDialogDescription className="text-center text-muted-foreground">
                                                        Por favor espere mientras se validan y obtienen los datos.
                                                    </AlertDialogDescription>
                                                </>
                                            ):(
                                                <>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-center">
                                                        Ingresando al sistema...
                                                        </AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <div className="flex justify-center items-center py-8">
                                                        <Spinner className="h-12 w-12" />
                                                    </div>
                                                    <AlertDialogDescription className="text-center text-muted-foreground">
                                                        Por favor espere mientras se validan y obtienen los datos.
                                                    </AlertDialogDescription>
                                                </>
                                            )
                                        }
                                    </AlertDialogContent>
                                </AlertDialog>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                    <Label htmlFor="ci">
                                        C.I. <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="ci"
                                        type="text"
                                        placeholder="7839209"
                                        { ...register('ci', rules.ci)}
                                        required
                                    />
                                    {
                                        errors.ci && (
                                            <p className="text-sm text-red-500">{errors.ci.message}</p>
                                        )
                                    }
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Password <span className="text-red-500">*</span>
                                            </Label>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                ¿Olvido su contraseña?
                                            </a>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="***********"
                                            { ...register('password', rules.password)}
                                            required
                                        />
                                        {
                                            errors.password && (
                                                <p className="text-sm text-red-500">{errors.password.message}</p>
                                            )
                                        }
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <Button
                                    type="button"
                                    className="w-full"
                                    onClick={handleSendSubmit}
                                >
                                    Login
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}