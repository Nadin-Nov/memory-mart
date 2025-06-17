import type { ReactElement } from 'react';
import { useEffect } from 'react';
import ScrollToTop from '@/components/ScrollToTop';
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

import { LocalStorageService } from '@/services/LocalStorageService';

import RegistrationPage from '@/pages/RegistrationPage';
import type { userData } from '@/utils/validateUserData';
import { isUserData } from '@/utils/validateUserData';
import { getAnonymousToken } from '@/services/AuthService';
import CatalogPage from '@/pages/CatalogPage';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer/Footer';

const BasketPage = (): ReactElement => <h2>Basket Page</h2>;

const MS_IN_S = 1000;

function App(): ReactElement {
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const userData = LocalStorageService.getItem<userData>('userData', isUserData);
      const token = userData?.token;
      const expirationDate = userData?.expirationDate;

      console.log(expirationDate, Date.now());

      if (!token || (expirationDate !== undefined && expirationDate < Date.now())) {
        try {
          const response = await getAnonymousToken();
          console.log(response);
          LocalStorageService.setItem('userData', {
            token: response?.access_token,
            isLoggedIn: false,
            expirationDate: (response?.expires_in || 0) * MS_IN_S + Date.now(),
          });
        } catch (error) {
          console.error('Failed to get token', error);
        }
      }
    };
    void initAuth();
  }, []);

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
