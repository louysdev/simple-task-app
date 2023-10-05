import { Pressable, StyleSheet, Text, View } from "react-native";
import { formatearFecha } from "../helpers";

export default function CartaTarea({
  tarea,
  handleDelete = () => {},
  handleEdit = () => {},
  setModalDetalleVisible = () => {},
  setTarea = () => {},
}) {
  return (
    <Pressable
      onLongPress={() => {
        setModalDetalleVisible(true);
        setTarea(tarea);
      }}
    >
      <View style={styles.contenedorDetalle}>
        <Text style={styles.etiquetaTitulo}>Titulo de tarea</Text>
        <Text style={styles.etiquetaContenido}>{tarea.titulo}</Text>
        <Text style={styles.etiquetaFecha}>{formatearFecha(tarea.fecha)}</Text>
        <View style={styles.contenedorBotones}>
          <Pressable
            onPress={() => handleEdit(tarea.id)}
            style={[styles.botonContenedor, styles.botonEditar]}
          >
            <Text style={styles.botonTexto}>Editar</Text>
          </Pressable>

          <Pressable
            onPress={() => handleDelete(tarea.id)}
            style={[styles.botonContenedor, styles.botonTerminar]}
          >
            <Text style={styles.botonTexto}>Terminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contenedorDetalle: {
    backgroundColor: "#fff",
    marginHorizontal: 30,
    marginBottom: 18,
    borderRadius: 10,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  etiquetaTitulo: {
    fontSize: 20,
    fontFamily: "PoppinsRegular",
  },
  etiquetaContenido: {
    fontSize: 26,
    fontFamily: "PoppinsBold",
    color: "#063852",
  },
  etiquetaFecha: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  botonContenedor: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  botonEditar: {
    backgroundColor: "#F0810F",
  },
  botonTerminar: {
    backgroundColor: "#063852",
  },
  botonTexto: {
    fontSize: 12,
    fontFamily: "PoppinsBold",
    color: "#fff",
    textTransform: "uppercase",
  },
});
