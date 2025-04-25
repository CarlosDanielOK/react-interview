import { useMaterials } from "../hooks/useMaterials";

const MaterialList = () => {
  const { materials, isLoading, error } = useMaterials();

  return (
    <div>
      <h1>Listado de Materiales</h1>
      {isLoading ? (
        <p>Cargando materiales...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Espesor</th>
              <th>Textura</th>
              <th>Medidas (mm)</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.id}>
                <td>{material.name}</td>
                <td>{material.price}</td>
                <td>{material.espesor}</td>
                <td>
                  <img
                    width="50"
                    height="50"
                    src={material.textura}
                    alt="Textura"
                  />
                </td>
                <td>
                  {material.ancho}x{material.largo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MaterialList;
