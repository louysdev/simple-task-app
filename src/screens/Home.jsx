import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import CartaTarea from "../components/CartaTarea";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTareas } from "../hooks/useTareas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { isDevice } from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function Home() {
  const [fontsLoaded, fontError] = useFonts({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
  });
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

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

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("No se pudo obtener los permisos de la notificacion");
        return;
      }

      // const projectId = Constants.expoConfig.extra.eas.projectId;

      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "715c2365-9bd2-4851-bb5d-156465193bca",
        })
      ).data;
    } else {
      return;
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("tareas");
        jsonValue != null ? setTareas(JSON.parse(jsonValue)) : null;
      } catch (error) {
        Alert.alert("Error al obtener las tareas", error.message);
      }
    };

    obtenerTareas();

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });
    Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeAllNotificationListeners();
    };
  }, []);

  useEffect(() => {
    const guardarTareas = async () => {
      try {
        const jsonValue = JSON.stringify(tareas);
        await AsyncStorage.setItem("tareas", jsonValue);
      } catch (error) {
        Alert.alert("Error al guardar las tareas", error.message);
      }
    };

    guardarTareas();
  }, [tareas]);

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
    marginTop: 20,
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
