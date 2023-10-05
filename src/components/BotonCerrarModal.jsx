import { Pressable, StyleSheet, Text } from "react-native";

export default function BotonCerrarModal({
  onPress = () => {},
  colorStyle = {},
  limpiarFormulario = () => {},
}) {
  return (
    <Pressable
      style={[styles.botonContenedor, colorStyle]}
      onPress={() => {
        limpiarFormulario();
        onPress();
      }}
    >
      <Text style={styles.botonTexto}>Cerrar</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botonContenedor: {
    backgroundColor: "#095882",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  botonTexto: {
    fontFamily: "PoppinsRegular",
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
