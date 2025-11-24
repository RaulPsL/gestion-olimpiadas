export const useFormatDate = (fecha: string | null | undefined): string => {
  if (!fecha) return '-';
  
  const date = new Date(fecha);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes} ${day}/${month}/${year}`;
};