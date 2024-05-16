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
  }
  return Promise.resolve({
    ok: false,
    json: () => Promise.resolve({}),
  });
});
