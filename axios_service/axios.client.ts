import axios from 'axios';
import { config } from './env';

export const axiosAPIUsuario = axios.create({
    baseURL: config.APIUsuariosUrls.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});
