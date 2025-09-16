// lib/api/doctorApi.ts
import api from "./axiosInstance";

export interface DoctorRegisterPayload {
  email: string;
  name: string;
  password: string;
  specialization: string[];
  phone: string;
  feesPerConsultation: number;
}

export interface DoctorLoginPayload {
  email: string;
  password: string;
}

export const doctorApi = {
  // 1. Register Doctor
  registerDoctor: async (data: DoctorRegisterPayload) => {
    try {
      const res = await api.post("/doctor/register", data);
      return res.data; // { token, createdDoctor }
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  // 2. Login Doctor
  loginDoctor: async (data: DoctorLoginPayload) => {
    try {
      const res = await api.post("/doctor/login", data);
      return res.data; // { token, doctor }
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  // 3. Get Doctor Profile (requires token → handled by axiosInstance)
  getDoctorProfile: async () => {
    try {
      const res = await api.get("/doctor/profile");
      return res.data; // { doctor }
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  // 4. Logout Doctor (requires token)
  logoutDoctor: async () => {
    try {
      const res = await api.get("/doctor/logout");
      return res.data; // { message: "Logged out successfully" }
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },
};
