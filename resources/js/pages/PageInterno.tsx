import { Table, User } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import FormUsuarioInterno from "@/forms/FormUsuarioInterno";
import TableInternos from "@/tables/TableInterno";

export default function PageInterno() {
    return (
        <div className="container mx-auto py-10">
            <div>
                <User />
                <Label className="text-2xl">Coordinadores y evaluadores</Label>
            </div>
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
                >
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <User className="h-4 w-4" />
                        Registro de evaluadores
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance items-center">
                        <FormUsuarioInterno tipoUsuario={"Evaluador"}/>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <Table className="h-4 w-4" />
                        Tabla de evaluadores
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <TableInternos />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}