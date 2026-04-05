import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Importamos el Layout y las páginas
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { AddContact } from "./pages/AddContact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Esta es la ruta principal: donde se ve la lista */}
      <Route index element={<Home />} />
      
      {/* Esta es la ruta para el formulario de nuevo contacto */}
      <Route path="add-contact" element={<AddContact />} />

      {/* Esta es la ruta para editar (la usaremos después) */}
      <Route path="edit-contact/:id" element={<AddContact />} />

      <Route path="*" element={<h1>Not found!</h1>} />
    </Route>
  )
);