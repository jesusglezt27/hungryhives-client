import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" align="left" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              HungryHives
            </Link>
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color="inherit" variant="h6" component={Link} to="/Profile">
                Profile
              </Button>
              <Button color="inherit" variant="h6" component={Link} to="/user">
                My Reservations
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" variant="h6" component={Link} to="/Login">
                Login
              </Button>
              <Button color="inherit" variant="h6" component={Link} to="/Signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
