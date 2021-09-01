import { init } from '../express/www';
import mongoose from 'mongoose';
import cron from 'node-cron';
import http from 'http';
import mongoSettings from '../settings';

const api = init();
const port = 6000;
const server = http.createServer(api);
const io = require('socket.io')(server);

io.of('api/socket').on('connection', (socket: any) => {
    console.log('Socket.IO: Cliente Conectado: ', socket.id);

    socket.on('disconnect', () => {
        console.log('Socket.IO: Cliente Desconectado: ', socket.id);
    });
});

server.listen(port, () => {
    console.log(`API Server corriendo en el puerto ${port}`);
});

mongoose.connect(mongoSettings.db.uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
});

const cnn = mongoose.connection;

cnn.once('open', () => {
    console.log('Conexión Exitosa a MongoDB !!!');

    const postitChangeStream = cnn.collection('postits').watch();
    console.log('Escuchando Cambios en la Colección postits ...');
    postitChangeStream.on('change', (change) => {
        switch(change.operationType) {
            case 'insert':
                const postit = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    description: change.fullDocument.description
                };

                io.of('/api/socket').emit('newPostit', postit);

                break;
            case 'delete':
                io.of('/api/socket').emit('deletedPostit', change.documentKey._id);
                break;
        }
    })
});

cnn.on('error', (error: any) => {
    console.log('Error MongoDB: ', error);
});