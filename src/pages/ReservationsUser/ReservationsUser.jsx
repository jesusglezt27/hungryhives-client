import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Card, CardContent, CardMedia, Grid } from '@mui/material';

const ReservationsUser = () => {
  const { reservationId } = useParams();
  const [reservationData, setReservationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5005/api/reservations/${reservationId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener los datos de la reserva');
        }
      })
      .then(data => {
        console.log('Datos de la reserva:', data);
        setReservationData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        // Manejo de errores
      });
  }, [reservationId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!reservationData) {
    return <Typography variant="h5">No se encontraron datos de la reserva</Typography>;
  }

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card style={{ margin: '10px' }}>
            <CardMedia
              component="img"
              height="200"
              image={reservationData.restaurant.images}
              alt={reservationData.restaurant.name}
            />
            <CardContent>
              <Typography variant="h5">Detalles de la reserva</Typography>
              <Typography variant="body1">Restaurante: {reservationData.restaurant.name}</Typography>
              <Typography variant="body1">Estrellas: {reservationData.restaurant.stars}</Typography>
              <Typography variant="body1">Nombre: {reservationData.name}</Typography>
              <Typography variant="body1">Correo electrónico: {reservationData.email}</Typography>
              <Typography variant="body1">Fecha: {reservationData.date}</Typography>
              <Typography variant="body1">Hora: {reservationData.time}</Typography>
              <Typography variant="body1">Número de personas: {reservationData.partySize}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReservationsUser;
