export const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha);

  return nuevaFecha.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

export const formatearFechaSolo = (fecha, timeZone) => {
  const nuevaFecha = new Date(fecha);

  return nuevaFecha.toLocaleDateString("es-Es", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: timeZone,
  });
};

export const formatearHoraSolo = (fecha, timeZone) => {
  const nuevaFecha = new Date(fecha);

  return nuevaFecha.toLocaleTimeString("es-Es", {
    hour: "numeric",
    minute: "numeric",
    timeZone: timeZone,
  });
};

export const convertUTCToLocalTime = (dateString) => {
  let date = new Date(dateString);
  const milliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
  const localTime = new Date(milliseconds);
  localTime.getDate(); // local date
  localTime.getHours(); // local hour
};
