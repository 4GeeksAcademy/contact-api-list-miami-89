import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    // Traer contactos de la API
    const cargarContactos = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/Sebasyt300tylu/contacts");
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: "SET_CONTACTS", payload: data.contacts });
            }
        } catch (error) {
            console.error("Error al cargar contactos:", error);
        }
    };

    // Borrar contacto
    const borrarContacto = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/Sebasyt300tylu/contacts/${id}`, {
                method: "DELETE"
            });
            if (response.ok) cargarContactos(); // Recargamos la lista tras borrar
        } catch (error) {
            console.error("Error al borrar:", error);
        }
    };

    useEffect(() => {
        cargarContactos();
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold">Mi Agenda</h1>
                <Link to="/add-contact">
                    <button className="btn btn-success px-4 shadow-sm">
                        <i className="fas fa-plus me-2"></i>Añadir nuevo contacto
                    </button>
                </Link>
            </div>
            
            <div className="list-group shadow-sm">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contacto) => (
                        <div key={contacto.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <div className="d-flex align-items-center">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${contacto.name}&background=random&color=fff`} 
                                    alt="avatar" 
                                    className="rounded-circle me-3 shadow-sm" 
                                    style={{ width: "55px", height: "55px" }}
                                />
                                <div>
                                    <h5 className="mb-0 fw-bold">{contacto.name}</h5>
                                    <p className="mb-0 text-muted small"><i className="fas fa-envelope me-2"></i>{contacto.email}</p>
                                    <p className="mb-0 text-muted small"><i className="fas fa-phone me-2"></i>{contacto.phone}</p>
                                </div>
                            </div>

                            <div className="d-flex gap-2">
                                {/* IMPORTANTE: El Link de editar debe usar backticks `` y el ID del contacto */}
                                <Link to={`/edit-contact/${contacto.id}`}>
                                    <button className="btn btn-outline-dark btn-sm border-0">
                                        <i className="fas fa-pencil-alt fs-5"></i>
                                    </button>
                                </Link>
                                
                                <button 
                                    className="btn btn-outline-danger btn-sm border-0"
                                    onClick={() => borrarContacto(contacto.id)}
                                >
                                    <i className="fas fa-trash-alt fs-5"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-5 bg-light">
                        <p className="text-muted">No hay contactos guardados.</p>
                    </div>
                )}
            </div>
        </div>
    );
};