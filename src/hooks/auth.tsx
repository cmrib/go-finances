import { createContext, ReactNode, useContext } from "react";


interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    user: User;
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

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    return context;
}

export { AuthProvider, useAuth }