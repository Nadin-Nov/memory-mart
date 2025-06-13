import type { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '@/components/Header/Header';
import NotFoundPage from '../pages/NotFoundPage';
import MainPage from '../pages/MainPage';
import WrapperLayout from '@/components/Layout/WrapperLayout';
import LoginPage from '@/pages/LoginPage';
import UserProfilePage from '@/pages/UserProfilePage';
import ProductDetailPage from '@/pages/ProductDetailsPage';
import RegistrationPage from '@/pages/RegistrationPage';
import CatalogPage from '@/pages/CatalogPage';
import { Toaster } from '@/components/ui/toaster';

const BasketPage = (): ReactElement => <h2>Basket Page</h2>;
const AboutUsPage = (): ReactElement => <h2>About Us Page</h2>;

function App(): ReactElement {
  return (
    <WrapperLayout>
      <Header />
      <Toaster />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/catalog' element={<CatalogPage />} />
        <Route path='/product-detail/:productKey' element={<ProductDetailPage />} />
        <Route path='/profile' element={<UserProfilePage />} />
        <Route path='/cart' element={<BasketPage />} />
        <Route path='/about-us' element={<AboutUsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </WrapperLayout>
  );
}

export default App;
