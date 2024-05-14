import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import mainListItems from './Listitems';
import { ReactNode } from 'react';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../redux/users/userSlice';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { AuthService } from '../api/users';
import { toast } from 'react-toastify';
import PositionedMenu from './ButtonNoti';
import { setUser } from '../redux/users/userSlice';
import { useDispatch } from 'react-redux';
import { getWithoutExpiry } from '../redux/users/localStorage';



const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export interface UserNodos {
    id: number;
    estadoTapa: string;
    fechahora: string;
}

const NavBar = ({ children }: { children: ReactNode }) => {
    const userType = useSelector((state: { user: UserState }) => state.user.userType);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const handleOnLogout = () => {
        navigate("/");
    }

    const user2 = useSelector((state: { user: UserState }) => state.user.id); 

    const [userNodos2, setUserNodos2] = useState([]);
    const [prevSize, setPrevSize] = useState(0);
    useEffect(() => {
        const getAllUserNodos2 = async () => {
            try {
                const response = await axios.get(`${AuthService.baseUrl}/${user2}`);
                if (!response.data) {
                    throw new Error('No se encontraron notificaciones');
                }
                console.log(response.data);
                setUserNodos2(response.data); // Actualiza el estado de userNodos con los datos obtenidos
            } catch (error) {
                const res1 = (error as AxiosError).response?.status;
                if (res1 === 404) {
                    console.log('No hay notificaciones del dia de hoy');
                }
            }
        }
        getAllUserNodos2();
    }, [user2]);

    useEffect(() => {
        if (userNodos2 && prevSize !== userNodos2.length) {
            console.log('Se ha añadido una nueva notificación!');
            toast.warning('Nuevo estado de la Tapa!');
            // Aquí puedes agregar tu lógica para enviar la notificación, por ejemplo, utilizando alguna librería de notificaciones como react-toastify
        }
        // Actualizar el tamaño previo del array
        setPrevSize(prev => (userNodos2 ? userNodos2.length : prev));
    }, [userNodos2, prevSize]); // Asegúrate de que userNodos está en las dependencias

    const loggedUser = getWithoutExpiry('user');
    if (loggedUser) {
        dispatch(setUser(loggedUser));
    }

    let title;
    switch (location.pathname) {
        case '/user/about':
            title = 'Sobre nosotros';
            break;
        case '/admin/about':
            title = 'Sobre nosotros';
            break;
        default:
            title = 'Dashboard';
    }

    return (
        <Box sx={{ display: 'flex' }}>

            {/* TopBar */}
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>

                    {/* Notifications */}
                    <PositionedMenu
                        userNodos={userNodos2} />
                    <IconButton color="inherit" onClick={handleOnLogout}>
                        <Logout />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <List component="nav">
                    {mainListItems(
                        {
                            typeUser: userType
                        }
                    )}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: "FFFFFF", //"#f8f8f8
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <div className='p-0 sm:p-7'>
                    {children}
                </div>
            </Box>
        </Box >
    );
}
export default NavBar