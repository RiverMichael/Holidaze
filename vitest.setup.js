import "@testing-library/jest-dom";
import { vi } from "vitest";

global.fetch = vi.fn((url, options) => {
  if (url.endsWith("/register")) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: { id: 1 } }),
    });
  } else if (url.endsWith("/login")) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: { accessToken: "test-token", name: "testuser", email: "test@stud.noroff.no", avatar: "https://example.com/avatar.jpg" } }),
    });
  } else if (url.endsWith("/create-api-key")) {
    const authHeader = options.headers.Authorization;
    if (authHeader === "Bearer test-token") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { key: "test-api-key" } }),
      });
    } else {
      return Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: "Unauthorized" }),
      });
    }
  } else if (url.endsWith("/profiles/testuser")) {
    const authHeader = options.headers.Authorization;
    const apiKeyHeader = options.headers["X-Noroff-API-Key"];
    if (authHeader === "Bearer test-token" && apiKeyHeader === "test-api-key") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { venueManager: false } }),
      });
    } else {
      return Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: "Unauthorized" }),
      });
    }
  }

  return Promise.resolve({
    ok: false,
    json: () => Promise.resolve({}),
  });
});

// Mock localStorage
const localStorageMock = {
  setItem: vi.fn((key, value) => {
    localStorageMock[key] = value;
  }),
  getItem: vi.fn((key) => localStorageMock[key] || null),
  removeItem: vi.fn((key) => {
    delete localStorageMock[key];
  }),
  clear: vi.fn(() => {
    Object.keys(localStorageMock).forEach((key) => {
      if (typeof localStorageMock[key] !== "function") {
        delete localStorageMock[key];
      }
    });
  }),
};

// Set the mock as global localStorage
global.localStorage = localStorageMock;
