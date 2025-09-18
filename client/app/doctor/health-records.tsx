import { View, Text, StyleSheet } from "react-native";

export default function HealthRecordsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>View patient health records here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
