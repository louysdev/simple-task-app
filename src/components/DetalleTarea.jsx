import { ScrollView, StyleSheet, Text, View } from "react-native";
import BotonCerrarModal from "./BotonCerrarModal";
import { formatearFecha } from "../helpers";
import { SafeAreaView } from "react-native-safe-area-context";

function TareaInfo({ titulo, detalle }) {
  return (
    <>
      <Text style={styles.etiquetaTitulo}>{titulo}</Text>
      <Text style={styles.etiquetaContenido}>{detalle}</Text>
    </>
  );
}

export default function DetalleTarea({
  tarea,
  setModalDetalleVisible = () => {},
}) {
  return (
    <SafeAreaView style={styles.contenedor}>
      <ScrollView>
        <Text style={styles.titulo}>
          Información de <Text style={styles.tituloColor}>tarea</Text>
        </Text>

        <BotonCerrarModal
          setModalVisible={setModalDetalleVisible}
          colorStyle={{ backgroundColor: "#f39a3e" }}
        />

        <View style={styles.contenedorCarta}>
          <TareaInfo titulo={"Titulo"} detalle={tarea.titulo} />
          <TareaInfo titulo={"Materia"} detalle={tarea.materia} />
          <TareaInfo titulo={"Horario"} detalle={formatearFecha(tarea.fecha)} />
          <TareaInfo titulo={"Descripción"} detalle={tarea.descripcion} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#F0810F",
  },
  titulo: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    marginTop: 40,
  },
  tituloColor: {
    fontWeight: "700",
  },
  contenedorCarta: {
    backgroundColor: "#fff",
    marginHorizontal: 30,
    marginTop: 30,
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
  etiquetaContenido: {
    fontSize: 18,
    fontFamily: "PoppinsRegular",
  },
  etiquetaTitulo: {
    fontSize: 22,
    fontFamily: "PoppinsBold",
    color: "#063852",
  },
});
