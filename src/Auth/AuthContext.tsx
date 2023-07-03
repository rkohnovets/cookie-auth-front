import React from "react";
import { api_https } from "../utils/constants";

type SignUpInfo = {
    Username: string,
    Password: string,
    ConfirmPassword: string
}
// то же самое, что SignUpInfo, но без поля ConfirmPassword
type SignInInfo = Omit<SignUpInfo, 'ConfirmPassword'>;
// то же самое, что SignInInfo, но без поля Password
type User = Omit<SignInInfo, 'Password'>;

interface AuthContextType {
    user: User | null
    // коллбэк - например, редирект на какую-то страницу
    signUp: (newUser: SignUpInfo, callback: VoidFunction) => void,
    signIn: (user: SignInInfo, callback: VoidFunction) => void;
    signOut: (callback: VoidFunction) => void;
}
  
let AuthContext = React.createContext<AuthContextType>(null!);
  
function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<User | null>(null);

    let signUp = async (newUser: SignUpInfo, callback: VoidFunction) => {
        let response = await fetch(api_https + '/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(newUser)
        });
        
        if(response.ok) {
            setUser({ Username: newUser.Username });
            alert("registered and authenticated");
            callback();
        } else {
            let text = await response.text();
            alert("code " + response.status + "; message: " + text);
        }
    }
    
    let signIn = async (user: SignInInfo, callback: VoidFunction) => {
        let response = await fetch(api_https + '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(user)
        });
        
        if(response.ok) {
            setUser({ Username: user.Username });
            alert("logged on");
            callback();
        } else {
            let text = await response.text();
            alert("code " + response.status + "; message: " + text);
        }
    };
  
    let signOut = async (callback: VoidFunction) => {
        let response = await fetch(api_https + '/api/auth/logout', {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        });
        
        if(response.ok) {
            let text = await response.text();
            setUser(null);
            alert("logged out, message from server: " + text);
            callback();
        } else {
            let text = await response.text();
            alert("code " + response.status + "; message: " + text);
        }
    };
  
    let value = { user, signIn, signUp, signOut };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// хук для более удобного получения инфы о пользователе 
// (хотя хз, по моему хуйня, так как все равно одна строка)
function useAuth() {
    return React.useContext(AuthContext);
}

export { AuthContext, AuthProvider, useAuth }