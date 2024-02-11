import React, { useEffect, useState } from "react";
import { api_https } from "../utils/constants";

type RegisterOrLoginInfo = {
    Username: string,
    Password: string
}

type User = {
    Username: string
}

interface AuthContextType {
    user: User | null
    signUp: (user: RegisterOrLoginInfo, callback: VoidFunction) => void,
    signIn: (user: RegisterOrLoginInfo, callback: VoidFunction) => void;
    signOut: (callback: VoidFunction) => void;
}
let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const signUp = async (user: RegisterOrLoginInfo, callback: VoidFunction) => {
        let response = await fetch(api_https + '/api/auth/register', {
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
            alert("registered and authenticated");
            callback();
        } else {
            let text = await response.text();
            alert("code " + response.status + "; message: " + text);
        }
    }
    
    const signIn = async (user: RegisterOrLoginInfo, callback: VoidFunction) => {
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
  
    const signOut = async (callback: VoidFunction) => {
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
    
    const checkAuth = async () => {
        setLoading(true);

        let response = await fetch(api_https + '/api/auth/check', {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        });
        
        if(response.ok) {
            let body = await response.json();
            //console.log(body);
            setUser({ Username: body.username });
            setLoading(false);
        } else {
            setUser(null);
            setLoading(false);
        }

    };

    useEffect(() => {
        checkAuth();
    }, []);
  
    let value = { user, signIn, signUp, signOut };

    if(loading) {
        return <div>Loading...</div>;
    }
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// кастомный хук для более удобного получения инфы о пользователе
function useAuth() {
    return React.useContext(AuthContext);
}

export { AuthContext, AuthProvider, useAuth }