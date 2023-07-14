import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/"); 
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" component="h1" mt={5}>
        Profile
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
        <Typography variant="body1" component="p" mt={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
          porttitor sem. Aliquam erat volutpat. Donec placerat nisl magna, et
          faucibus arcu condimentum sed.
        </Typography>
      </Box>

      <Button variant="contained" onClick={handleLogout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
}

export default ProfilePage;
