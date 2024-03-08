import { ArrowBack, Edit } from "@mui/icons-material";
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
  Avatar,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { actualizarCliente, getClientById } from "../hooks/clientes";

const MantenimientoPage = ({ handleSnackbar }) => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  let { id } = useParams();

  const config = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  const [imageData, setImageData] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageData(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [Identificacion, setIdentificacion] = React.useState("");
  const [Nombre, setNombre] = React.useState("");
  const [Apellidos, setApellidos] = React.useState("");
  const [Telefono, setTelefono] = React.useState("");
  const [TelefonoO, setTelefonoO] = React.useState("");
  const [Direccion, setDireccion] = React.useState("");
  const [Reseña, setReseña] = React.useState("");
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

  const handleChangeIdentificacion = (event) => {
    setIdentificacion(event.target.value);
  };

  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  // Función para manejar el cambio de los apellidos
  const handleChangeApellidos = (event) => {
    setApellidos(event.target.value); // Actualiza el estado de los apellidos
  };

  // Función para manejar el cambio del nombre
  const handleChangeTelefono = (event) => {
    setTelefono(event.target.value); // Actualiza el estado del nombre
  };

  // Función para manejar el cambio de los apellidos
  const handleChangeTelefonoO = (event) => {
    setTelefonoO(event.target.value); // Actualiza el estado de los apellidos
  };

  // Función para manejar el cambio del nombre
  const handleChangeDireccion = (event) => {
    setDireccion(event.target.value); // Actualiza el estado del nombre
  };

  // Función para manejar el cambio de los apellidos
  const handleChangeReseña = (event) => {
    setReseña(event.target.value); // Actualiza el estado de los apellidos
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

    let nacimiento = null;
    if (dayjs(fechaNacimiento, "YYYY-MM-DD").isValid()) {
      nacimiento = dayjs(fechaNacimiento).format("YYYY-MM-DD");
    }

    let afiliacion = null;
    if (dayjs(fechaNacimiento, "YYYY-MM-DD").isValid()) {
      afiliacion = dayjs(fechaAfiliacion).format("YYYY-MM-DD");
    }

    const userData = {
      nombre: data.get("Nombre"),
      apellidos: data.get("Apellidos"),
      identificacion: data.get("Identificacion"),
      telefonoCelular: data.get("Telefono"),
      otroTelefono: data.get("TelefonoO"),
      direccion: data.get("Direccion"),
      fNacimiento: nacimiento,
      fAfiliacion: afiliacion,
      sexo: sexo,
      interesFK: interes,
      resenaPersonal: data.get("Reseña"),
      imagen: imageData,
    };
    
    actualizarCliente(id, userData, config, handleSnackbar, navigate);
  };

  useEffect(() => {
    getClientById(
      id,
      setIdentificacion,
      setNombre,
      setApellidos,
      setImageData,
      setGenero,
      setFechaNacimiento,
      setFechaAfiliacion,
      setTelefono,
      setTelefonoO,
      setInteres,
      setDireccion,
      setReseña
    );
  }, [id]);

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
            <Box display="flex" alignItems="left">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button component="span">
                  <Avatar src={imageData} />
                </Button>
              </label>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", fontFamily: "bold" }}
              >
                Mantenimientos de clientes
              </Typography>
            </Box>
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
              startIcon={<Edit />}
            >
              Editar
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
        <form id="miFormulario" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Identificacion"
                variant="outlined"
                id="Identificacion"
                name="Identificacion"
                fullWidth
                value={Identificacion}
                onChange={handleChangeIdentificacion}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Nombre"
                variant="outlined"
                id="Nombre"
                name="Nombre"
                fullWidth
                value={Nombre}
                onChange={handleChangeNombre}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Apellidos"
                variant="outlined"
                id="Apellidos"
                name="Apellidos"
                fullWidth
                value={Apellidos}
                onChange={handleChangeApellidos}
                required
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
                value={Telefono}
                onChange={handleChangeTelefono}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Telefono Otro"
                variant="outlined"
                id="TelefonoO"
                name="TelefonoO"
                fullWidth
                value={TelefonoO}
                onChange={handleChangeTelefonoO}
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
                  <MenuItem value={"Musica"}>Musica</MenuItem>
                  <MenuItem value={"Leer"}>Leer</MenuItem>
                  <MenuItem value={"Trabajar"}>Trabajar</MenuItem>
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
                value={Direccion}
                onChange={handleChangeDireccion}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Reseña"
                variant="outlined"
                id="Reseña"
                name="Reseña"
                fullWidth
                value={Reseña}
                onChange={handleChangeReseña}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default MantenimientoPage;
