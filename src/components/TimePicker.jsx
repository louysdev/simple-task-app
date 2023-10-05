import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { formatearFechaSolo, formatearHoraSolo } from "../helpers";

export default function TimePicker({ fechaTarea, handleDate = () => {} }) {
  const [date, setDate] = useState(fechaTarea);
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);

  const [fecha, setFecha] = useState(formatearFechaSolo(date));
  const [hora, setHora] = useState(formatearHoraSolo(date));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    setFecha(formatearFechaSolo(tempDate));

    setHora(formatearHoraSolo(tempDate));

    handleDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.campo}>
      <Text style={styles.campoTexto}>Horario de entrega</Text>

      <View style={styles.contenedorHorario}>
        <Pressable onPress={showDatepicker} style={styles.botonContenedor}>
          <Text style={styles.botonTexto}>Fecha</Text>
        </Pressable>

        <View style={styles.fechaHoraTextoContenedor}>
          <Text style={styles.fechaHoraTexto}>{fecha}</Text>
        </View>
      </View>

      <View style={styles.contenedorHorario}>
        <Pressable onPress={showTimepicker} style={styles.botonContenedor}>
          <Text style={styles.botonTexto}>Hora</Text>
        </Pressable>

        <View style={styles.fechaHoraTextoContenedor}>
          <Text style={styles.fechaHoraTexto}>{hora}</Text>
        </View>
      </View>

      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          locale="es-ES"
        />
      )}
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
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botonContenedor: {
    backgroundColor: "#F0810F",
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
  fechaHoraTextoContenedor: {
    backgroundColor: "#095882",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
  fechaHoraTexto: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
});
