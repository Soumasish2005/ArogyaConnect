import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import LanguageDropdown from "@/components/LanguageToggle";

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="person-outline" size={22} color="#333" />
          <Text style={styles.itemText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="lock-closed-outline" size={22} color="#333" />
          <Text style={styles.itemText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="moon-outline" size={22} color="#333" />
          <Text style={styles.itemText}>Dark Mode</Text>
        </TouchableOpacity>

        <LanguageDropdown />

        <TouchableOpacity style={styles.item}>
          <Ionicons name="notifications-outline" size={22} color="#333" />
          <Text style={styles.itemText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* Help Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help & Support</Text>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="help-circle-outline" size={22} color="#333" />
          <Text style={styles.itemText}>FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="mail-outline" size={22} color="#333" />
          <Text style={styles.itemText}>Contact Support</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  section: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#007AFF",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemText: { marginLeft: 15, fontSize: 16, color: "#333" },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#FF3B30",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

