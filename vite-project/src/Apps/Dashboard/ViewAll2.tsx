import Orders from "./Table";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import logo from "../../assets/huerto.jpg";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart } from "@mui/x-charts";
import { format } from 'date-fns';
import { Gauge } from '@mui/x-charts/Gauge';
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ManageNodosService } from "../../api/nodos";
import Orders2 from "./TableStatus";


interface Data {
    id: number;
    usuario_id: number;
    idnodo: number;
    value: number;
    fechahora: string;
}

interface Data2 {
    id: number;
    usuario_id: number;
    idnodo: number;
    value: number;
    fechahora: string;
}

interface Data3 {
    id: number;
    usuarioId: number;
    estado: string;
    fechahora: string;
}

const Viewall2 = () => {
    const { id } = useParams();
    const [userNodoPeso, setUserNodos] = useState<Data[]>([]);
    const [userNodoLuz, setUserNodosLuz] = useState<Data2[]>([]);
    const [loading, setLoading] = useState(true)
    const [bothCallsCompleted, setBothCallsCompleted] = useState(false);
    const [estado, setestado] = useState<Data3[]>([]);
    const [estadoHumedad, setestadoHumedad] = useState<Data3[]>([]);


    useEffect(() => {
        const getAllUserNodos = async () => {
            console.log(id);
            try {
                setLoading(true);


                const response = await axios.get(`${ManageNodosService.baseUrl}${ManageNodosService.endpoints.nodos}/${id}`);
                const response2 = await axios.get(`${ManageNodosService.baseUrl}${ManageNodosService.endpoints.estadoluz}/${id}`);
                const response3 = await axios.get(`${ManageNodosService.baseUrl}${ManageNodosService.endpoints.estadohumedad}/${id}`);

                if (!response.data) {
                    // Si no se encuentran datos, muestra una vista "no hay datos"
                    console.log('No se encontraron datos para el usuario');
                    // Aquí puedes redirigir a una página específica o mostrar un mensaje en la misma página
                } else {
                    setLoading(false);
                    setUserNodos(response.data.humedad);
                    setUserNodosLuz(response.data.luz);
                    setestado(response2.data);
                    setestadoHumedad(response3.data);

                    console.log("hola", response2.data);
                    console.log(response.data.humedad);
                    console.log(response.data.luz);
                    setBothCallsCompleted(true);
                }
                if (bothCallsCompleted) {
                    toast.success('Bienvenido a la vista de nodos');
                }
            } catch (error) {
                const res = (error as AxiosError).response?.status;
                if (!bothCallsCompleted === false) {
                    if (res === 401) {
                        toast.error('Contraseña o correo electrónico incorrecto');
                    } else if (res === 404) {
                        toast.error('No se encontró el recurso solicitado');
                    } else {
                        toast.warn('Algo salió mal, no eres tu, somos nosotros, inténtalo de nuevo más tarde');
                    }
                }
                setBothCallsCompleted(true);
            }
        };

        getAllUserNodos();
    }, [id, bothCallsCompleted]);

    if (!userNodoPeso && !userNodoLuz) {
        return
    }
    // ...rest of the code
    return (

        <Box className="flex flex-row">
            <Box className="hidden sm:block">
                <IconButton onClick={() => window.history.back()}>
                    <ArrowBackIcon color="primary" style={{ fontSize: 40 }} />
                </IconButton>
            </Box>
            <Container className="bg-green-200 flex flex-col justify-center rounded-lg items-center max-w-3x1">
                {!loading && (
                    <>
                        <Box className="bg-white flex flex-row justify-around items-center w-full rounded-lg mt-10 mb-10 ">
                            <Box className="flex flex-col items-center">
                                <Typography variant='h3' >Información</Typography>
                                <Typography variant='h5' >Nodo {id}</Typography>
                            </Box>
                            <Box className="flex flex-col items-center mt-1 mb-1">
                                <CardMedia className="rounded-xl"
                                    component="img"
                                    style={{ height: 100 }}
                                    image={logo}
                                />
                            </Box>
                        </Box>
                    </>
                )}
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <CircularProgress />
                        <Typography variant="h5" className="ml-4">Cargando...</Typography>
                        <Link to='#' onClick={() => window.history.back()}>
                            <Typography variant="h5" color="primary" className="ml-4">Si tarda demasiado, por favor de click aqui</Typography>
                        </Link>
                    </div>
                ) : (
                    <>
                        <Box className="bg-white w-full mb-5 rounded-xl">
                            <Typography variant='h5' align="center">Humedad relativa</Typography>
                        </Box>
                        <div className="flex flex-row justify-between w-full mb-5">
                            <Container className="flex bg-white max-h-96 overflow-y-auto rounded-xl">
                                {userNodoPeso && (
                                    <Orders
                                        orders={userNodoPeso}
                                    />
                                )}
                            </Container>
                            <Box className="flex flex-col bg-white ml-3 rounded-2xl">
                                <Typography variant='h5' align="center">Humedad actual</Typography>
                                <Gauge height={200}
                                    value={userNodoPeso.map(entry => entry.value).slice(-1)[0]}
                                    valueMax={100} />
                            </Box>
                        </div>

                        <div className="bg-white w-full mb-5 rounded-xl">
                            {userNodoPeso && (
                                <LineChart
                                    xAxis={[{
                                        id: 'Hora',
                                        data: userNodoPeso.slice(-10).map(entry => new Date(entry.fechahora)),
                                        label: 'Hora',
                                        valueFormatter: (entry) => format(entry, 'HH:mm:ss'),
                                    },
                                    ]}
                                    series={[
                                        {
                                            id: 'Humedad del cultivo',
                                            data: userNodoPeso.slice(-10).map(entry => entry.value),
                                            label: 'Humedad',
                                        },
                                        {
                                            id: 'Cantidad de luz',
                                            data: userNodoLuz.slice(-10).map(entry => entry.value),
                                            label: 'Luz',
                                        },
                                    ]}
                                    margin={{ left: 30, right: 30, top: 30, bottom: 50 }}
                                    grid={{ vertical: true, horizontal: true }}
                                    height={400}
                                />
                            )}
                        </div>

                        <Box className="bg-white w-full mb-5 rounded-xl">
                            <Typography variant='h5' align="center">Cantidad de luz</Typography>
                        </Box>
                        <Container className="bg-white max-h-96 overflow-y-auto mb-5 rounded-xl">
                            {userNodoLuz && (
                                <Orders
                                    orders={userNodoLuz}
                                />
                            )}
                        </Container>

                        <Container className="bg-white flex flex-row max-h-96 overflow-y-auto mb-5 rounded-xl justify-around">
                            <Box className="rounded-xl">
                                <Box className="bg-white w-full mb-5 rounded-xl">
                                    <Typography variant='h5' align="center">Estados luz</Typography>
                                </Box>
                                {estado && (
                                    <Orders2
                                        orders2={estado}
                                    />
                                )}
                            </Box>
                            <Box className="rounded-xl">
                                <Box className="bg-white w-full mb-5 rounded-xl">
                                    <Typography variant='h5' align="center">Estados humedad</Typography>
                                </Box>
                                {estadoHumedad && (
                                    <Orders2
                                        orders2={estadoHumedad}
                                    />
                                )}
                            </Box>
                        </Container>
                    </>
                )}
            </Container>
        </Box>
    );
}
export default Viewall2;