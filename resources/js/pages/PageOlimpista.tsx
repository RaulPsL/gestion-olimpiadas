import TableOlimpistas from "@/tables/TableOlimpista";
import FormOlimpista from "@/forms/FormOlimpista";
import { Input } from "@/components/ui/input";
import { DockIcon, Table, User } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";

export default function PageOlimpista() {
    return (
        <div className="container mx-auto py-10">
            <div>
                <User />
                <Label className="text-2xl">Olimpistas</Label>
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
                        Registro de olimpistas
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance items-center">
                        <FormOlimpista />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <Table className="h-4 w-4" />
                        Tabla Olimpistas
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <TableOlimpistas />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        <DockIcon className="h-4 w-4" />
                        Importar desde archivo
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <Input type="file" />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}