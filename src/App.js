import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieSearch from './pages/MovieSearch';
import MovieWeek from './pages/MovieWeek';
import MovieDetail from './pages/MovieDetail';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import LogOut from './pages/LogOut';
import { Error404 } from './pages/Error';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie-week" element={<MovieWeek />} />
            <Route path="/movie-search" element={<MovieSearch />} />
            <Route path="/movie/:tmdbid" element={<MovieDetail />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
