import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const cargar = async () => {
            const res = await fetch("https://playground.4geeks.com/contact/agendas/Sebasyt300tylu/contacts");
            if (res.ok) {
                const data = await res.json();
                dispatch({ type: "SET_CONTACTS", payload: data.contacts });
            }
        };
        cargar();
    }, [dispatch]);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-3">
                <h1>Contact List</h1>
                <Link to="/add-contact" className="btn btn-success">Add new contact</Link>
            </div>
            <ul className="list-group">
                {store.contacts.map(c => (
                    <li key={c.id} className="list-group-item d-flex justify-content-between">
                        {c.name} - {c.phone}
                        <button className="btn btn-danger btn-sm">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};