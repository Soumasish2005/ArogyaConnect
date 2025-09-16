import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker"; // role dropdown
import { router, Link } from "expo-router";
import { AuthContext } from "../../context/AuthContext";

// Import APIs
import { registerUser } from "../../lib/api/userApi";
import { doctorApi } from "../../lib/api/doctorApi";
import { registerShop } from "../../lib/api/shopApi";

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  role: "patient" | "doctor" | "shop";
  specialization?: string;
  phone?: string;
  feesPerConsultation?: string;
};

export default function SignupScreen() {
  const { login } = useContext(AuthContext);
  const { control, handleSubmit, watch } = useForm<SignupFormData>({
    defaultValues: { role: "patient" },
  });

  const selectedRole = watch("role");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      setError(null);

      let res;

      if (data.role === "patient") {
        // split name into first/last
        const [firstName, ...rest] = data.name.trim().split(" ");
        const lastName = rest.join(" ");
        res = await registerUser({
          email: data.email,
          fullName: { firstName, lastName },
          password: data.password,
        });
      } else if (data.role === "doctor") {
        res = await doctorApi.registerDoctor({
          name: data.name,
          email: data.email,
          password: data.password,
          specialization: data.specialization
            ? data.specialization.split(",").map((s) => s.trim())
            : ["General"],
          phone: data.phone || "0000000000",
          feesPerConsultation: Number(data.feesPerConsultation) || 0,
        });
      } else {
        res = await registerShop({
          name: data.name,
          email: data.email,
          password: data.password,
        });
      }

      await login(res.token, data.role);
      router.replace(`/${data.role}/dashboard`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Name */}
      <Controller
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Role Picker */}
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="Patient" value="patient" />
              <Picker.Item label="Doctor" value="doctor" />
              <Picker.Item label="Shop" value="shop" />
            </Picker>
          </View>
        )}
      />

      {/* Doctor-specific fields */}
      {selectedRole === "doctor" && (
        <>
          <Controller
            control={control}
            name="specialization"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Specialization (comma separated)"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Phone Number (10 digits)"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="feesPerConsultation"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Fees Per Consultation"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </>
      )}

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <Link href="/auth/login" asChild>
        <TouchableOpacity>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: { height: 50, width: "100%" },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 15, color: "#007AFF", textAlign: "center" },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
});
