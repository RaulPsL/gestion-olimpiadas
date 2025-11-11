import { useCallback } from "react";

export function useOnlyNumbers() {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\D/g, ""); // elimina todo lo que no sea número
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permitir teclas de control: backspace, tab, arrows, etc.
    const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
    if (allowedKeys.includes(e.key)) return;

    // Evitar cualquier tecla que no sea número
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }, []);

  return { handleChange, handleKeyDown };
}
