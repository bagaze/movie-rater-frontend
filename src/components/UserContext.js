import { createContext } from "react";
import { useStateWithLocalStorage } from "../utils/hooks";

export const UserContext = createContext([{}, () => {}]);

export const UserProvider = (props) => {
    const [user, setUser] = useStateWithLocalStorage(
        'movierater__usercontext',
        {
            loggedIn: false,
            userInfos: {
                username: '',
                email: '',
                password: '',
                token: ''
            }
        }
    );
    return (
        <UserContext.Provider value={[user, setUser]}>
        {props.children}
        </UserContext.Provider>
    );
}
