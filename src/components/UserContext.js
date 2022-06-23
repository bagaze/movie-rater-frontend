import { createContext, useState, useEffect } from "react";
import { useStateWithLocalStorage } from "../utils/hooks";
import { getMeMRBack } from "../utils/helper_api";

export const UserContext = createContext([{}, () => {}]);

export const UserProvider = (props) => {
    const [ error, setError ] = useState(false);
    const [ errorInfo, setErrorInfo ] = useState('');

    const [user, setUser] = useStateWithLocalStorage(
        'movierater__usercontext',
        {
            loggedIn: false,
            userInfos: {
                username: '',
                access_token: ''
            }
        }
    );

    // Disconnect user if the token is not valid anymore
    useEffect( () => {
        if (user.loggedIn === true) {
            const fetchUser = async () => {
                await getMeMRBack(user.userInfos.access_token, setError, setErrorInfo);
            }
            fetchUser();
        }
    }, [user]);
    useEffect( () => {
        if (error) {
            console.log("Token is not valid anymore");
            console.log(`error: ${error}`);
            console.log(errorInfo);
            setUser({
                loggedIn: false,
                userInfos: {
                    username: '',
                    access_token: ''
                }
            });
        }
    }, [error, errorInfo, setUser]);

    return (
        <UserContext.Provider value={[user, setUser]}>
        {props.children}
        </UserContext.Provider>
    );
}
