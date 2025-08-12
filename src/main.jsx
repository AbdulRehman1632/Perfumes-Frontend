import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SnackbarProvider } from "notistack";
import { store } from './utils/constant/Redux/store/store.js';
import { Provider } from 'react-redux';
// import MouseTrail from './utils/constant/MouseTraill/MouseTrail.jsx';
import FluidSimulation from 'fluid-simulation-react';
import FluidBackground from './utils/constant/MouseTraill/FluidBackground.jsx';

createRoot(document.getElementById('root')).render(
 <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
  
<Provider store={store}>
  {/* <MouseTrail/> */}
  {/* <FluidSimulation
  config={{ curl: 50, splatRadius: 0.003 }}
  color={[ [1,0,0], [0,1,1] ]}
/> */}
  {/* <FluidBackground/> */}
      <App/>
      </Provider>
    </SnackbarProvider>
)
