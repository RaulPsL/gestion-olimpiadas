import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ComboboxProps } from "./interfaces/Combobox";
import { UseFormSetValue, FieldValues, Path } from "react-hook-form";

export function Combobox({
  items = [],
  value = [],
  onChange,
  placeholder = "Seleccionar opción...",
  multiple = false,
  disabled = false,
  searchPlaceholder = "Buscar...",
  emptyMessage = "No se encontraron resultados.",
  className = ""
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const getLabelByValue = (searchValue: string | number): string => {
    const item = items.find(item => item.value === searchValue);
    return item?.label || String(searchValue);
  };

  // Función para manejar la selección
  const handleSelect = (selectedValue: string | number) => {
    if (multiple) {
      const newValue = value.includes(selectedValue)
        ? value.filter(v => v !== selectedValue)
        : [...value, selectedValue];
      onChange?.(newValue);
    } else {
      const newValue = value.includes(selectedValue) ? [] : [selectedValue];
      onChange?.(newValue);
      setOpen(false);
    }
  };

  // Función para remover un elemento (solo para multiple)
  const removeItem = (valueToRemove: string | number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newValue = value.filter(v => v !== valueToRemove);
    onChange?.(newValue);
  };

  // Renderizar el contenido del trigger
  const renderTriggerContent = () => {
    if (value.length === 0) {
      return <span className="text-muted-foreground">{placeholder}</span>;
    }

    if (multiple) {
      if (value.length === 1) {
        return getLabelByValue(value[0]);
      }
      return `${value.length} elementos seleccionados`;
    } else {
      return getLabelByValue(value[0]);
    }
  };

  // Renderizar chips para selección múltiple
  const renderMultipleChips = () => {
    if (!multiple || value.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {value.map((selectedValue) => {
          const item = items.find(item => item.value === selectedValue);
          return (
            <div
              key={selectedValue}
              className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-sm text-xs"
            >
              <span>{item?.label || String(selectedValue)}</span>
              <button
                type="button"
                onClick={(e) => removeItem(selectedValue, e)}
                className="hover:bg-secondary-foreground/20 rounded-full p-0.5"
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
            disabled={disabled}
          >
            {renderTriggerContent()}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popper-anchor-width] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder={searchPlaceholder} 
              className="h-9" 
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => {
                  const isSelected = value.includes(item.value);
                  return (
                    <CommandItem
                      key={item.id}
                      value={String(item.value)}
                      onSelect={() => handleSelect(item.value)}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      {/* Renderizar chips para selección múltiple */}
      {renderMultipleChips()}
    </div>
  );
}

export function useComboboxField<T extends FieldValues>(
  name: Path<T>,
  setValue: UseFormSetValue<T>,
  multiple: boolean = false
) {
  const [selectedValues, setSelectedValues] = React.useState<(string | number)[]>([]);

  const handleChange = (values: (string | number)[]) => {
    setSelectedValues(values);
    if (multiple) {
      setValue(name, values as any);
    } else {
      setValue(name, (values[0] ?? "") as any);
    }
  };

  const reset = () => {
    setSelectedValues([]);
    setValue(name, (multiple ? [] : "") as any);
  };

  return {
    value: selectedValues,
    onChange: handleChange,
    reset
  };
}

