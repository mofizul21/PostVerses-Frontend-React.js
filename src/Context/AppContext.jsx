// fronted\src\Context\AppContext.jsx
import { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config';

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    async function getUser() {
        const res = await fetch(`${ BASE_URL }/api/user`, {
            headers: {
                Authorization: `Bearer ${ token }`,
            }
        });

        if (res.status === 401) {
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
            return;
        }

        const data = await res.json();

        if (res.ok) {
            setUser(data);
        }
    }

    useEffect(() => {
        if (token) {
            getUser();
        }
    }, [token]);

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser, BASE_URL }}>
            {children}
        </AppContext.Provider>
    );
}
