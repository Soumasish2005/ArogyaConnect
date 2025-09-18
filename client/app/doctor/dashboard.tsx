import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

export default function DoctorDashboard() {
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 👇 Replace these with your API calls
        const doctorData = {
          name: "Dr. John Smith",
          specialization: "Cardiology",
          email: "doctor@example.com",
          rating: 4.5,
          experience: "5 years at City Hospital",
        };
        const upcomingAppointments = [
          {
            id: 1,
            patient: "Alice Johnson",
            date: "2025-09-18 10:00 AM",
          },
          {
            id: 2,
            patient: "Michael Brown",
            date: "2025-09-19 3:00 PM",
          },
        ];

        setDoctor(doctorData);
        setAppointments(upcomingAppointments);
      } catch (err) {
        console.error("Error fetching doctor dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Doctor Profile Section */}
      {doctor && (
        <View style={styles.profileCard}>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialization}>
            {doctor.specialization}
          </Text>
          <Text style={styles.text}>Email: {doctor.email}</Text>
          <Text style={styles.text}>⭐ {doctor.rating}</Text>
          <Text style={styles.text}>{doctor.experience}</Text>
        </View>
      )}

      {/* Upcoming Appointments */}
      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      {appointments.length === 0 ? (
        <Text style={styles.text}>No upcoming appointments</Text>
      ) : (
        appointments.map((appt) => (
          <View key={appt.id} style={styles.appointmentCard}>
            <Text style={styles.apptPatient}>{appt.patient}</Text>
            <Text style={styles.text}>{appt.date}</Text>
          </View>
        ))
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View All Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Check Earnings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  profileCard: {
    backgroundColor: "#EAF4FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  name: { fontSize: 22, fontWeight: "bold", color: "#007AFF" },
  specialization: { fontSize: 18, color: "#333", marginVertical: 4 },
  text: { fontSize: 16, color: "#555" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  appointmentCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  apptPatient: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  actions: { marginTop: 30 },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

