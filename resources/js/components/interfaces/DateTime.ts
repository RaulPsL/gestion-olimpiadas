export interface DateTimePickerProps {
  titleDate: string;
  titleTime: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabledTime?: boolean;
  disabledDate?: any[];
  disabledCalendar?: boolean;
  placeholder?: string;
}