import { useState } from "react";
import { IPiece } from "../interfaces/types";

interface PieceFormProps {
  onSubmit: (piece: IPiece) => void;
  onCancel: () => void;
}

const PieceForm: React.FC<PieceFormProps> = ({ onSubmit, onCancel }) => {
  const [newPiece, setNewPiece] = useState<Partial<IPiece>>({
    name: "",
    ancho: "",
    largo: "",
    material: "",
    tipo: "BASE",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewPiece({
      ...newPiece,
      [name]: value,
    });

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!newPiece.name?.trim()) {
      errors.name = "El nombre es obligatorio";
    }

    if (!newPiece.ancho) {
      errors.ancho = "El ancho es obligatorio";
    } else if (
      isNaN(parseFloat(newPiece.ancho)) ||
      parseFloat(newPiece.ancho) <= 0
    ) {
      errors.ancho = "El ancho debe ser un número positivo";
    }

    if (!newPiece.largo) {
      errors.largo = "El largo es obligatorio";
    } else if (
      isNaN(parseFloat(newPiece.largo)) ||
      parseFloat(newPiece.largo) <= 0
    ) {
      errors.largo = "El largo debe ser un número positivo";
    }

    if (!newPiece.material?.trim()) {
      errors.material = "El material es obligatorio";
    }

    if (!newPiece.tipo) {
      errors.tipo = "El tipo es obligatorio";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(newPiece as IPiece);

      setNewPiece({
        name: "",
        ancho: "",
        largo: "",
        material: "",
        tipo: "BASE",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="piece-form">
      <h2>Nueva pieza</h2>

      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newPiece.name || ""}
          onChange={handleInputChange}
          className="form-input"
        />
        {formErrors.name && (
          <span className="error-message">{formErrors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="ancho">Ancho (mm):</label>
        <input
          type="number"
          id="ancho"
          name="ancho"
          value={newPiece.ancho || ""}
          onChange={handleInputChange}
          className="form-input"
        />
        {formErrors.ancho && (
          <span className="error-message">{formErrors.ancho}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="largo">Largo (mm):</label>
        <input
          type="number"
          id="largo"
          name="largo"
          value={newPiece.largo || ""}
          onChange={handleInputChange}
          className="form-input"
        />
        {formErrors.largo && (
          <span className="error-message">{formErrors.largo}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="material">Material:</label>
        <input
          type="text"
          id="material"
          name="material"
          value={newPiece.material || ""}
          onChange={handleInputChange}
          className="form-input"
        />
        {formErrors.material && (
          <span className="error-message">{formErrors.material}</span>
        )}
      </div>

      <div className="form-group last">
        <label htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          name="tipo"
          value={newPiece.tipo || ""}
          onChange={handleInputChange}
          className="form-input"
        >
          <option value="BASE">Base</option>
          <option value="CAJON">Cajón</option>
          <option value="PUERTA">Puerta</option>
        </select>
        {formErrors.tipo && (
          <span className="error-message">{formErrors.tipo}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">
          Guardar pieza
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PieceForm;
