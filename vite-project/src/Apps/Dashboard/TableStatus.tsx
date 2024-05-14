import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export interface Order {
    id: number;
    usuarioId: number;
    estado: string;
    fechahora: string;
}

// Generate Order Data
interface TablesProps {
    orders2: Order[]
}

export default function Tables2({ orders2 }: TablesProps) {
    return (
        <React.Fragment>
            <Table stickyHeader>
                <TableHead>
                    <TableRow> 
                        <TableCell align="center" style={{ fontSize: 'larger' }}>id</TableCell>
                        <TableCell align="center" style={{ fontSize: 'larger' }}>usuario</TableCell>
                        <TableCell align="center" style={{ fontSize: 'larger' }}>value</TableCell>
                        <TableCell align="center" style={{ fontSize: 'larger' }}>fechahora</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders2.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell align="center" style={{ fontSize: 'larger' }} className='bg-green-100'>
                                {order.id}
                            </TableCell>
                            <TableCell align="center" style={{ fontSize: 'larger' }}>
                                {order.usuarioId}
                            </TableCell>
                            <TableCell align="center" style={{ fontSize: 'larger' }} className='bg-green-100'>
                                {order.estado}
                            </TableCell>
                            <TableCell align="center" style={{ fontSize: 'larger' }}>
                                {new Date(order.fechahora).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
