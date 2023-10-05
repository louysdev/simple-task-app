import { useState } from "react";
import BotonCerrarModal from "./BotonCerrarModal";
import CampoFormulario from "./CampoFormulario";
import TimePicker from "./TimePicker";
import { SafeAreaView } from "react-native-safe-area-context";

const {
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  View,
} = require("react-native");

export default function FormularioTarea({
  setModalTareaVisible,
  tareas,
  setTareas,
  tarea,
  setTarea,
}) {
  const handleChange = (elemento, campo) => {
    console.log(tarea);
    setTarea({ ...tarea, [campo]: elemento });
  };

  const handleSumbit = () => {
    if (
      [tarea.titulo, tarea.descripcion, tarea.materia, tarea.fecha].includes("")
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios", [
        { text: "Ok" },
      ]);
      return;
    }

    let nuevaTarea = {
      ...tarea,
    };

    if (tarea.id !== "") {
      const tareasActualizadas = tareas.map((tarea) =>
        tarea.id === nuevaTarea.id ? nuevaTarea : tarea
      );

      setTareas(tareasActualizadas);
    } else {
      nuevaTarea = {
        ...tarea,
        id: Date.now().toString(),
      };

      setTareas((prevState) => [...prevState, nuevaTarea]);
    }

    limpiarFormulario();
    setModalTareaVisible(false);
  };

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
    <View style={styles.contenedor}>
      <ScrollView>
        <Text style={styles.titulo}>
          {tarea.id !== "" ? "Editar" : "Nueva"}{" "}
          <Text style={styles.tituloColor}>tarea</Text>
        </Text>

        {/* <BotonCerrarModal
          setModalVisible={setModalTareaVisible}
          limpiarFormulario={limpiarFormulario}
        /> */}

        <CampoFormulario
          inputEtiqueta="Titulo de la tarea"
          inputPlaceholder="Realizar informe"
          inputValue={tarea.titulo}
          onChangeText={(texto) => handleChange(texto, "titulo")}
        />

        <CampoFormulario
          inputEtiqueta="Descripción"
          inputPlaceholder="Realizar informe"
          inputStyle={{ height: 200 }}
          inputValue={tarea.descripcion}
          onChangeText={(texto) => handleChange(texto, "descripcion")}
          props={{ multiline: true, numberOfLines: 9 }}
        />
        <CampoFormulario
          inputEtiqueta="Materia"
          inputPlaceholder="Introducción a la ingeniería"
          inputValue={tarea.materia}
          onChangeText={(texto) => handleChange(texto, "materia")}
        />

        <TimePicker
          fecha={tarea.fecha}
          onChangeDate={(fecha) => handleChange(fecha, "fecha")}
        />

        <Pressable style={styles.botonContenedor} onPress={handleSumbit}>
          <Text style={styles.botonTexto}>
            {tarea.id !== "" ? "Editar" : "Crear"} tarea
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#063852",
    flex: 1,
  },
  titulo: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    marginTop: 20,
  },
  tituloColor: {
    fontWeight: "700",
  },
  botonContenedor: {
    backgroundColor: "#F0810F",
    padding: 10,
    marginHorizontal: 30,
    marginTop: 30,
    borderRadius: 10,
    marginBottom: 30,
  },
  botonTexto: {
    fontFamily: "PoppinsRegular",
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "900",
    fontSize: 18,
  },
});
