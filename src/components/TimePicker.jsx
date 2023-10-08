import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { formatearFechaSolo, formatearHoraSolo } from "../helpers";
import { getCalendars } from "expo-localization";

export default function TimePicker({ fechaTarea, handleDate = () => {} }) {
  // Obtener zona horario
  const { timeZone } = getCalendars()[0];

  const [date, setDate] = useState(new Date(fechaTarea));
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);

  const [fecha, setFecha] = useState(formatearFechaSolo(date, timeZone));
  const [hora, setHora] = useState(formatearHoraSolo(date, timeZone));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    // Obtén la zona horaria local del dispositivo
    const localTimeZone = timeZone || "GMT"; // Si timeZone es undefined, usa GMT como zona horaria por defecto

    // Convierte la fecha y hora seleccionadas a UTC
    const currentDateUTC = new Date(currentDate).toISOString();

    setFecha(formatearFechaSolo(currentDateUTC, localTimeZone));
    setHora(formatearHoraSolo(currentDateUTC, localTimeZone));

    // Guarda currentDateUTC en tu base de datos o en donde sea necesario.
    handleDate(currentDateUTC);
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
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
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
