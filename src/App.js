import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieSearch from './pages/MovieSearch';
import MovieWeek from './pages/MovieWeek';
import { Error404 } from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie-week" element={<MovieWeek />} />
          <Route path="/movie-search" element={<MovieSearch />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
