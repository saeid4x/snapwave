import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

import { ToastContainer  } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthContext';
import { QueryProvider } from './libs/appwrite/react-query/QueryProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

<ToastContainer 
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    
/>
            <BrowserRouter>
              <NextUIProvider>
                <QueryProvider>
                  <AuthProvider>
                      <App />    
                  </AuthProvider>
                </QueryProvider>
              </NextUIProvider>
             </BrowserRouter>


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
