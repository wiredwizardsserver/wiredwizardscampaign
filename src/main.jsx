import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminPanel from './AdminPanel.jsx'
import PrivacyPolicy from './PrivacyPolicy.jsx'
import TermsOfService from './TermsOfService.jsx'
import Disclaimer from './Disclaimer.jsx'
import ContactUs from './ContactUs.jsx'

const path = window.location.pathname;

const renderPage = () => {
  if (path === '/admin') return <AdminPanel />;
  if (path === '/privacy') return <PrivacyPolicy />;
  if (path === '/terms') return <TermsOfService />;
  if (path === '/disclaimer') return <Disclaimer />;
  if (path === '/contact') return <ContactUs />;
  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {renderPage()}
  </StrictMode>,
)
