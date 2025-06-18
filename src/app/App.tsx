import type { ReactElement } from 'react';
//import { useEffect } from 'react';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '@/components/Header/Header';
import NotFoundPage from '../pages/NotFoundPage';
import MainPage from '../pages/MainPage';
import WrapperLayout from '@/components/Layout/WrapperLayout';
import LoginPage from '@/pages/LoginPage';
import UserProfilePage from '@/pages/UserProfilePage';
import ProductDetailPage from '@/pages/ProductDetailsPage';
import AboutPage from '@/pages/AboutPage';
import RegistrationPage from '@/pages/RegistrationPage';
import CatalogPage from '@/pages/CatalogPage';
import BasketPage from '@/pages/CartPage';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer/Footer';

function App(): ReactElement {

  return (
    <WrapperLayout>
      <Header />
      <Toaster />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/catalog' element={<CatalogPage />} />
        <Route path='/product-detail/:productKey' element={<ProductDetailPage />} />
        <Route path='/profile' element={<UserProfilePage />} />
        <Route path='/cart' element={<BasketPage />} />
        <Route path='/about-us' element={<AboutPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </WrapperLayout>
  );
}

export default App;
