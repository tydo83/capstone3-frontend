import React, { useReducer } from "react";
export const AuthContext = React.createContext({});

const initialState = {
    user: null,
    isAuth: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "SUCCESS_LOGGED_IN":
            return {
                user: action.user,
                isAuth: true,
            };
        case "LOGGED_OUT":
            return {
                user: null,
                isAuth: false,
            };
        default:
            return initialState;
    }
}

function AuthContextComponent({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextComponent