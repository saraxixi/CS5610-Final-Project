import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/responsive.css' // Import responsive CSS
import App from './App.jsx'

// More aggressive approach to ensuring viewport meta tag is present
function ensureViewportMetaTag() {
  // Remove any existing viewport meta tags
  const existingTags = document.querySelectorAll('meta[name="viewport"]');
  existingTags.forEach(tag => tag.remove());
  
  // Create and add new viewport meta tag
  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0';
  document.head.appendChild(viewport);
  
  console.log('Viewport meta tag has been set');
}

// Execute immediately and also when DOM is fully loaded
ensureViewportMetaTag();
document.addEventListener('DOMContentLoaded', ensureViewportMetaTag);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);