import React, { createContext, useReducer } from "react";
import { signin, logout } from "../services/api";
import { message } from "antd";

export const AccountContext = createContext();
let token = null;

const initialState = {
  email: "",
  password: "",
  passwordAgain: "",
  isLoading: false,
  loginForm: true,
  loggingIn: true,
  user: {},
  isIssues: false,
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_CHANGED":
      return { ...state, email: action.payload };

    case "PASSWORD_CHANGED":
      return { ...state, password: action.payload };

    case "LOGIN_FORM":
      return { ...state, loginForm: true };

    case "REQUEST_SUCCESS": {
      message.success("Bienvenue " + action.payload.userName);
      // console.log(action.payload)
      const data = action.payload;
      if (data) {
        token = data.jwToken;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("ctaId", data.id);
        localStorage.setItem("userName", data.userName);
      }
      return {
        ...state,
        isLoading: false,
        loggingIn: data ? true : false,
        loginForm: false,
        user: data ? data : null,
        email: "",
        password: "",
      };
    }

    case "REQUEST_FAIL":
      message.error("" + action.payload.message);
      return {
        ...state,
        isIssues: true,
        isLoading: false,
        errors: action.payload,
      };
    case "REQUEST_FAIL_ACCESS":
      message.error("Vous n'avez pas le bon accès pour vous connecter");
      return {
        ...state,
        isIssues: true,
        isLoading: false,
        errors: action.payload,
      };

    case "REQUEST":
      return { ...state, isLoading: true };

    case "RESET":
      return initialState;

    case "LOGOUT": {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("ctaId");
      return {
        loginForm: true,
        loggingIn: false,
        user: null,
        userId: null,
        token: null,
      };
    }
    default:
      break;
  }
  return state;
};

export const AccountContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onEmailChanged = (data) => {
    dispatch({ type: "EMAIL_CHANGED", payload: data });
  };
  const onPasswordChanged = (data) => {
    dispatch({ type: "PASSWORD_CHANGED", payload: data });
  };

  const loginUser = () => signin(dispatch, state);

  const logoutUser = () => logout(dispatch, state);

  return (
    <AccountContext.Provider
      value={{
        state,
        loginUser,
        logoutUser,
        onPasswordChanged,
        onEmailChanged,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};
