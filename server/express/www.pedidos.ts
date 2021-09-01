import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import pedidosRoutes from '../routes/pedidos.routes';

export const init = () => {

    //Inicializar la Aplicacion de Express
    const app = express();
    
    //Middlewares
    app.use(cors());

    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());
    
    // Logging de Peticiones HTTP
    app.use(morgan('dev'));
    // Agregar Rutas
    app.use('/api/wall/', pedidosRoutes);
    // Retornar Express App
    return app;
}