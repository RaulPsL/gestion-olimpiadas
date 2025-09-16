import { AreaChart, Table } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import TableAreas from "@/tables/TableAreas";
import TableFases from "@/tables/TableFases";

export default function PageArea() {
    return (
        <div className="container mx-auto py-10">
            <div>
                <AreaChart />
                <Label className="text-2xl">Gestion de Areas</Label>
            </div>
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
                >
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <Table className="h-4 w-4" />
                        Tabla de areas
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <TableAreas />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <Table className="h-4 w-4" />
                        Tabla de fases por area
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <TableFases />
                    </AccordionContent>
                </AccordionItem>
                {/* <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <User className="h-4 w-4" />
                        Registro de area
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <FormUsuarioInterno tipoUsuario={"evaluador"} />
                    </AccordionContent>
                </AccordionItem> */}
            </Accordion>
        </div>
    );
}