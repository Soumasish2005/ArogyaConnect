import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../../context/AuthContext";
import { doctorApi } from "../../../lib/api/doctorApi";

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("settings" as never)}
        >
          <Ionicons name="settings-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await doctorApi.getDoctorProfile();
        setDoctor(res.doctor);
      } catch (err) {
        console.error("Failed to fetch doctor profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {doctor ? (
        <>
          <Text style={styles.text}>Name: {doctor.name}</Text>
          <Text style={styles.text}>Email: {doctor.email}</Text>
          <Text style={styles.text}>Specialization: {doctor.specialization?.join(", ")}</Text>
          <Text style={styles.text}>Phone: {doctor.phone}</Text>
          <Text style={styles.text}>Fees: ₹{doctor.feesPerConsultation}</Text>
        </>
      ) : (
        <Text>No doctor data available</Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  text: { fontSize: 16, marginVertical: 4 },
  button: { marginTop: 20, backgroundColor: "#FF3B30", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

