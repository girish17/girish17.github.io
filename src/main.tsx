import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error caught:', { message, source, lineno, colno, error });
};

const rootElement = document.getElementById('root');

// Old links used hash routing (/#/projects). Send them to the real path.
const legacyHash = window.location.hash.match(/^#\/(.*)$/);
if (legacyHash) {
  window.history.replaceState(null, '', '/' + legacyHash[1]);
}

if (!rootElement) {
  console.error('Failed to find the root element');
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
