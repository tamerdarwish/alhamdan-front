import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import EventForm from './pages/EventForm';
import AdminEventPage from './pages/AdminEventPage';
import EventPage from './pages/EventPage';
import ShoppingPage from './pages/ShoppingPage';
import ProductDetail from './components/ProductDetail';
import OrdersManagementPage from './pages/OrdersManagementPage';
import StorePage from './pages/StorePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import OrderConfirmation from './pages/OrderConfirmation'; // استخدام OrderConfirmationPage هنا
import AdminSettingsPage from './pages/AdminSettingsPage';
import LandingPage  from './LandingPage/LandingPage';
import Header from './LandingPage/components/Header';
import Footer from './LandingPage/components/Footer';
import AddProduct from './pages/AddProduct';


import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const scrollToSection = (section) => {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <Router>
      <Header scrollToSection={scrollToSection} />
      <Routes>
      <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/newProduct" element={<AddProduct />} />
        <Route path="/admin-event/:eventId" element={<AdminEventPage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/event/new" element={<EventForm />} />
        <Route path="/orders" element={<OrdersManagementPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} /> {/* استخدام OrderConfirmationPage هنا */}
        <Route path="/admin-settings" element={<AdminSettingsPage />} />
        <Route path="/shop" element={<ShoppingPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
