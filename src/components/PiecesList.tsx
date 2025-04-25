import { useState } from "react";
import { usePieces } from "../hooks/usePieces";
import { IPiece } from "../interfaces/types";
import PieceForm from "./PieceForm";

const PiecesList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    isLoading,
    error,
    totalArea,
    selectedType,
    setSelectedType,
    filteredPieces,
    addPiece,
    deletePiece,
  } = usePieces();

  const handleAddPiece = (piece: IPiece) => {
    addPiece(piece);
    setShowForm(false);
    alert("Pieza creada correctamente");
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Despiece</h1>
      {isLoading ? (
        <p>Cargando piezas...</p>
      ) : (
        <>
          <div>
            <p>Total de metros cuadrados: {totalArea.toFixed(2)} m²</p>
          </div>

          <div className="form-container">
            {!showForm ? (
              <button
                className="submit-button"
                onClick={() => setShowForm(true)}
              >
                Crear nueva pieza
              </button>
            ) : (
              <PieceForm
                onSubmit={handleAddPiece}
                onCancel={() => setShowForm(false)}
              />
            )}
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos</option>
            <option value="BASE">Base</option>
            <option value="CAJON">Cajón</option>
            <option value="PUERTA">Puerta</option>
          </select>

          <table className="pieces-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Ancho</th>
                <th>Largo</th>
                <th>Material</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPieces.map((piece) => (
                <tr
                  key={piece.name}
                  className={piece.tipo === "CAJON" ? "cajon" : ""}
                >
                  <td>{piece.name}</td>
                  <td>{piece.ancho}</td>
                  <td>{piece.largo}</td>
                  <td>{piece.material}</td>
                  <td>{piece.tipo}</td>
                  <td>
                    <button
                      onClick={() => deletePiece(piece.name)}
                      className="action-button"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PiecesList;
