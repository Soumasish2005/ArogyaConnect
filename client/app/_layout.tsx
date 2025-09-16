import { Slot, Stack, useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { AuthContext,AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  // const { token, role } = useContext(AuthContext);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!token) {
  //     router.replace("/auth/login");
  //   } else {
  //     if (role === "patient") router.replace("/patient/dashboard");
  //     if (role === "doctor") router.replace("/doctor/dashboard");
  //     if (role === "shop") router.replace("/shop/dashboard");
  //   }
  // }, [token, role]);

  // return <Slot />;
  return(
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </AuthProvider>
  );
}
