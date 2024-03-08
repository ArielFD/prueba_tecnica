import axios from "axios";
import dayjs from "dayjs";

const URL = "https://backend-nest-iota.vercel.app";

export async function getAllClients() {
  try {
    const response = await axios.get(
      `${URL}/clientes`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error obteniendo lista de clientes", error);
  }
}

export async function handleEliminarCliente(
  id,
  handleSnackbar,
  getAllClients,
  setClientes
) {
  const config = {}; // Aquí define tu configuración

  try {
    const response = await axios.delete(`${URL}/clientes/${id}`, config);
    console.log(response);
    handleSnackbar("Cliente eliminado", "success");
    const newClients = await getAllClients();
    setClientes(newClients);
  } catch (error) {
    handleSnackbar("Error al eliminar el cliente", "error");
    console.log(error);
  }
}

export async function agregarCliente(userData, header, handleSnackbar, navigate) {
  try {
    console.log(userData, header);
    const response = await axios.post(`${URL}/clientes`, userData);
    console.log("response", response);
    handleSnackbar("Cliente agregado", "success");
    navigate("/consultas");
    return response.data;
  } catch (error) {
    handleSnackbar("Error al registrar cliente", "error");
    console.error("Error al registrar cliente:", error);
    throw error;
  }
}

export async function actualizarCliente(
  id,
  userData,
  header,
  handleSnackbar,
  navigate
) {
  try {
    console.log(userData, header);
    const response = await axios.put(`${URL}/clientes/${id}`, userData);
    console.log("response", response);
    handleSnackbar("Cliente editado", "success");
    navigate("/consultas");
    return response.data;
  } catch (error) {
    handleSnackbar("Error al editar cliente", "error");
    console.error("Error al editar cliente:", error);
    throw error;
  }
}

export async function getClientById(
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
) {
  try {
    const response = await axios.get(`${URL}/clientes/${id}`);
    console.log("response", response);
    const clienteData = response.data;

    const {
      identificacion,
      nombre,
      apellidos,
      sexo,
      fNacimiento,
      fAfiliacion,
      telefonoCelular,
      otroTelefono,
      interesFK,
      direccion,
      resenaPersonal,
      imagen,
    } = clienteData;

    setIdentificacion(identificacion);
    setNombre(nombre);
    setApellidos(apellidos);
    setImageData(imagen);

    let genero;
    switch (sexo) {
      case "M":
        genero = "Masculino";
        break;
      case "F":
        genero = "Femenino";
        break;
      case "O":
        genero = "Otro";
        break;
      default:
        break;
    }
    setGenero(genero);

    setFechaNacimiento(dayjs(fNacimiento, "YYYY/MM/DD"));
    setFechaAfiliacion(dayjs(fAfiliacion, "YYYY/MM/DD"));

    setTelefono(telefonoCelular);
    setTelefonoO(otroTelefono);
    if (interesFK) setInteres(interesFK);
    setDireccion(direccion);
    setReseña(resenaPersonal);

    return response.data;
  } catch (error) {
    console.log("Error obteniendo lista de clientes", error);
  }
}