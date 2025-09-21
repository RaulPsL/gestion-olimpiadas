import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionInformation(
    { information }: { 
        information: [
            { 
                id: string,
                title: string,
                description: string,
            }
        ] 
    }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={ information[0].id }
    >
        {
            information.map((item) => (
                <AccordionItem value={item.id}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>{item.description}</p>
                    </AccordionContent>
                </AccordionItem>
            ))
        }
    </Accordion>
  )
}
