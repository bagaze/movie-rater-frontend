import { useEffect, useState } from "react";

export function useStateWithSessionStorage(sessionStorageKey, initialValue) {
    const [ value, setValue ] = useState(JSON.parse(sessionStorage.getItem(sessionStorageKey)) || initialValue);

    useEffect( () => {
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(value));
    }, [value, sessionStorageKey]);
    return [ value, setValue ];
}

export function useStateWithLocalStorage(localStorageKey, initialValue) {
    const [ value, setValue ] = useState(JSON.parse(localStorage.getItem(localStorageKey)) || initialValue);

    useEffect( () => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value, localStorageKey]);
    return [ value, setValue ];
}
