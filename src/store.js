export const initialStore = () => {
    return {
        contacts: [] 
    }
}

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        // 1. Cargar todos (Limpia la lista vieja y pone la nueva del servidor)
        case "SET_CONTACTS":
            return {
                ...store,
                contacts: action.payload
            };

        // 2. Añadir uno nuevo (Lo pone al final de la lista)
        case "ADD_CONTACT":
            return {
                ...store,
                contacts: [...store.contacts, action.payload]
            };

        // 3. EDITAR (La clave para evitar duplicados)
        case "EDIT_CONTACT":
            return {
                ...store,
                // .map busca el ID y REEMPLAZA los datos, no añade una fila nueva
                contacts: store.contacts.map(item => 
                    item.id === action.payload.id ? action.payload : item
                )
            };

        default:
            return store;
    }
}