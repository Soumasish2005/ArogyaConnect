// app/doctor/_layout.tsx
import { Tabs } from "expo-router";
import { View, Text, Image } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function DoctorLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
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
        name="schedule"
        options={{
          headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/icon.png")} // put your logo path
                style={{ width: 28, height: 28, marginRight: 16 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Schedule</Text>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="health-records"
        options={{
          headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/icon.png")} // put your logo path
                style={{ width: 28, height: 28, marginRight: 16 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Health Records</Text>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

