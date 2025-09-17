import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.welcome}>Affordable Telemedicine for Everyone</Text>
        <Text style={styles.subtitle}>Consult doctors in your language, access records offline, and get real-time updates from local pharmacies.</Text>
        <View style={styles.quickActionButtons}>
          <TouchableOpacity style={styles.consultButton}>
            <Text style={styles.cbText}>Book a Consultation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chkSymptomsButton}>
            <Text style={styles.csText}>Check Symptoms</Text>
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
        <Text style={styles.featuresTitle}>Choose your desired sevice</Text>
        <Text style={styles.featuresSubtitle}>Our services are designed specifically for rural communities with limited connectivity and resources</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="videocam" size={28} color="#007AFF" />
            <Text style={styles.cardText}>Multilingual Consultations</Text>
            <Text style={styles.cardDesc}>Connect with doctors in your preferred language via video or voice.</Text>
            <Text style={styles.cardLnk}>Click to schedule a consultation.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialCommunityIcons name="pill" size={28} color="#007AFF" />
            <Text style={styles.cardText}>Pharmacy updates</Text>
            <Text style={styles.cardDesc}>Track real-time medicine availability at local stores near you.</Text>
            <Text style={styles.cardLnk}>Find pharmacies.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <MaterialCommunityIcons name="robot-outline" size={28} color="#007AFF" />
            <Text style={styles.cardText}>AI Symptom Checker</Text>
            <Text style={styles.cardDesc}>Get instant AI-driven health guidance,even on low bandwidth.</Text>
            <Text style={styles.cardLnk}>Check symptoms.</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upcoming Appointments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Tips</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            💧 Drink at least 2 liters of water daily to stay hydrated.
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            🏃‍♂️ Do 30 minutes of exercise every day to maintain fitness.
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
    fontSize: 14, 
    fontWeight: "900", 
    color: "#fff"
  },
  csText: {
    fontSize: 14, 
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


