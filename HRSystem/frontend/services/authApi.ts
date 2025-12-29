import axios from "axios";
import { UserRole } from "../utils/auth";

// Base URL - Use relative path in browser to leverage Next.js proxy, full URL server-side
// Backend runs on port 3001 with /api/v1 prefix
const getBaseURL = (): string => {
  if (typeof window !== "undefined") {
    // In browser: use relative path to leverage Next.js rewrites
    return "/api/v1";
  }
  // Server-side: use full URL
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
};

const BASE_URL = getBaseURL();

// Auth API instance
const AuthAPI = axios.create({
  baseURL: `${BASE_URL}/auth`,
});

/**
 * Login with employee number and password
 * POST /auth/login
 */
export const login = (data: {
  employeeNumber: string;
  password: string;
}) => AuthAPI.post("/login", data);

/**
 * Register a new employee
 * POST /auth/register
 */
export const register = (data: {
  employeeNumber: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  nationalId: string;
  dateOfHire: string;
  address: {
    city: string;
    street: string;
  };
}) => AuthAPI.post("/register", data);

