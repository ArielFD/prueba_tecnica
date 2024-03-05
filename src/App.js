import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Login from "./components/Login";
import Registro from "./components/Registro";
import ConsultasPage from "./pages/ConsultasPage";
import MantenimientoPage from "./pages/MantenimientosPage";
import MantenimientoEditPage from "./pages/MantenimientosEditPage";
import Layout from "./Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route
          path="/consultas"
          element={
            <Layout>
              <ConsultasPage />
            </Layout>
          }
        />
        <Route
          path="/mantenimientos"
          element={
            <Layout>
              <MantenimientoPage />
            </Layout>
          }
        />
        <Route
          path="/mantenimientos/:id"
          element={
            <Layout>
              <MantenimientoEditPage />
            </Layout>
          }
        />

        {/* Redirección a página 404 */}
        <Route path="*" element={<Navigate to="/error" />} />
        <Route
          path="/error"
          element={
            <Layout>
              <ErrorPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
