import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, TextField, Button, CircularProgress, Card, CardContent, CardMedia, Grid } from '@mui/material';

const ReservationsPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    partySize: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5005/api/restaurants/${id}`)
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
        // Manejo de errores
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
    console.log(reservationData);

    fetch(`http://localhost:5005/api/restaurants/${id}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservationData)
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
      })
      .catch(error => {
        console.log(error);
        // Manejo de errores
      });
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
              <Typography variant="h5">Reservar mesa en {restaurant.name}</Typography>
              <Typography variant="body1">Estrellas: {restaurant.stars}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" mt={4}>
        <Grid item xs={12} sm={8} md={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              margin="normal"
              id="name"
              name="name"
              value={reservationData.name}
              onChange={handleChange}
            />
            <TextField
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              margin="normal"
              id="email"
              name="email"
              value={reservationData.email}
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
              label="Numero de personas"
              variant="outlined"
              fullWidth
              margin="normal"
              id="partySize"
              name="partySize"
              type="number"
              value={reservationData.partySize}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Reserva prro
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReservationsPage;
