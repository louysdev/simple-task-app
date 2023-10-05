import { StyleSheet, Text, TextInput, View } from "react-native";

export default function CampoFormulario({
  inputEtiqueta = "Nombre",
  inputPlaceholder = "Luis",
  inputStyle = {},
  inputValue,
  props,
  onChangeText = () => {},
}) {
  return (
    <View style={styles.campo}>
      <Text style={styles.campoTexto}>{inputEtiqueta}</Text>
      <TextInput
        style={[styles.campoInput, inputStyle]}
        placeholder={inputPlaceholder}
        onChangeText={onChangeText}
        value={inputValue}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  campo: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  campoTexto: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "PoppinsRegular",
  },
  campoInput: {
    fontFamily: "PoppinsRegular",
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 14,
    padding: 14,
  },
});
