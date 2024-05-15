import { create } from "zustand";
import * as storage from "../utils/storage";

const useAuth = create((set, get) => ({
  accessToken: storage.load("accessToken") || "",
  apiKey: storage.load("apiKey") || "",
  isAuthenticated: storage.load("isAuthenticated") || false,
  user: storage.load("user") || {},
  isVenueManager: storage.load("isVenueManager") || false,

  setToken: (token) => {
    storage.save("accessToken", token);
    set({ accessToken: token });
  },
  getToken: () => get().accessToken,

  setApiKey: (key) => {
    storage.save("apiKey", key);
    storage.save("isAuthenticated", true);
    set({ apiKey: key, isAuthenticated: true });
  },
  getApiKey: () => get().apiKey,

  setUser: (user) => {
    storage.save("user", { name: user.name, email: user.email, avatar: user.avatar });
    set({ user: { name: user.name, email: user.email, avatar: user.avatar } });
  },
  updateAvatar: (avatar) => {
    const currentUser = get().user;
    set({ user: { ...currentUser, avatar: avatar } });
    storage.save("user", get().user);
  },

  setVenueManager: (isVenueManager) => {
    storage.save("isVenueManager", isVenueManager);
    set({ isVenueManager });
  },

  logout: () => {
    storage.clear();
    set({ accessToken: "", apiKey: "", isAuthenticated: false, user: {}, isVenueManager: false });
  },
}));

export default useAuth;
