import React, { useState } from "react";
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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const App = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleSnackbar = (msg, severity) => {
    setMessage(msg);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/Home"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route
          path="/consultas"
          element={
            <Layout>
              <ConsultasPage handleSnackbar={handleSnackbar} />
            </Layout>
          }
        />
        <Route
          path="/mantenimientos"
          element={
            <Layout>
              <MantenimientoPage handleSnackbar={handleSnackbar} />
            </Layout>
          }
        />
        <Route
          path="/mantenimientos/:id"
          element={
            <Layout>
              <MantenimientoEditPage handleSnackbar={handleSnackbar} />
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

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Router>
  );
};

export default App;
