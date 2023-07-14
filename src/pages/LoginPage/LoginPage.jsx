import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/login`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */
    console.log(requestBody);
    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the JWT and authenticate the user
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        console.log("textito", error);
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
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
          onChange={handleEmail}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Login
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

