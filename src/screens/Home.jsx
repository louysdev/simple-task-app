import React, { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text } from "react-native";
import FormularioTarea from "../components/FormularioTarea";
import CartaTarea from "../components/CartaTarea";
import DetalleTarea from "../components/DetalleTarea";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTareas } from "../hooks/useTareas";

function Home() {
  const [fontsLoaded, fontError] = useFonts({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
  });

  const {
    handleDelete,
    handleEdit,
    setTarea,
    tarea,
    setTareas,
    tareas,
    limpiarFormulario,
  } = useTareas();

  const navigation = useNavigation();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.contenedor}>
      {/* Titulo */}
      <Text style={styles.titulo}>
        Recordatorio de <Text style={styles.tituloColor}>tareas</Text>
      </Text>

      {/* Boton para crear nueva tarea */}
      <Pressable
        style={styles.botonContenedor}
        onPress={() => {
          limpiarFormulario();
          navigation.navigate("FormularioTarea");
        }}
      >
        <Text style={styles.botonTexto}>Nueva tarea</Text>
      </Pressable>

      {/* Modal para crear nueva tarea
      <Modal animationType="slide" visible={modalTareaVisible}>
        <FormularioTarea
          tarea={tarea}
          setTarea={setTarea}
          setModalTareaVisible={setModalTareaVisible}
          tareas={tareas}
          setTareas={setTareas}
        />
      </Modal>

      <Modal animationType="slide" visible={modalDetalleVisible}>
        <DetalleTarea
          tarea={tarea}
          setModalDetalleVisible={setModalDetalleVisible}
        />
      </Modal> */}

      {tareas.length <= 0 ? (
        <Text style={styles.textoNoTareas}>No hay tareas</Text>
      ) : (
        <FlatList
          scrollEnabled={true}
          data={tareas}
          key={(item) => item.id}
          renderItem={({ item }) => (
            <CartaTarea
              key={item.id}
              tarea={item}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              irDetalle={() => navigation.navigate("DetalleTarea")}
              irEditar={() => navigation.navigate("FormularioTarea")}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
  },
  tituloColor: {
    color: "#063852",
    fontWeight: "700",
  },
  botonContenedor: {
    backgroundColor: "#063852",
    padding: 10,
    marginHorizontal: 30,
    marginVertical: 30,
    borderRadius: 10,
  },
  botonTexto: {
    fontFamily: "PoppinsRegular",
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "900",
    fontSize: 18,
  },
  textoNoTareas: {
    textAlign: "center",
    fontFamily: "PoppinsRegular",
    fontSize: 20,
    marginTop: 30,
  },
});

export default Home;
