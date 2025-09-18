import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
export default function PharmaciesScreen() {
  const { t } = useTranslation();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('user-feature-not-found')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, textAlign: "center", fontWeight: "bold" },
  text: { fontSize: 16, color: "gray", marginTop: 8 },
});

