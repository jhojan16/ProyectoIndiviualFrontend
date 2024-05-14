export const AuthService = {
    baseUrl: import.meta.env.VITE_BACK_USER,
    endpoints: {
        login: '/login',
        cliente: '/info',
        clienteHumedad: '/infohumedad',
        clienteLuz: '/infoluz',
        estadoluz: '/cliente',
    },
};