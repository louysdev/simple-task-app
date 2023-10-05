export const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha);

  return nuevaFecha.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

export const formatearFechaSolo = (fecha) => {
  const nuevaFecha = new Date(fecha);

  return nuevaFecha.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export const formatearHoraSolo = (fecha) => {
  const nuevaFecha = new Date(fecha);

  return nuevaFecha.toLocaleTimeString("es-ES", {
    hour: "numeric",
    minute: "numeric",
  });
};
