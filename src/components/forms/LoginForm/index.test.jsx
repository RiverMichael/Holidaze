import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "./index";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { API_AUTH_URL, API_BASE_URL } from "../../../constants/apiURL";

const mockSetToken = vi.fn();
const mockSetUser = vi.fn();
const mockSetApiKey = vi.fn();
const mockSetVenueManager = vi.fn();
const mockGetToken = vi.fn(() => mockGetToken._value);
mockGetToken._value = undefined;
const mockGetApiKey = vi.fn(() => mockGetApiKey._value);
mockGetApiKey._value = undefined;
let mockUser = {};

vi.mock("../../../store/auth", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    __esModule: true,
    ...actual,
    default: () => ({
      setToken: (token) => {
        mockGetToken._value = token;
        mockSetToken(token);
      },
      getToken: mockGetToken,
      setUser: (user) => {
        mockUser = user;
        mockSetUser(user);
      },
      setApiKey: (apiKey) => {
        mockGetApiKey._value = apiKey;
        mockSetApiKey(apiKey);
      },
      getApiKey: mockGetApiKey,
      setVenueManager: mockSetVenueManager,
      user: mockUser,
    }),
  };
});

const MockLoginForm = () => (
  <MemoryRouter>
    <LoginForm />
  </MemoryRouter>
);

const TEST_USER = {
  email: "test@stud.noroff.no",
  password: "password123",
};

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUser = {};
    render(<MockLoginForm />);
  });

  it("should render the form correctly", () => {
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("should display validation errors on submit", async () => {
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();
    });
  });

  it("should submit the form with valid data, call the API and store token, api-key, user, and setVenueManager", async () => {
    const auth = await import("../../../store/auth");

    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: TEST_USER.email },
    });
    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: TEST_USER.password },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);

      // Login call
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_AUTH_URL}/login`,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer undefined`,
            "X-Noroff-API-Key": undefined,
          },
          body: JSON.stringify({
            email: TEST_USER.email,
            password: TEST_USER.password,
          }),
        })
      );

      // API Key call
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_AUTH_URL}/create-api-key`,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.default().getToken()}`,
            "X-Noroff-API-Key": undefined,
          },
          body: JSON.stringify({}),
        })
      );

      // Profiles call
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_BASE_URL}/profiles/${mockUser.name}`,
        expect.objectContaining({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.default().getToken()}`,
            "X-Noroff-API-Key": `${auth.default().getApiKey()}`,
          },
        })
      );

      expect(mockSetToken).toHaveBeenCalledWith("test-token");
      expect(mockSetUser).toHaveBeenCalledWith({ name: "testuser", email: TEST_USER.email, avatar: "https://example.com/avatar.jpg", accessToken: "test-token" });
      expect(mockSetApiKey).toHaveBeenCalledWith("test-api-key");
      expect(mockSetVenueManager).toHaveBeenCalledWith(false);
    });
  });
});
