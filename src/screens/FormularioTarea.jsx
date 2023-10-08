import { useContext, useEffect } from "react";
import CampoFormulario from "../components/CampoFormulario";
import { TareasContext } from "../context/TareasContext";
import { useNavigation } from "@react-navigation/native";
import BotonCerrarModal from "../components/BotonCerrarModal";
import TimePicker from "../components/TimePicker";
import * as Notifications from "expo-notifications";

const {
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  View,
} = require("react-native");

export default function FormularioTarea() {
  const { tarea, setTarea, tareas, setTareas } = useContext(TareasContext);
  const navigation = useNavigation();

  const sendNotification = async (tarea) => {
    const trigger = new Date(tarea.fecha);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: tarea.titulo,
        body: tarea.descripcion,
      },
      trigger,
    });
  };

  const handleChange = (elemento, campo) => {
    setTarea({ ...tarea, [campo]: elemento });
  };

  const handleDate = (date) => {
    setTarea({ ...tarea, fecha: date });
  };

  const handleSumbit = async () => {
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

    await sendNotification(nuevaTarea);
    limpiarFormulario();
    navigation.navigate("Home");
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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Text style={styles.titulo}>
            {tarea.id !== "" ? "Editar" : "Nueva"}{" "}
            <Text style={styles.tituloColor}>tarea</Text>
          </Text>
        );
      },
      headerStyle: {
        backgroundColor: "#063852",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
      headerBackVisible: false,
      headerRight: () => (
        <BotonCerrarModal onPress={() => navigation.goBack()} />
      ),
    });
  }, []);

  return (
    <View style={styles.contenedor}>
      <ScrollView>
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

        <TimePicker fechaTarea={tarea.fecha} handleDate={handleDate} />

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
    marginTop: 20,
    color: "#fff",
    fontSize: 28,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
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
