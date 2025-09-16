import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: "My Profile" }}
      />
      <Stack.Screen
        name="settings"
        options={{ headerShown: true, title: "Settings" }}
      />
    </Stack>
  );
}

