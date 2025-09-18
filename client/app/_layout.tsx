import "../lib/i18n"; // 👈 import before App renders
import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";

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
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
      
        <Stack screenOptions={{ headerShown: false }}></Stack>
      
      </AuthProvider>
    </I18nextProvider>
  );
}
