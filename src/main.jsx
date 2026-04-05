import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Estilos globales
import { RouterProvider } from "react-router-dom"; // Manejo de rutas
import { router } from "./routes"; // Configuración de tus páginas
import { StoreProvider } from './hooks/useGlobalReducer'; // Estado global (Flux)

const Main = () => {
    return (
        /* Hemos quitado StrictMode para evitar que React ejecute 
           tus funciones y peticiones fetch dos veces en desarrollo.
        */
        <StoreProvider> 
            <RouterProvider router={router} />
        </StoreProvider>
    );
}

// Renderizamos la aplicación en el elemento 'root' de tu HTML
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)