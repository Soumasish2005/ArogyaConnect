import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getDoctors } from "../../lib/api/userApi"; // 👈 make sure path is correct

export default function ConsultationsScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Fetch doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await getDoctors();
        setDoctors(res.doctors || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const steps = ["Choose your Doctor", "Date and Time", "Confirm & Pay"];

  const handleConfirm = () => {
    console.log("Confirmed Appointment:", {
      doctor: selectedDoctor,
      date,
    });
    // 🔗 Here you could call API to schedule appointment
  };

  return (
    <ScrollView style={styles.container}>
      {/* Stepper */}
      <View style={styles.stepper}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.step,
              index === currentStep && styles.activeStep,
            ]}
          >
            <Text
              style={[
                styles.stepText,
                index === currentStep && styles.activeStepText,
              ]}
            >
              {index + 1}. {step}
            </Text>
          </View>
        ))}
      </View>

      {/* Step Content */}
      <View style={styles.content}>
        {currentStep === 0 && (
          <View>
            <Text style={styles.sectionTitle}>Available Doctors</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : (
              doctors.map((doc) => (
                <TouchableOpacity
                  key={doc._id}
                  style={[
                    styles.doctorCard,
                    selectedDoctor?._id === doc._id &&
                      styles.selectedDoctorCard,
                  ]}
                  onPress={() => {
                    setSelectedDoctor(doc);
                    setCurrentStep(1); // 👉 auto advance to next step
                  }}
                >
                  <Text style={styles.doctorName}>{doc.name}</Text>
                  <Text style={styles.doctorSpec}>
                    {doc.specialization.join(", ")}
                  </Text>
                  <Text style={styles.doctorInfo}>
                    Fees: ₹{doc.feesPerConsultation} | ⭐ {doc.rating}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {currentStep === 1 && (
          <View>
            <Text style={styles.sectionTitle}>Pick Date & Time</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.buttonText}>Select Date & Time</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="datetime"
                display="default"
                onChange={(event, selectedDate) => {
                  if (event.type === "set" && selectedDate) {
                    // ✅ Only update and close picker when user presses OK
                    setDate(selectedDate);
                    // setShowDatePicker(false);
                  }
                    // ❌ User canceled -> just close without changing
                  setShowDatePicker(false);
                  
                }}
              />
            )}

            <Text style={styles.text}>
              Selected: {date.toLocaleString()}
            </Text>
          </View>
        )}


        {currentStep === 2 && selectedDoctor && (
          <View>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>Doctor: {selectedDoctor.name}</Text>
            <Text style={styles.text}>
              Specialization: {selectedDoctor.specialization.join(", ")}
            </Text>
            <Text style={styles.text}>
              Fees: ₹{selectedDoctor.feesPerConsultation}
            </Text>
            <Text style={styles.text}>
              Date: {date.toLocaleString()}
            </Text>

            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>Confirm & Pay</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        {currentStep < steps.length - 1 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentStep(currentStep + 1)}
            disabled={currentStep === 0 && !selectedDoctor}
          >
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  stepper: { flexDirection: "row", marginBottom: 20 },
  step: { flex: 1, padding: 8, borderBottomWidth: 2, borderBottomColor: "#ccc" },
  activeStep: { borderBottomColor: "#007AFF" },
  stepText: { textAlign: "center", color: "#999" },
  activeStepText: { color: "#007AFF", fontWeight: "bold" },
  content: { marginTop: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  doctorCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedDoctorCard: { borderColor: "#007AFF", backgroundColor: "#EAF4FF" },
  doctorName: { fontSize: 18, fontWeight: "bold" },
  doctorSpec: { color: "gray", marginBottom: 4 },
  doctorInfo: { fontSize: 14, color: "#555" },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  text: { fontSize: 16, color: "gray", marginTop: 8 },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  navButtonText: { fontSize: 16, color: "#333" },
});

