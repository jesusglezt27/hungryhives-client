import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);


  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */
    console.log(requestBody)
    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        console.log("textito", error)
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" component="h1" mt={5}>
        Sign Up
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
        onSubmit={handleSignupSubmit}
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

        <TextField
          label="Name"
          variant="outlined"
          type="text"
          name="username"
          value={username}
          onChange={handleName}
        />

        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </Box>

      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Typography variant="body1" component="p" mt={2}>
        Already have an account?{" "}
        <Link to={"/login"} sx={{ fontWeight: "bold" }}>
          Login
        </Link>
      </Typography>
    </Box>
  );
}

export default SignupPage;
