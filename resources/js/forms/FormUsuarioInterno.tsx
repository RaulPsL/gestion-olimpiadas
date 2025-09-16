import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/Combobox";

export default function FormUsuarioInterno({ tipoUsuario }) {
    // const { register } = useFormContext();

    return (
        <div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Registro de {tipoUsuario} </CardTitle>
                    <CardDescription>
                        Ingrese los campos que son obligatrios para el registro
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div>
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@est.umss.edu"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cedula">C.I.</Label>
                                <Input 
                                    id="cedula" 
                                    type="number"
                                    placeholder="12345678"
                                    required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="area">Area</Label>
                                <Combobox /> 
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button 
                        // type="submit"
                        className="w-full">
                        Reistrar
                    </Button>
                    {/* <Button variant="outline" className="w-full">
                        Login with Google
                    </Button> */}
                </CardFooter>
            </Card>
        </div>
    );
};