import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider

const GOOGLE_CLIENT_ID = '786315917912-9ij1nd3lrq00hf69hqm28m17hvaplfvj.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}> {/* Wrap App with GoogleOAuthProvider */}
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
