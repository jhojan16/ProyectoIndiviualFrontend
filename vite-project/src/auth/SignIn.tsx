import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { AuthService } from '../api/users';
import { toast } from 'react-toastify';
import { setUser } from '../redux/users/userSlice';
import { useDispatch } from 'react-redux';
import { saveWithouExpiry } from '../redux/users/localStorage';

export default function SignIn() {
    const Navigate = useNavigate();
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [detailError, setDetailError] = useState(false);
    const [valueError, setValueError] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const user = data.get('user');
        const password = data.get('password')
        try {
            const response = await axios.post(`${AuthService.baseUrl}${AuthService.endpoints.login}`, {
                user: user,
                password: password
            });
            const data = response.data.usuario;
            console.log(data);
            dispatch(setUser({ id: data.id, user: user, userType: data.userType, islogin: true }));

            saveWithouExpiry('user', { id: data.id, user: user, userType: data.userType, islogin: true });

            Navigate("/user/about");
            toast.success('Welcome' + " " + user);
        } catch (error) {
            console.error('Error:', error);
            const res1 = (error as AxiosError).response?.status;
            if (res1 === 404) {
                setValueError(true);
                setDetailError(true);
                toast.warn('User not found');
                console.log('User not found');
            }
        }
    };
    const handleRegisterNavigate = () => {
        Navigate('/register');  // Cambia esto a la ruta de registro que configuraste
    };
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 18,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        error={valueError}
                        fullWidth
                        id="user"
                        label="user"
                        name="user"
                        autoComplete="user"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        value={error}
                        onChange={(e) => setError(e.target.value)}
                        error={detailError}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={handleRegisterNavigate}
                        fullWidth
                        variant="outlined"  // Puedes cambiar el estilo si deseas
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Don't have an account? Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
