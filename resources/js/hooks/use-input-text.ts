import { useCallback } from "react";

export function useOnlyLetters() {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ""); 
    // solo letras y espacios
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
    if (allowedKeys.includes(e.key)) return;

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/.test(e.key)) {
      e.preventDefault();
    }
  }, []);

  return { handleChange, handleKeyDown };
}
