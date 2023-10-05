import Home from "./src/screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AgregarTarea from "./src/screens/AgregarTarea";
import FormularioTarea from "./src/components/FormularioTarea";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AgregarTarea"
          component={() => {
            return (
              <FormularioTarea
                tarea={{}}
                setTarea={() => {}}
                setModalTareaVisible={() => {}}
                tareas={{}}
                setTareas={() => {}}
              />
            );
          }}
          options={{
            title: "",
            presentation: "modal",
            headerStyle: {
              backgroundColor: "#063852",
            },
            headerTintColor: "#fff",
            headerShadowVisible: false,
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
