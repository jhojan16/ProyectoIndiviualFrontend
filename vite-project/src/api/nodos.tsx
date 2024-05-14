export const ManageNodosService = {
    baseUrl: import.meta.env.VITE_BACK_USER2,
    endpoints: {
        admin: '/datos',
        nodos: '/datosNodo',
        estadoluz: '/estadoluz',
        estadohumedad: '/estadohumedad',


        getNodos: '/',
        getPeso: '/datosPeso',
        getUltrasonido: '/datosUltrasonido',
        postPeso: '/datosPeso',
        postUltrasonido: '/datosUltrasonido',
        deletePeso: '/datosPeso',
        deleteUltrasonido: '/datosUltrasonido',
    },
};