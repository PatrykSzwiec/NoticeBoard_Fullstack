import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Header from './components/views/Header';
import Footer from './components/views/Footer';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import AddAd from './components/pages/AddAd';
import EditAd from './components/pages/EditAd';
import SearchResults from './components/pages/SearchResults';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Logout from './components/pages/Logout';
import SingleAd from './components/features/SingleAd';
import RemoveAd from './components/pages/RemoveAd';
import Profile from './components/pages/Profile';

function App() {
  return (
    <div>
      <Container>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<SingleAd />} />
          <Route path="/ad/add" element={<AddAd />} />
          <Route path="/ad/edit/:id" element={<EditAd />} />
          <Route path="/ad/remove/:id" element={<RemoveAd />} />
          <Route path="/ad/search/:searchPhrase" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
