import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/"); 
  };

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center",
      justifyContent: "center", // Centra los elementos en el eje vertical
      minHeight: "100vh", // Altura mínima del 100% de la altura de la ventana
    }}>

      <Typography variant="h6" component="h2" mt={3}>
        Welcome, {user?.username || "User"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 5,
          gap: 2,
          width: 300,
        }}
      >
      </Box>

      <Button variant="contained" onClick={handleLogout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
}

export default ProfilePage;
