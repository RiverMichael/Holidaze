import { create } from "zustand";

const useAuth = create((set, get) => ({
  accessToken: "",
  apiKey: "",
  isAuthenticated: false,
  user: {},
  isVenueManager: false,

  setToken: (token) => set({ accessToken: token }),
  getToken: () => get().accessToken,

  setApiKey: (key) => set({ apiKey: key, isAuthenticated: true }),
  getApiKey: () => get().apiKey,

  setUser: (user) => set({ user: { name: user.name, email: user.email, avatar: user.avatar.url } }),
  updateAvatar: (avatarUrl) => {
    const currentUser = get().user;
    set({ user: { ...currentUser, avatar: avatarUrl } });
  },

  setVenueManager: (isVenueManager) => set({ isVenueManager }),

  logout: () => set({ accessToken: "", apiKey: "", isAuthenticated: false, user: {} }),
}));

export default useAuth;
