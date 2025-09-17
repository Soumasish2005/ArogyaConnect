import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { getUserProfile } from "../../../lib/api/userApi";
import { useNavigation } from "expo-router";
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any>(null);
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
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setProfile(res);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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
      <Text style={styles.title}>My Profile</Text>

      {profile ? (
        <>
          <Text style={styles.text}>Name: {profile.user.fullName?.firstName + " " + profile.user?.fullName?.lastName }</Text>
          <Text style={styles.text}>Email: {profile.user.email}</Text>
        </>
      ) : (
        <Text style={styles.text}>No profile data available.</Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16, color: "gray", marginVertical: 4 },
  button: {
    marginTop: 20,
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

