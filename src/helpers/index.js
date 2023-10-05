export const formatearFecha = fecha => {
  const nuevaFecha = new Date(fecha);

  return nuevaFecha.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
};
