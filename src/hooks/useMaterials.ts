import { useState, useEffect } from "react";
import { IMaterial } from "../interfaces/types";

export const useMaterials = () => {
  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/materials.json");
        if (!response.ok) {
          throw new Error("Error al cargar los materiales");
        }
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error("Error al hacer el fetching:", error);
        setError(
          error instanceof Error ? error : new Error("Error desconocido")
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadMaterials();
  }, []);

  return { materials, isLoading, error };
};
