import React, { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text } from "react-native";
import FormularioTarea from "./src/components/FormularioTarea";
import CartaTarea from "./src/components/CartaTarea";
import DetalleTarea from "./src/components/DetalleTarea";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

function App() {
  const [fontsLoaded, fontError] = useFonts({
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });
  const [modalTareaVisible, setModalTareaVisible] = useState(false);
  const [modalDetalleVisible, setModalDetalleVisible] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState({
    id: "",
    titulo: "",
    descripcion: "",
    materia: "",
    fecha: new Date(),
  });

  const handleDelete = (id) => {
    const nuevaTareas = tareas.filter((tarea) => tarea.id !== id);
    return setTareas(nuevaTareas);
  };

  const handleEdit = (id) => {
    const tareaEditar = tareas.find((tarea) => tarea.id === id);
    setTarea(tareaEditar);
    setModalTareaVisible(!modalTareaVisible);
  };

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
        onPress={() => setModalTareaVisible(!modalTareaVisible)}
      >
        <Text style={styles.botonTexto}>Nueva tarea</Text>
      </Pressable>

      {/* Modal para crear nueva tarea */}
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
      </Modal>

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
              setModalDetalleVisible={setModalDetalleVisible}
              setTarea={setTarea}
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

export default App;
