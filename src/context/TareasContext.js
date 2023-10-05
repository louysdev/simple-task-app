import React, { createContext, useState } from "react";

export const TareasContext = createContext();

export function TareasProvider({ children }) {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState({
    id: "",
    titulo: "",
    descripcion: "",
    materia: "",
    fecha: new Date(),
  });

  const limpiarFormulario = () => {
    setTarea({
      id: "",
      titulo: "",
      descripcion: "",
      materia: "",
      fecha: new Date(),
    });
  };

  return (
    <TareasContext.Provider
      value={{
        tareas,
        tarea,
        setTareas,
        setTarea,
        limpiarFormulario,
      }}
    >
      {children}
    </TareasContext.Provider>
  );
}
