export const config= {
    APIUsuariosUrls: {
        baseUrl: 'http://localhost:3000',
        getDatosEmpleadoById: (id: number) => `/usuarios/datos-empleado/${id}`,
        
    },
}