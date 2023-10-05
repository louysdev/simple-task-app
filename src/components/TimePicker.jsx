import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TimePicker({ fecha, onChangeDate = () => {} }) {
  return (
    <View style={styles.campo}>
      <Text style={styles.campoTexto}>Horario de entrega</Text>

      <View style={styles.contenedorHorario}>
        {/* Solo con react native bare */}
        {/* <DatePicker
          date={fecha}
          textColor="#063852"
          locale="es"
          fadeToColor="none"
          onDateChange={(date) => {
            onChangeDate(date);
          }}
        /> */}
      </View>
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
  contenedorHorario: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
});
