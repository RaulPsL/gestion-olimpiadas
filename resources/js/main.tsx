import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app.tsx';
import { Toaster } from 'sonner';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
                <Toaster position="top-right" />
            </BrowserRouter>
        </React.StrictMode>
    );
}
