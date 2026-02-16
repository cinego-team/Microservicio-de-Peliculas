export const config = {
    APIUsuariosUrls: {
        baseUrl: `http://localhost:${process.env.PUERTO_MS_USUARIOS}`,
        getDatosEmpleadoById: (id: number) => `/microservicio-usuarios/usuario/admin/datos-empleado/${id}`,
    },
}