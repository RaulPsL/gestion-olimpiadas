import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/Combobox";
import { DateTimePicker } from "@/components/DateTimePicker";

export default function FormFase() {
    // const { register } = useFormContext();

    return (
        <Card className="w-full max-w-sm">
            {/* <CardHeader>
                <CardTitle>Registro de olimpistas</CardTitle>
                <CardDescription>
                    Ingrese los campos que son obligatrios para el registro
                </CardDescription>
            </CardHeader> */}
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <DateTimePicker titleDate="Fecha inicio" titleTime="Hora inicio" />
                        <DateTimePicker titleDate="Fecha fin" titleTime="Hora Fin" />
                        <div className="grid gap-2">
                            <Label htmlFor="password">Cantidad participantes</Label>
                            <Input 
                                id="password" 
                                type="number"
                                placeholder="201938384"
                                required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="area">Area de concurso</Label>
                            <Combobox /> 
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="area">Evaluador</Label>
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
    );
};