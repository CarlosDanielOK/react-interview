import { ITask } from "../interfaces/types";

export const tasks: ITask[] = [
  {
    name: "Hacer fetching de los materiales.",
  },
  {
    name: "Arreglar la estructura de la tabla de materiales.",
  },
  {
    name: "Resolver los errores de la consola.",
  },
  {
    name: "Mostrar un loading al cargar los materiales.",
  },
  {
    name: "Completar la tabla de piezas.",
  },
  {
    name: "Especificar encima de la tabla de piezas, la sumatoria de los metros cuadrados (m2) de las piezas.",
  },
  {
    name: 'Añadir la clase "cajon" a los items de la tabla de piezas que sean del tipo CAJON.',
  },
  {
    name: "Bonus: armar un selector para renderizar las piezas segun su tipo (BASE, CAJON, PUERTA).",
  },
  {
    name: "Bonus 2: Realizar un formulario para crear una nueva pieza, con validación de los datos y persistencia.",
  },
];
