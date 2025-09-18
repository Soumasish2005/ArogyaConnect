import { Tabs } from "expo-router";
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";
import { useTranslation } from "react-i18next";

export default function PatientLayout() {
  const { t } = useTranslation();
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
                style={{ width: 54, height: 54, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{t('title')}</Text>
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
                style={{ width: 54, height: 54, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{t('consultations')}</Text>
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
                style={{ width: 54, height: 54, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{t('pharmacies')}</Text>
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
                style={{ width: 54, height: 54, marginRight: 10 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{t('ai-symptom-checker')}</Text>
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
