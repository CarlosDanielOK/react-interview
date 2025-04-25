export interface IMaterial {
  id: number;
  name: string;
  price: number;
  espesor: number;
  textura: string;
  ancho: number;
  largo: number;
}

export interface IPiece {
  name: string;
  material: string;
  ancho: string;
  largo: string;
  tipo: string;
}

export interface ITask {
  name: string;
}
