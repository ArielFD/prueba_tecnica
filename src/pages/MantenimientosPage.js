import { ArrowBack, Save } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/system";
import dayjs from "dayjs";

const MantenimientoPage = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  const [interes, setInteres] = React.useState("");
  const [genero, setGenero] = React.useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [fechaAfiliacion, setFechaAfiliacion] = useState(null);

  const handleFechaNacimiento = (fecha) => {
    setFechaNacimiento(fecha);
  };

  const handleFechaAfiliacion = (fecha) => {
    setFechaAfiliacion(fecha);
  };

  const handleChangeInteres = (event) => {
    setInteres(event.target.value);
  };

  const handleChangeGenero = (event) => {
    setGenero(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let sexo = "";
    switch (genero) {
      case "Masculino":
        sexo = "M";
        break;
      case "Femenino":
        sexo = "F";
        break;
      case "Otro":
        sexo = "O";
        break;

      default:
        break;
    }
    const userData = {
      data: {
        nombre: data.get("Nombre"),
        apellidos: data.get("Apellidos"),
        identificacion: data.get("Identificacion"),
        telefonoCelular: data.get("Telefono"),
        otroTelefono: data.get("TelefonoO"),
        direccion: data.get("Direccion"),
        fNacimiento: dayjs(fechaNacimiento).format("YYYY-MM-DD"),
        fAfiliacion: dayjs(fechaAfiliacion).format("YYYY-MM-DD"),
        sexo: sexo,
        resenaPersonal: data.get("Reseña"),
      },
    };
    // console.log(userData);
    agregarCliente(userData, config);
  };

  async function agregarCliente(userData, header) {
    try {
      console.log(userData, header);
      const response = await axios.post(
        "http://localhost:1337/api/clientes",
        userData,
        header
      );
      console.log("response", response);
      navigate("/consultas");
      // Devuelve la respuesta del servidor
      return response.data;
    } catch (error) {
      // En caso de error, maneja el error adecuadamente
      console.error("Error al registrar cliente:", error);
      throw error; // Puedes lanzar el error para que sea manejado por la capa superior
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          sx={{
            p: 2,
          }}
        >
          <Grid item>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontFamily: "bold" }}
            >
              Mantenimientos de clientes
            </Typography>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              form="miFormulario"
              variant="contained"
              sx={{
                mr: 2,
              }}
              onClick={() => {}}
              startIcon={<Save />}
            >
              Agregar
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/consultas");
              }}
              startIcon={<ArrowBack />}
            >
              Regresar
            </Button>
          </Grid>
        </Grid>
        <Box
          component="form"
          id="miFormulario"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Identificacion"
                variant="outlined"
                id="Identificacion"
                name="Identificacion"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Nombre"
                variant="outlined"
                id="Nombre"
                name="Nombre"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Apellidos"
                variant="outlined"
                id="Apellidos"
                name="Apellidos"
                fullWidth
              />
            </Grid>
            <Grid item xs={4} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel>Genero *</InputLabel>
                <Select
                  required
                  value={genero}
                  label="Genero"
                  onChange={handleChangeGenero}
                >
                  <MenuItem value={"Femenino"}>Femenino</MenuItem>
                  <MenuItem value={"Masculino"}>Masculino</MenuItem>
                  <MenuItem value={"Otro"}>Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Fecha de Nacimiento"
                    format="DD/MM/YYYY"
                    sx={{ width: "100%" }}
                    value={fechaNacimiento} // Asignamos el valor seleccionado
                    onChange={handleFechaNacimiento} // Manejador de cambio de fecha
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Fecha de afiliacion"
                    format="DD/MM/YYYY"
                    sx={{ width: "100%" }}
                    value={fechaAfiliacion} // Asignamos el valor seleccionado
                    onChange={handleFechaAfiliacion} // Manejador de cambio de fecha
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Telefono Celular"
                variant="outlined"
                id="Telefono"
                name="Telefono"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Telefono Otro"
                variant="outlined"
                id="TelefonoO"
                name="TelefonoO"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Intereses *</InputLabel>
                <Select
                  required
                  value={interes}
                  label="Interes"
                  onChange={handleChangeInteres}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Direccion"
                variant="outlined"
                id="Direccion"
                name="Direccion"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Reseña"
                variant="outlined"
                id="Reseña"
                name="Reseña"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default MantenimientoPage;
