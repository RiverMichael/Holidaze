import useAuth from "./auth";
import { act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

const TEST_USER = { name: "testuser", email: "test@stud.noroff.no", avatar: "https://example.com/avatar.jpg" };

describe("useAuth store", () => {
  let store;

  beforeEach(() => {
    store = useAuth.getState();
    act(() => store.logout());
  });

  const setUserState = () => {
    act(() => {
      store.setUser(TEST_USER);
    });
    store = useAuth.getState();
  };

  it("should set and get token", () => {
    act(() => {
      store.setToken("test-token");
    });
    store = useAuth.getState();

    expect(store.getToken()).toBe("test-token");
    expect(localStorage.setItem).toHaveBeenCalledWith("accessToken", JSON.stringify("test-token"));
  });

  it("should set and get API key", () => {
    act(() => {
      store.setApiKey("test-api-key");
    });
    store = useAuth.getState();

    expect(store.getApiKey()).toBe("test-api-key");
    expect(store.isAuthenticated).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("apiKey", JSON.stringify("test-api-key"));
    expect(localStorage.setItem).toHaveBeenCalledWith("isAuthenticated", JSON.stringify(true));
  });

  it("should set and store the user", () => {
    setUserState();

    expect(store.user).toEqual(TEST_USER);
    expect(localStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify(TEST_USER));
  });

  it("should update the avatar", () => {
    setUserState();

    expect(store.user).toEqual(TEST_USER);
    expect(localStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify(TEST_USER));

    const newAvatar = "https://example.com/new-avatar.jpg";

    act(() => {
      store.updateAvatar(newAvatar);
    });
    store = useAuth.getState();

    expect(store.user.avatar).toEqual(newAvatar);
    expect(localStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify({ ...TEST_USER, avatar: newAvatar }));
  });

  it("should set and get venue manager status", () => {
    const isVenueManager = true;
    act(() => {
      store.setVenueManager(isVenueManager);
    });
    store = useAuth.getState();

    expect(store.isVenueManager).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("isVenueManager", JSON.stringify(true));
  });

  it("should logout and clear all user data", () => {
    act(() => {
      store.setToken("test-token");
      store.setApiKey("test-api-key");
      store.setUser(TEST_USER);
      store.setVenueManager(true);
    });
    store = useAuth.getState();

    // Verify initial state before logout
    expect(store.accessToken).toBe("test-token");
    expect(store.apiKey).toBe("test-api-key");
    expect(store.isAuthenticated).toBe(true);
    expect(store.user).toEqual(TEST_USER);
    expect(store.isVenueManager).toBe(true);

    // Verify localStorage before logout
    expect(localStorage.getItem("accessToken")).toBe(JSON.stringify("test-token"));
    expect(localStorage.getItem("apiKey")).toBe(JSON.stringify("test-api-key"));
    expect(localStorage.getItem("isAuthenticated")).toBe(JSON.stringify(true));
    expect(localStorage.getItem("user")).toBe(JSON.stringify(TEST_USER));
    expect(localStorage.getItem("isVenueManager")).toBe(JSON.stringify(true));

    act(() => {
      store.logout();
    });
    store = useAuth.getState();

    // Verify state after logout
    expect(store.accessToken).toBe("");
    expect(store.apiKey).toBe("");
    expect(store.isAuthenticated).toBe(false);
    expect(store.user).toEqual({});
    expect(store.isVenueManager).toBe(false);

    // Verify localStorage after logout
    expect(localStorage.getItem("accessToken")).toBe(null);
    expect(localStorage.getItem("apiKey")).toBe(null);
    expect(localStorage.getItem("isAuthenticated")).toBe(null);
    expect(localStorage.getItem("user")).toBe(null);
    expect(localStorage.getItem("isVenueManager")).toBe(null);
  });
});
