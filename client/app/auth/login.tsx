import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { router, Link } from "expo-router";
import { AuthContext } from "../../context/AuthContext";

// Import your role-based APIs
import { loginUser } from "../../lib/api/userApi";
import { doctorApi } from "../../lib/api/doctorApi";
import { loginShop } from "../../lib/api/shopApi";

type LoginFormData = {
  email: string;
  password: string;
  role: "patient" | "doctor" | "shop";
};

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: { role: "patient" },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError(null);

      let res;

      // ✅ Call different API based on selected role
      if (data.role === "patient") {
        res = await loginUser({ email: data.email, password: data.password });
      } else if (data.role === "doctor") {
        res = await doctorApi.loginDoctor({ email: data.email, password: data.password });
      } else {
        res = await loginShop({ email: data.email, password: data.password });
      }

      // API should return { token, user }
      await login(res.token, data.role);

      // Navigate to role-specific dashboard
      router.replace(`/${data.role}/dashboard`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {error && <Text style={styles.error}>{error}</Text>}

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
            <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
              <Picker.Item label="Patient" value="patient" />
              <Picker.Item label="Doctor" value="doctor" />
              <Picker.Item label="Medicine Shop" value="shop" />
            </Picker>
          </View>
        )}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      {/* 🔗 Link to signup */}
      <Link href="/auth/signup" asChild>
        <TouchableOpacity>
          <Text style={styles.link}>Don’t have an account? Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 15 },
  pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 15 },
  picker: { height: 50, width: "100%" },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 15, color: "#007AFF", textAlign: "center" },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
});
