import {createContext, JSX, useEffect, useState} from "react";
import {isAuthorized} from "../domain/user/LoginManager.tsx";
import axios from "axios";

// Определяем тип контекста
type AuthContextType = {
    isAuthenticated: boolean; // флаг, показывающий, аутентифицирован ли пользователь
    isLoading: boolean;
    setAuth: (auth: boolean) => void; // функция для изменения значения isAuthenticated
};


// Создаем контекст с типом AuthContextType и начальными значениями по умолчанию
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
    setAuth: () => {
    },
});


// Создаем компонент провайдера, который предоставляет данные контекста всем дочерним компонентам
export const AuthProvider = ({children}: { children: JSX.Element }) => {
    // Используем хук useState для создания переменной isAuthenticated и функции setAuth для ее изменения
    const [isAuthenticated, setAuth] = useState<boolean>(false);
    const [isLoading, setLoad] = useState<boolean>(true);

    useEffect(() => {
        isAuthorized()
            .then(r => {
                setAuth(r.isAuthenticated)
                setLoad(false)
            })
    }, [])

    axios.defaults.headers.common['Authorization'] = null;

    // Возвращаем контекст провайдера, передавая значения isAuthenticated и setAuth в качестве значения контекста
    return (
        <AuthContext.Provider value={{isAuthenticated, isLoading, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

