import React, { createContext, useContext } from "react";
import axios from "axios";

const ApiContext = createContext();

// Crea una instancia de Axios con la URL base de tu API
const api = axios.create({ baseURL: "http://localhost:1337" });

export const ApiProvider = ({ children }) => {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};
