import { create } from "zustand";

const useAuth = create((set, get) => ({
  accessToken: "",
  apiKey: "",
  isAuthenticated: false,
  profile: {},
  isVenueManager: false,

  setToken: (token) => set({ accessToken: token }),
  getToken: () => get().accessToken,

  setApiKey: (key) => set({ apiKey: key, isAuthenticated: true }),
  getApiKey: () => get().apiKey,

  setProfile: (profile) => set({ profile: { name: profile.name, email: profile.email, avatar: profile.avatar.url } }),
  updateAvatar: (avatarUrl) => {
    const currentProfile = get().profile;
    set({ profile: { ...currentProfile, avatar: avatarUrl } });
  },

  setVenueManager: (isVenueManager) => set({ isVenueManager }),

  logout: () => set({ accessToken: "", apiKey: "", isAuthenticated: false, profile: {} }),
}));

export default useAuth;
