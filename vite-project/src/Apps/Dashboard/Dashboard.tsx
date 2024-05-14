import { Card, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthService } from '../../api/users';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/cultivo.jpg';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { UserState } from '../../redux/users/userSlice';

interface usuario {
    user: string;
    // otras propiedades...
}
interface nodos {
    idnodo: number;
    // otras propiedades...
}

const Dashboard = () => {

    //Variable globar para el usuario
    const user2 = useSelector((state: { user: UserState }) => state.user.id);

    const [userNodos, setUserNodos] = useState<nodos[] | null>(null);
    const [user, setUser] = useState<usuario | null>(null);
    const navigate = useNavigate();
    const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

    useEffect(() => {
        const getAllUserNodos = async (user2: number) => {

            const response = await axios.get(`${AuthService.baseUrl}${AuthService.endpoints.cliente}/${user2}`);
            if (!response.data.usuario || !response.data.nodos) {
                throw new Error('No se encontró el usuario');
            }
            setUserNodos(response.data.nodos);
            setUser(response.data.usuario);
        }

        getAllUserNodos(user2);

    }, []);

    

    {/*
    const handleClick = async (idnodo: number) => {
        try {
            const jsonData = {
                idnodo: idnodo,
                accionDispensador: 1
            };
            const response = await axios.post(`${AuthService.baseUrl}${AuthService.endpoints.dispensar}`, jsonData);
            console.log('Respuesta del servidor:', response.data);
            // Aquí puedes manejar la respuesta del servidor si es necesario
        } catch (error) {
            console.error('Error al enviar el JSON:', error);
            // Aquí puedes manejar los errores, como mostrar un mensaje al usuario
        }
    };
    */}

    {/*
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [detailError, setDetailError] = useState(false);
    const [valueError, setValueError] = useState(false);
    
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${AuthService.baseUrl}${AuthService.endpoints.tienda}`, {
                mensaje: value,
                usuario_id: id,
                direccion: error
            });
            const data = response.data;
            console.log(data);
            toast.success('Pedido realizado con éxito');

        } catch (error) {
            console.error('Error:', error);
            const res1 = (error as AxiosError).response?.status;
            if (res1 === 500) {
                setValueError(true);
                setDetailError(true);
                console.log('User not found');
            }
        }
    };
    */}

    return (
        <Box className="flex flex-row">
            <Container disableGutters className="bg-green-200 flex flex-col justify-center rounded-lg items-center max-w-3x1 pl-5 pr-5 ">
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                    alignItems="center"
                    className='bg-white w-full rounded-lg mt-10'>
                    <Grid item>
                        <Typography variant="h3">Bienvenido a tu Dashboard {user?.user ?? ''}</Typography>
                    </Grid>
                </Box>
                <Grid container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    margin={5}>
                    {userNodos && userNodos.map((nodo) => (
                        <Grid item key={nodo.idnodo}
                            className='flex flex-row'>
                            <Card className="mt-4 mr-4 max-h-min max-w-xl sm:max-w-80 p-4 rounded-xl">
                                <CardMedia className="rounded-xl"
                                    component="img"
                                    style={{ height: 180 }}
                                    image={logo}
                                />
                                <Grid container justifyContent="space-between" alignItems={'flex-end'}>
                                    <Grid item className="flex flex-col mt-3">
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate(`/user/cliente/${nodo.idnodo}`)}
                                            sx={{ alignSelf: 'left', fontWeight: 600 }}
                                            className='mb-1'
                                        >
                                            Cultivo {nodo.idnodo}
                                        </Button>
                                    </Grid>
                                    <Grid item className="align-bottom">
                                        <IconButton
                                            onClick={() => setSelectedIcon(nodo.idnodo)}
                                        >
                                            {selectedIcon === nodo.idnodo ? <FavoriteIcon color="error" /> : <FavoriteBorder />}
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
export default Dashboard;