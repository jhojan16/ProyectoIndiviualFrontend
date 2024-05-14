import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';

interface Props {
    // Define propiedades
    typeUser: string;
}

const renderNodos = ({typeUser}:Props) => {
    
    return (
        <React.Fragment>
            <ListItemButton component={Link} to={`/user/about`}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Sobre Nosotros" />
            </ListItemButton>

            <ListItemButton component={Link} to={`/user/${typeUser}`}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </React.Fragment>

    );
};

export default renderNodos;
