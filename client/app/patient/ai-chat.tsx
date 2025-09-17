import { View, Text, StyleSheet } from "react-native";

export default function AIChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.text}>Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold" },
  text: { fontSize: 16, color: "gray", marginTop: 8 },
});

