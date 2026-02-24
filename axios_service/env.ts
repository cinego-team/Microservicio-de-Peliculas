export const config = {
    APIUsuariosUrls: {
        baseUrl: `http://localhost:3004`,
        getDatosEmpleadoById: (id: number) => `/usuario/admin/datos-empleado/${id}`,
    },
}