import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";

export default function DashboardScreen() {
  const { t } = useTranslation();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.welcome}>{t('user-welcome')}</Text>
        <Text style={styles.subtitle}>{t('user-subtitle')}</Text>
        <View style={styles.quickActionButtons}>
          <TouchableOpacity style={styles.consultButton}>
            <Text style={styles.cbText}>{t('user-consultation')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chkSymptomsButton}>
            <Text style={styles.csText}>{t('user-chkSym')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner Image */}
      <Image
        source={{ uri: "https://picsum.photos/400/200?health" }}
        style={styles.banner}
        resizeMode="cover"
      />

      
      <View style={styles.features}>
        <Text style={styles.featuresTitle}>{t('user-serviceTitle')}</Text>
        <Text style={styles.featuresSubtitle}>{t('user-serviceSubtitle')}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="videocam" size={28} color="#007AFF" />
            <Text style={styles.cardText}>{t('user-consultCardTitle')}</Text>
            <Text style={styles.cardDesc}>{t('user-consultCardDesc')}</Text>
            <Text style={styles.cardLnk}>{t('user-consultCardBtn')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialCommunityIcons name="pill" size={28} color="#007AFF" />
            <Text style={styles.cardText}>{t('user-pharmaCardTitle')}</Text>
            <Text style={styles.cardDesc}>{t('user-pharmaCardDesc')}</Text>
            <Text style={styles.cardLnk}>{t('user-pharmaCardBtn')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialCommunityIcons name="robot-outline" size={28} color="#007AFF" />
            <Text style={styles.cardText}>{t('user-sympCardTitle')}</Text>
            <Text style={styles.cardDesc}>{t('user-sympCardDesc')}</Text>
            <Text style={styles.cardLnk}>{t('user-sympCardBtn')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upcoming Appointments */}
      <View style={styles.features}>
        <Text style={styles.featuresTitle}>{t('user-upcomingAppoint')}</Text>
        <View style={styles.cardRow}>
          <Ionicons name="medkit-outline" size={24} color="#007AFF" />
          <Text style={styles.rowText}>Dr. Smith - 20th Sept, 10:00 AM</Text>
        </View>
        <View style={styles.cardRow}>
          <Ionicons name="medkit-outline" size={24} color="#007AFF" />
          <Text style={styles.rowText}>Dr. Jane - 25th Sept, 5:00 PM</Text>
        </View>
      </View>

      {/* Health Tips */}
      <View style={styles.features}>
        <Text style={styles.featuresTitle}>{t('user-healthTips')}</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            💧 {t('user-tip1')}
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            🏃‍♂️ {t('user-tip2')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  content: { padding: 20, paddingBottom: 40 },
  hero: { marginBottom: 20 },
  welcome: { 
    fontSize: 32, 
    fontWeight: "bold", 
    color: "blue" 
  },
  subtitle: { 
    fontSize: 16, 
    color: "black", 
    marginTop: 8,
    marginBottom: 8 
  },
  featuresSubtitle: {
    fontSize: 16, 
    color: "gray", 
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8 
  },
  banner: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 25,
  },
  features: { marginVertical: 32 },
  featuresTitle: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "600",
    marginHorizontal: 5,
    marginBottom: 12,
    color: "#333",
  },
  actions: { 
    flexDirection: "column", 
    justifyContent: "space-between" 
  },
  card: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
  },
  consultButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 24,
    elevation: 2,
  },
  chkSymptomsButton: {
    flex: 1,
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "blue",
    elevation: 2,
  },
  cbText: { 
    fontSize: 12, 
    fontWeight: "900", 
    color: "#fff"
  },
  csText: {
    fontSize: 12, 
    fontWeight: "400", 
    color: "blue"
  },
  quickActionButtons: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
    // justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 4,
    marginTop: 12,
  },
  cardText: { 
    marginTop: 8, 
    fontSize: 16, 
    fontWeight: "500",
    color: "#333"
  },
  cardDesc: {
    fontSize: 14, 
    color: "gray",
    marginTop: 8,
    marginBottom: 8 
  },
  cardLnk: {
    fontSize: 14, 
    color: "blue",
    marginTop: 8,
    marginBottom: 8 
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  rowText: { marginLeft: 10, fontSize: 15, color: "#333" },
  tipCard: {
    backgroundColor: "#e6f7ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  tipText: { fontSize: 15, color: "#007AFF" },
});


