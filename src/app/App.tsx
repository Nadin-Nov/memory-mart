import type { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../components/header/Header';
import NotFoundPage from '../pages/NotFoundPage';

const LoginPage = (): ReactElement => <h2>Login Page</h2>;
const RegistrationPage = (): ReactElement => <h2>Registration Page</h2>;
const MainPage = (): ReactElement => <h2>Main Page</h2>;
const CatalogPage = (): ReactElement => <h2>Catalog Product Page</h2>;
const ProductDetailPage = (): ReactElement => <h2>Detailed Product Page</h2>;
const UserProfilePage = (): ReactElement => <h2>User Profile Page</h2>;
const BasketPage = (): ReactElement => <h2>Basket Page</h2>;
const AboutUsPage = (): ReactElement => <h2>About Us Page</h2>;

function App(): ReactElement {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/catalog' element={<CatalogPage />} />
        <Route path='/product-detail' element={<ProductDetailPage />} />
        <Route path='/profile' element={<UserProfilePage />} />
        <Route path='/cart' element={<BasketPage />} />
        <Route path='/about-us' element={<AboutUsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
