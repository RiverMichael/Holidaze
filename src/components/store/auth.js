import { create } from "zustand";

const useAuth = create((set, get) => ({
  accessToken: "",
  apiKey: "",

  setToken: (token) => set({ accessToken: token }),
  getToken: () => get().accessToken,
  clearToken: () => set({ accessToken: "" }),

  setApiKey: (key) => set({ apiKey: key }),
  getApiKey: () => get().apiKey,
  clearApiKey: () => set({ apiKey: "" }),
}));

export default useAuth;
