import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, TextField, Button, CircularProgress, Card, CardContent, CardMedia, Grid, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { AuthContext } from '../../context/auth.context';

const ReservationsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState(null);
  const [reservationData, setReservationData] = useState({
    name: '',
    date: '',
    time: '',
    partySize: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isReservationMade, setIsReservationMade] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetch(`https://hungryhives-server-4-ko5e1hcj2-jesusglezt27.vercel.app//api/restaurants/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener los datos del restaurante');
        }
      })
      .then(data => {
        console.log('Datos del restaurante:', data);
        setRestaurant(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleChange = e => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isAllFieldsFilled = Object.values(reservationData).every(field => field);
    if (!isAllFieldsFilled) {
      setOpenSnackbar(true);
      return;
    }

    if (user) {
      const reservationWithUserId = {
        ...reservationData,
        user: user._id
      };

      fetch(`https://hungryhives-server-4-ko5e1hcj2-jesusglezt27.vercel.app//api/restaurants/${id}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationWithUserId)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al realizar la reserva');
          }
        })
        .then(data => {
          console.log('Reserva creada:', data);
          setIsReservationMade(true);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("No hay un usuario logeado");
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card style={{ margin: '10px' }}>
            <CardMedia
              component="img"
              height="200"
              image={restaurant.images}
              alt={restaurant.name}
            />
            <CardContent>
              <Typography variant="h5">La Moresca {restaurant.name}</Typography>
              <Typography variant="body1">Rate: {restaurant.stars}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" mt={4}>
        <Grid item xs={12} sm={8} md={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              id="name"
              name="name"
              value={reservationData.name}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              id="date"
              name="date"
              type="date"
              value={reservationData.date}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              id="time"
              name="time"
              type="time"
              value={reservationData.time}
              onChange={handleChange}
            />
            <TextField
              label="Number of Guests"
              variant="outlined"
              fullWidth
              margin="normal"
              id="partySize"
              name="partySize"
              type="number"
              value={reservationData.partySize}
              onChange={handleChange}
            />
            {isReservationMade ? (
              <Link to="/user">
                <Button type="button" variant="contained" color="secondary" fullWidth>
                Manage Reservations
                </Button>
              </Link>
            ) : (
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Book Table
              </Button>
            )}
          </form>
        </Grid>
      </Grid>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
          Please fill in all the required fields before making a reservation.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReservationsPage;
