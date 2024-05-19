import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterForm from "./index";
import { MemoryRouter } from "react-router-dom";
import { expect, it, vi } from "vitest";
import { API_AUTH_URL } from "../../../constants/apiURL";

const mockSetToken = vi.fn();
const mockSetUser = vi.fn();
const mockSetApiKey = vi.fn();
const mockGetToken = vi.fn(() => mockGetToken._value);
mockGetToken._value = undefined;
const mockGetApiKey = vi.fn(() => mockGetApiKey._value);
mockGetApiKey._value = undefined;

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
        mockSetUser(user);
      },
      setApiKey: (apiKey) => {
        mockGetApiKey._value = apiKey;
        mockSetApiKey(apiKey);
      },
      getApiKey: mockGetApiKey,
    }),
  };
});

const MockRegisterForm = () => (
  <MemoryRouter>
    <RegisterForm />
  </MemoryRouter>
);

const TEST_USER = {
  name: "testuser",
  email: "test@stud.noroff.no",
  avatar: "https://example.com/avatar.jpg",
  password: "password123",
};

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<MockRegisterForm />);
  });

  it("Should render the form correctly", () => {
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Avatar URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i, { selector: 'input[id="registerPassword"]' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Password confirmation/i, { selector: 'input[id="passwordConfirmation"]' })).toBeInTheDocument();
    expect(screen.getByLabelText(/I want to be a venue manager/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign up/i })).toBeInTheDocument();
  });

  it("Should display validation errors on submit", async () => {
    fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/Please enter your name/i)).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();
      expect(screen.getByText(/Please confirm your password/i)).toBeInTheDocument();
    });
  });

  it("Should submit the form with valid data, call the API and store token, api-key, and user", async () => {
    const auth = await import("../../../store/auth");

    fireEvent.input(screen.getByLabelText(/Username/i), {
      target: { value: TEST_USER.name },
    });
    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: TEST_USER.email },
    });
    fireEvent.input(screen.getByLabelText(/Avatar URL/i), {
      target: { value: TEST_USER.avatar },
    });
    fireEvent.input(screen.getByLabelText(/Password/i, { selector: 'input[id="registerPassword"]' }), {
      target: { value: TEST_USER.password },
    });
    fireEvent.input(screen.getByLabelText(/Password confirmation/i, { selector: 'input[id="passwordConfirmation"]' }), {
      target: { value: TEST_USER.password },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);

      // Registration call
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_AUTH_URL}/register`,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer undefined`,
            "X-Noroff-API-Key": undefined,
          },
          body: JSON.stringify({
            name: TEST_USER.name,
            email: TEST_USER.email,
            avatar: { url: TEST_USER.avatar, alt: TEST_USER.name },
            password: TEST_USER.password,
            venueManager: false,
          }),
        })
      );

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

      expect(mockSetToken).toHaveBeenCalledWith("test-token");
      expect(mockSetUser).toHaveBeenCalledWith({ name: TEST_USER.name, email: TEST_USER.email, avatar: TEST_USER.avatar, accessToken: "test-token" });
      expect(mockSetApiKey).toHaveBeenCalledWith("test-api-key");
    });
  });
});
