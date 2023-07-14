import * as React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material'
import backgroundImage from '../../images/fifa.jpg';
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {AuthContext} from '../../context/auth.context'

export default function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Card sx={{ maxWidth: 500 }} sx={{height: 800}}>
      <CardMedia
      sx={{ height: 600, position: 'relative', backgroundImage: `url(${backgroundImage})` }}
      title="green iguana"
      >
      <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.5 }} />
      <Typography variant="h3" component="h1" sx={{ color: '#fff', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        Estás listo? No hay vuelta atras.
      </Typography>
      <Link to={isLoggedIn ? '/Restaurants' : '/login'}>
      <Button variant="contained" sx={{ color: '#fff', backgroundColor: '#008CBA', position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        Comenzar
      </Button>
    </Link>
    </CardMedia>
    </Card>

  );
}
