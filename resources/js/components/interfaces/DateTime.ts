export interface DateTimePickerProps {
  titleDate: string;
  titleTime: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
}