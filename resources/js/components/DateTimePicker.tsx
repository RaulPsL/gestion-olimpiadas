import * as React from "react";
import { ChevronDown, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTimePickerProps } from "./interfaces/DateTime";

export function DateTimePicker({ titleDate, 
  titleTime, 
  value,
  onChange,
  disabled = false,
  placeholder = "Seleccionar fecha"
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(value);
  const [timeValue, setTimeValue] = React.useState<string>("");

  React.useEffect(() => {
    if (value) {
      setInternalDate(value);
      const hours = value.getHours().toString().padStart(2, '0');
      const minutes = value.getMinutes().toString().padStart(2, '0');
      const seconds = value.getSeconds().toString().padStart(2, '0');
      setTimeValue(`${hours}:${minutes}:${seconds}`);
    }
  }, [value]);

  const combineDateTime = (date: Date | undefined, time: string): Date | undefined => {
    if (!date) return undefined;
    
    const [hours, minutes, seconds] = time.split(':').map(num => parseInt(num) || 0);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, seconds, 0);
    
    return newDate;
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setInternalDate(selectedDate);
    setOpen(false);
    
    if (selectedDate && timeValue) {
      const combined = combineDateTime(selectedDate, timeValue);
      onChange?.(combined);
    } else if (selectedDate && !timeValue) {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:00`;
      setTimeValue(currentTime);
      const combined = combineDateTime(selectedDate, currentTime);
      onChange?.(combined);
    } else {
      onChange?.(undefined);
    }
  };

  // Manejar cambio de hora
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setTimeValue(newTime);
    
    if (internalDate && newTime) {
      const combined = combineDateTime(internalDate, newTime);
      onChange?.(combined);
    }
  };

  const formatDate = (date: Date | undefined): string => {
    if (!date) return placeholder;
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getDefaultTime = (): string => {
    if (timeValue) return timeValue;
    if (internalDate) {
      const hours = internalDate.getHours().toString().padStart(2, '0');
      const minutes = internalDate.getMinutes().toString().padStart(2, '0');
      const seconds = internalDate.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
    return "10:00:00";
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          { titleDate }
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-40 justify-between font-normal"
              disabled={disabled}
            >
              {formatDate(internalDate)}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={internalDate}
              captionLayout="dropdown"
              onSelect={handleDateChange}
              disabled={disabled}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          { titleTime }
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={getDefaultTime()}
          onChange={handleTimeChange}
          disabled={disabled}
          className="w-32 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  )
}
