import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app.tsx';

// function Main() {
//     return (
//         <App />
//     );
// }

// export default Main;


const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    );
}


// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <BrowserRouter>
//         <h2>React está funcionando</h2>
//         <App />
//     </BrowserRouter>
// );
