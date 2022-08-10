import { createContext, ReactNode, useContext } from "react";
import * as AuthSession from 'expo-auth-session';


interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}


const AuthContext = createContext({} as AuthContextData)


function AuthProvider({ children }: AuthProviderProps) {

    const user = {
        id: '418257109',
        name: 'Cicero Ribeiro',
        email: 'cicero@email.com'
    }

    async function signInWithGoogle() {
        try {

            const CLIENT_ID = '328819340534-rfdgjk0mon828eci5idcqtem20esbi6k.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@cmrib/gofinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const response = await AuthSession.startAsync({ authUrl: authUrl })
            console.log(response)


        } catch (error: any) {
            throw new Error(error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    return context;
}

export { AuthProvider, useAuth }