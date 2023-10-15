import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar"
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import RestaurantList from './pages/Restaurants/Restaurants';
import ReservationsPage from './pages/ReservationsPage/ReservationsPage';
import User from './pages/user/User';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
      <Routes>
        <Route path="/Signup" element={<SignupPage/>} />
      </Routes>
      <Routes>
      <Route path="/Profile" element={<ProfilePage/>} />
      </Routes>
      <Routes>
      <Route path="/Restaurants" element={<RestaurantList/>} />
      </Routes>
      <Routes>
      <Route path="/reservations/:id" element={<ReservationsPage/>} />
      </Routes>
      <Routes>
      <Route path="/reservations" element={<ReservationsPage/>} />
      </Routes>
      <Routes>
      <Route path="/user" element={<User/>} />
      </Routes>
    </div>
  );
}

export default App;

