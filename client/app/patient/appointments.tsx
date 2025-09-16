import { View, Text, StyleSheet } from "react-native";

export default function AppointmentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      <Text style={styles.text}>Your upcoming and past appointments will show here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
  text: { fontSize: 16, color: "gray", marginTop: 8 },
});

