import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthService } from '../api/users';
import { toast } from 'react-toastify';
import Autocomplete from '@mui/material/Autocomplete';
const options = ['Cliente', 'Tienda'];


export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();
  const [detailError, setDetailError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [value1, setValue1] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userType = value1 || inputValue;
    if (!username.trim() || !password.trim() || !userType) {
      toast.error('Error: Campos vacios');
      setValueError(true);
      setDetailError(true);
      return;
    }
    try {
      const response = await axios.post(`${AuthService.baseUrl}${AuthService.endpoints.register}`, {
        user: username,
        password: password,
        userType: userType
      });
      console.log(response.data.message);
      Navigate('/'); // Redirigir al login tras un registro exitoso
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleSigninNavigate = () => {
    Navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs" className=' mt-36'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            error={valueError}
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={detailError}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Autocomplete
            value={value1}
            onChange={(event: any, newValue: string | null) => {
              setValue1(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Type user" />}
            className='mt-4'
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Button
            onClick={handleSigninNavigate}
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2 }}
          >
            Already have an account? Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
