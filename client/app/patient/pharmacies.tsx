import { View, ScrollView, Text, StyleSheet } from "react-native";

export default function PharmaciesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Coming Soon!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, textAlign: "center", marginTop: "250", fontWeight: "bold" },
  text: { fontSize: 16, color: "gray", marginTop: 8 },
});

