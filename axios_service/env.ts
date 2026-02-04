export const config = {
    APIUsuariosUrls: {
        baseUrl: process.env.URL_MS_USUARIOS || 'http://localhost:3000',
        getDatosEmpleadoById: (id: number) => `/microservicio-usuarios/usuario/admin/datos-empleado/${id}`,
    },
}