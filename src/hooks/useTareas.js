import { useContext } from "react";
import { TareasContext } from "../context/TareasContext";

export function useTareas() {
  const { tareas, tarea, setTarea, setTareas, limpiarFormulario } =
    useContext(TareasContext);

  const handleDelete = (id) => {
    const nuevaTareas = tareas.filter((tarea) => tarea.id !== id);
    return setTareas(nuevaTareas);
  };

  const handleEdit = (id) => {
    const tareaEditar = tareas.find((tarea) => tarea.id === id);
    setTarea(tareaEditar);
  };

  return {
    tareas,
    tarea,
    setTareas,
    setTarea,
    handleDelete,
    handleEdit,
    limpiarFormulario,
  };
}
