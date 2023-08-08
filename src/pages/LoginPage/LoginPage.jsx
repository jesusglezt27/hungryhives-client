import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email) || password.trim() === "") {
      setErrorMessage("Por favor, introduce un email y contraseña válidos.");
      setLoading(false);
      return;
    }

    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "Error al iniciar sesión.";
        setErrorMessage(errorDescription);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" component="h1" mt={5}>
        Login
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 5,
          gap: 2,
          width: 300,
        }}
        onSubmit={handleLoginSubmit}
      >
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }} disabled={loading}>
          {loading ? "Iniciando..." : "Login"}
        </Button>
      </Box>

      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Typography variant="body1" component="p" mt={2}>
        Don't have an account?{" "}
        <Link to={"/signup"} sx={{ fontWeight: "bold" }}>
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
}

export default LoginPage;
