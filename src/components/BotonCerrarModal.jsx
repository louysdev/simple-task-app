import { Pressable, StyleSheet, Text } from "react-native";

export default function BotonCerrarModal({
  setModalVisible,
  colorStyle = {},
  limpiarFormulario = () => {},
}) {
  return (
    <Pressable
      style={[styles.botonContenedor, colorStyle]}
      onPress={() => {
        limpiarFormulario();
        setModalVisible(false);
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
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 8,
    marginHorizontal: 4,
  },
  botonTexto: {
    fontFamily: "PoppinsRegular",
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
