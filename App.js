import Home from "./src/screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import FormularioTarea from "./src/components/FormularioTarea";
import { TareasProvider } from "./src/context/TareasContext";
import BotonCerrarModal from "./src/components/BotonCerrarModal";
import DetalleTarea from "./src/components/DetalleTarea";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TareasProvider>
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
            name="FormularioTarea"
            component={FormularioTarea}
            options={{
              presentation: "modal",
              headerShadowVisible: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="DetalleTarea"
            component={DetalleTarea}
            options={{
              presentation: "modal",
              headerShadowVisible: false,
              animation: "slide_from_bottom",
              title: null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TareasProvider>
  );
}
