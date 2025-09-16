import axiosInstance from "./axiosInstance";

export type ShopPayload = {
  email: string;
  name?: string;
  password: string;
  address?: {
    location: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone?: string;
  medicinesAvailable?: {
    name: string;
    manufacturer: string;
    price: number;
    stock: number;
  }[];
};

// ✅ Register Shop
export async function registerShop(data: ShopPayload) {
  const res = await axiosInstance.post("/medicineShop/register", data);
  return res.data; // { token, createdMedicineShop }
}

// ✅ Login Shop
export async function loginShop(data: { email: string; password: string }) {
  const res = await axiosInstance.post("/medicineShop/login", data);
  return res.data; // { token, medicineShop }
}

// ✅ Get Shop Profile
export async function getShopProfile() {
  const res = await axiosInstance.get("/medicineShop/profile");
  return res.data; // { medicineShop }
}

// ✅ Logout Shop
export async function logoutShop() {
  const res = await axiosInstance.get("/medicineShop/logout");
  return res.data; // { message }
}
