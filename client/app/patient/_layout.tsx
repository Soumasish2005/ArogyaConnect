import { Tabs } from "expo-router";
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";

export default function PatientLayout() {
  return (
    <Tabs
      screenOptions={{
        // headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/icon.png")} // put your logo path
                style={{ width: 28, height: 28, marginRight: 16 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>ArogyaConnect</Text>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="consultations"
        options={{
          headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/icon.png")} // put your logo path
                style={{ width: 28, height: 28, marginRight: 16 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Book Consultation</Text>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pharmacies"
        options={{
          headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/icon.png")} // put your logo path
                style={{ width: 28, height: 28, marginRight: 16 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Pharmacies</Text>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pill" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ai-chat"
        options={{
          headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/icon.png")} // put your logo path
                style={{ width: 28, height: 28, marginRight: 16 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>AI Checker</Text>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="robot-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
