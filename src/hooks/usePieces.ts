import { useState, useEffect } from "react";
import { IPiece } from "../interfaces/types";

export const usePieces = () => {
  const [pieces, setPieces] = useState<IPiece[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        setIsLoading(true);
        const savedPieces = localStorage.getItem("pieces");

        if (savedPieces) {
          setPieces(JSON.parse(savedPieces));
          setIsLoading(false);
        } else {
          const response = await fetch("/pieces.json");
          if (!response.ok) {
            throw new Error("Error al cargar las piezas");
          }
          const data = await response.json();
          setPieces(data);
          localStorage.setItem("pieces", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error al cargar las piezas:", error);
        setError("Error al cargar las piezas. Intente más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPieces();
  }, []);

  const totalArea = pieces.reduce(
    (sum, piece) =>
      sum + (parseFloat(piece.ancho) * parseFloat(piece.largo)) / 1000000,
    0
  );

  const filteredPieces = selectedType
    ? pieces.filter((piece) => piece.tipo === selectedType)
    : pieces;

  const addPiece = (newPiece: IPiece) => {
    const updatedPieces = [...pieces, newPiece];
    setPieces(updatedPieces);
    localStorage.setItem("pieces", JSON.stringify(updatedPieces));
    return updatedPieces;
  };

  const deletePiece = (pieceName: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta pieza?")) {
      const updatedPieces = pieces.filter((piece) => piece.name !== pieceName);
      setPieces(updatedPieces);
      localStorage.setItem("pieces", JSON.stringify(updatedPieces));
    }
  };

  return {
    pieces,
    isLoading,
    error,
    totalArea,
    selectedType,
    setSelectedType,
    filteredPieces,
    addPiece,
    deletePiece,
  };
};
