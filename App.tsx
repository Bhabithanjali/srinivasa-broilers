import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Facilities } from './pages/Facilities';
import { Gallery } from './pages/Gallery';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminOrders } from './pages/AdminOrders';
import { AdminSettings } from './pages/AdminSettings';
import { AdminGallery } from './pages/AdminGallery';
import { AdminBlog } from './pages/AdminBlog';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { NotFound } from './pages/NotFound';
import { useContent } from './context/ContentContext';
import { AdminLayout } from './components/admin/AdminLayout';

function App() {
  const location = useLocation();
  const { content } = useContent();

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', content.themeColors.primary);
    document.documentElement.style.setProperty('--color-primary-light', content.themeColors.primaryLight);
    document.documentElement.style.setProperty('--color-primary-dark', content.themeColors.primaryDark);
    document.documentElement.style.setProperty('--color-secondary', content.themeColors.secondary);
    document.documentElement.style.setProperty('--color-text-dark', content.themeColors.textDark);
    document.documentElement.style.setProperty('--color-text-light', content.themeColors.textLight);
  }, [content.themeColors]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="blog" element={<AdminBlog />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
