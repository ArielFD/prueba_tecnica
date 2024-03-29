import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Typography,
  IconButton,
  tableCellClasses,
  styled,
} from "@mui/material";
import { Add, ArrowBack, Delete, Edit, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getAllClients, handleEliminarCliente } from "../hooks/clientes";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ConsultasPage = ({ handleSnackbar }) => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroIdentificacion, setFiltroIdentificacion] = useState("");

  useEffect(() => {
    getAllClients().then((response) => {
      setClientes(response);
    });
  }, []);

  const handleEditarCliente = (id) => {
    navigate(`/mantenimientos/${id}`);
  };

  const filtrarDatos = (fila) => {
    return (
      (fila.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) ||
        fila.apellidos.toLowerCase().includes(filtroNombre.toLowerCase())) &&
      fila.identificacion.toString().includes(filtroIdentificacion)
    );
  };

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
              Consulta de clientes
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                mr: 2,
              }}
              onClick={() => {
                navigate("/mantenimientos");
              }}
              startIcon={<Add />}
            >
              Agregar
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/Home");
              }}
              startIcon={<ArrowBack />}
            >
              Regresar
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            p: 2,
          }}
        >
          <Grid item xs={5}>
            <TextField
              label="Nombre"
              variant="outlined"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
              style={{ marginRight: 8 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Identificación"
              variant="outlined"
              value={filtroIdentificacion}
              onChange={(e) => setFiltroIdentificacion(e.target.value)}
              style={{ marginRight: 8 }}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <IconButton variant="contained" onClick={() => {}}>
              <Search />
            </IconButton>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" style={{ width: "150px" }}>
                  Identificación
                </StyledTableCell>
                <StyledTableCell>Nombre Completo</StyledTableCell>
                <StyledTableCell align="center" style={{ width: "120px" }}>
                  Acciones
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.filter(filtrarDatos).map((fila) => (
                <TableRow key={fila._id}>
                  <StyledTableCell align="center">
                    {fila.identificacion}
                  </StyledTableCell>
                  <StyledTableCell>
                    {fila.nombre + " " + fila.apellidos}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleEditarCliente(fila._id);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleEliminarCliente(
                          fila._id,
                          handleSnackbar,
                          getAllClients,
                          setClientes
                        );
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ConsultasPage;
