import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "https://hungryhives-deployed-vercel-153ss4p2i-jesusglezt27.vercel.app",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = (requestBody) => {
    return this.api.post("/auth/login", requestBody);
    // same as
    // return axios.post("https://hungryhives-deployed-vercel-153ss4p2i-jesusglezt27.vercel.app/auth/login");
  };

  signup = (requestBody) => {
    return this.api.post("/auth/signup", requestBody);
    // same as
    // return axios.post("https://hungryhives-deployed-vercel-153ss4p2i-jesusglezt27.vercel.app/auth/singup");
  };

  verify = () => {
    return this.api.get("/auth/verify");
    // same as
    // return axios.post("https://hungryhives-deployed-vercel-153ss4p2i-jesusglezt27.vercel.app/auth/verify");
  };
}

// Create one instance (object) of the service
const authService = new AuthService();

export default authService;
