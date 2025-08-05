import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SnackbarProvider } from "notistack";
import { store } from './utils/constant/Redux/store/store.js';
import { Provider } from 'react-redux';
import { SpeedInsights } from "@vercel/speed-insights/react";


createRoot(document.getElementById('root')).render(
 <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
  
<Provider store={store}>
   <SpeedInsights />
      <App/>
      </Provider>
    </SnackbarProvider>
)
