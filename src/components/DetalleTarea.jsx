import { ScrollView, StyleSheet, Text, View } from "react-native";
import BotonCerrarModal from "./BotonCerrarModal";
import { formatearFecha } from "../helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTareas } from "../hooks/useTareas";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

function TareaInfo({ titulo, detalle }) {
  return (
    <>
      <Text style={styles.etiquetaTitulo}>{titulo}</Text>
      <Text style={styles.etiquetaContenido}>{detalle}</Text>
    </>
  );
}

export default function DetalleTarea() {
  const { tarea } = useTareas();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return <Text style={styles.titulo}>Información</Text>;
      },
      headerStyle: {
        backgroundColor: "#F0810F",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
      headerBackVisible: false,
      headerRight: () => (
        <BotonCerrarModal
          colorStyle={{ backgroundColor: "#f39a3e" }}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.contenedorCarta}>
          <TareaInfo titulo={"Titulo"} detalle={tarea.titulo} />
          <TareaInfo titulo={"Materia"} detalle={tarea.materia} />
          <TareaInfo titulo={"Horario"} detalle={formatearFecha(tarea.fecha)} />
          <TareaInfo titulo={"Descripción"} detalle={tarea.descripcion} />
        </View>
      </ScrollView>
    </View>
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
  },
  tituloColor: {
    fontWeight: "700",
  },
  contenedorCarta: {
    marginTop: 20,
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
