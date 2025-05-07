import type { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

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
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Main</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/catalog'>Catalog</Link>
            </li>
            <li>
              <Link to='/product-detail'>Product Detail</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/basket'>Basket</Link>
            </li>
            <li>
              <Link to='/about-us'>About Us</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/catalog' element={<CatalogPage />} />
          <Route path='/product-detail' element={<ProductDetailPage />} />
          <Route path='/profile' element={<UserProfilePage />} />
          <Route path='/basket' element={<BasketPage />} />
          <Route path='/about-us' element={<AboutUsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
