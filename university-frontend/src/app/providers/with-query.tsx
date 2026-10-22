import React from 'react';
import { Toaster } from 'react-hot-toast';

export const withQuery = (component: () => React.ReactNode) => () => (
  <React.StrictMode>
    {component()}
    <Toaster 
      position="top-center" 
      toastOptions={{
        duration: 4000,
        className: 'font-bold rounded-2xl shadow-md border-2 border-base-300',
        success: {
          className: 'toast-baby-success font-bold rounded-2xl shadow-md',
          iconTheme: { primary: '#2dd4bf', secondary: '#fff' }
        },
        error: {
          className: 'toast-baby-error font-bold rounded-2xl shadow-md',
          iconTheme: { primary: '#fda4af', secondary: '#fff' }
        }
      }} 
    />
  </React.StrictMode>
);
