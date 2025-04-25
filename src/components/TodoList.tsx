import { tasks } from "../data/tasks";

const TodoList = () => {
  return (
    <div>
      <h1>Tareas para completar</h1>
      <table>
        <thead>
          <tr>
            <th>Tarea</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
