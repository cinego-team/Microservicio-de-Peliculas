export const config = {
    APIUsuariosUrls: {
        baseUrl: `http://localhost:3004`,
        getDatosEmpleadoById: (id: number) => `/microservicio-usuarios/usuario/admin/datos-empleado/${id}`,
    },
}