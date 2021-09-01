import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import postitRoutes from '../routes/postit.routes';

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
    app.use('/api/wall/', postitRoutes);
    // Retornar Express App
    return app;
}