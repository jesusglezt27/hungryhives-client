import React, { useEffect, useState, useContext} from 'react';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';
import { Typography, CardMedia, CircularProgress, Card, CardContent, Divider, Button, TextField, CardHeader, Box, CardActions } from '@mui/material';

const User = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newReservationData, setNewReservationData] = useState(null);

  useEffect(() => {
    if (user) {
      fetchReservations();
    }
  }, [user]);

  const fetchReservations = () => {
    fetch(`https://hungryhives-server-4-ko5e1hcj2-jesusglezt27.vercel.app//api/restaurants/user/${user._id}/reservations`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener las reservas del usuario');
        }
      })
      .then(data => {
        setReservations(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }

  const handleDelete = (id) => {
    fetch(`https://hungryhives-server-4-ko5e1hcj2-jesusglezt27.vercel.app//api/restaurants/reservations/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          fetchReservations();
        } else {
          throw new Error('Error al eliminar la reserva');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleUpdate = (id) => {
    const currentReservation = reservations.find(res => res._id === id);
    if (JSON.stringify(currentReservation) === JSON.stringify(newReservationData)) {
      setEditingId(null);
      setNewReservationData(null);
      return;
    }

    fetch(`https://hungryhives-server-4-ko5e1hcj2-jesusglezt27.vercel.app//api/restaurants/reservations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReservationData)
    })
      .then(response => {
        if (response.ok) {
          setEditingId(null);
          setNewReservationData(null);
          fetchReservations();
        } else {
          throw new Error('Error al actualizar la reserva');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (reservations.length === 0) {
    return (
      <Box textAlign="center" my={5}>
        <Typography variant="h5" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="body1" paragraph>
          It seems you haven't made any reservations yet.
        </Typography>
        <Typography variant="body1" paragraph>
          Why not explore our restaurants and book your favorite table?
        </Typography>
        <Link to="/Restaurants" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Explore Restaurants
          </Button>
        </Link>
      </Box>
    );
}

  return (
    <Box m={2}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: '600', letterSpacing: '1px', color: '#333' }}>
        Your Reservations
      </Typography>
      <Divider style={{ width: '120px', height: '3px', backgroundColor: '#FF5733', marginBottom: '20px' }} />
        {reservations.map(reservation => (
        <Card key={reservation._id} sx={{ mb: 2, width: '500px' }}>
        <CardMedia
              component="img"
              height="200"
              width="50"
              image={reservation.restaurant.images}
            />
          <CardHeader
            image={reservation.restaurant.images}
            title={reservation.restaurant.name}
            subheader={`Estrellas: ${reservation.restaurant.stars}`}
          />
          <Divider />
          <CardContent>
            <Typography variant="body1">Nombre: {reservation.name}</Typography>
            <Typography variant="body1">Fecha: {reservation.date}</Typography>
            <Typography variant="body1">Hora: {reservation.time}</Typography>
            <Typography variant="body1">Personas: {reservation.partySize}</Typography>
          </CardContent>
          {editingId === reservation._id ? (
            <CardContent>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                id="name"
                name="name"
                label="Nombre"
                value={newReservationData.name}
                onChange={(e) => setNewReservationData({ ...newReservationData, name: e.target.value })}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                id="date"
                name="date"
                type="date"
                value={newReservationData.date}
                onChange={(e) => setNewReservationData({ ...newReservationData, date: e.target.value })}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                id="time"
                name="time"
                type="time"
                value={newReservationData.time}
                onChange={(e) => setNewReservationData({ ...newReservationData, time: e.target.value })}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                id="partySize"
                name="partySize"
                type="number"
                value={newReservationData.partySize}
                onChange={(e) => setNewReservationData({ ...newReservationData, partySize: e.target.value })}
              />
            </CardContent>
          ) : null}
          <CardActions>
            {editingId === reservation._id ? (
              <Button variant="contained" color="primary" onClick={() => handleUpdate(reservation._id)}>Save Changes</Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => {
                setEditingId(reservation._id);
                setNewReservationData(reservation);
              }}>Edit</Button>
            )}
            <Button variant="contained" color="secondary" onClick={() => handleDelete(reservation._id)}>Delete</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default User;