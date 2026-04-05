import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams(); // Sacamos el ID de la URL si existe

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // Si hay un ID, buscamos los datos de ese contacto para rellenar el formulario
    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const currentContact = store.contacts.find(c => c.id == id);
            if (currentContact) setContact(currentContact);
        }
    }, [id, store.contacts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Si hay ID usamos PUT (editar), si no, usamos POST (crear)
        const method = id ? "PUT" : "POST";
        const url = id 
            ? `https://playground.4geeks.com/contact/agendas/Sebasyt300tylu/contacts/${id}`
            : "https://playground.4geeks.com/contact/agendas/Sebasyt300tylu/contacts";

        try {
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contact)
            });

            if (response.ok) {
                navigate("/"); // Volver a la lista
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="text-center mb-4 fw-bold">
                        {id ? "Editar Contacto" : "Añadir Nuevo Contacto"}
                    </h1>
                    <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre Completo</label>
                            <input type="text" className="form-control" value={contact.name} onChange={(e) => setContact({...contact, name: e.target.value})} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Email</label>
                            <input type="email" className="form-control" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Teléfono</label>
                            <input type="text" className="form-control" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Dirección</label>
                            <input type="text" className="form-control" value={contact.address} onChange={(e) => setContact({...contact, address: e.target.value})} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3">
                            {id ? "Actualizar Cambios" : "Guardar Contacto"}
                        </button>
                        <Link to="/" className="text-decoration-none d-block text-center">volver a la agenda</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};