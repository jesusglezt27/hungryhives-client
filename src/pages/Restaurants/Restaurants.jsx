import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5005/api/restaurants/')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener los datos');
        }
      })
      .then(data => {
        console.log('Datos de los restaurantes:', data);
        setRestaurants(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {restaurants.map(restaurant => (
          <Grid item key={restaurant._id} xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', margin: '10px' }}>
              <CardMedia
                component="img"
                height="140"
                image={restaurant.images}
                alt={restaurant.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estrellas: {restaurant.stars}
                </Typography>
                <Button component={Link} to={`/reservations/${restaurant._id}`}>
                  Reservar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RestaurantList;
