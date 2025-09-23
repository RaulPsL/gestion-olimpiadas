import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { LogIn } from "lucide-react";
import React from "react";

export default function PageLogin() {
    return (
        <SidebarProvider>
            <SidebarInset>
                <Header role={false} home={false} />
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
                                    Ingresa tu email y contraseña
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@fcyt.umss.bo"
                                        required
                                    />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                ¿Olvido su contraseña?
                                            </a>
                                        </div>
                                        <Input id="password" type="password" required />
                                    </div>
                                </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <Button type="submit" className="w-full">
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