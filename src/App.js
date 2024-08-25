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
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-event/:eventId" element={<AdminEventPage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/event/new" element={<EventForm />} />
        <Route path="/orders" element={<OrdersManagementPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/admin-settings" element={<AdminSettingsPage />} />
        <Route path="/" element={<ShoppingPage />} />
        <Route path="/products/:id" element={<ProductDetail/>} />

      </Routes>
    </Router>
  );
};

export default App;
