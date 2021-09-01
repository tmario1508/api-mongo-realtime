import { init } from './express/www.pedidos';
import mongoose, { connection } from 'mongoose';
import cron from 'node-cron';
import http from 'http';
import mongoSettings from './settings';

const api = init();
const port = 5000;
const server = http.createServer(api);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
    allowEI03: true
});

server.listen(port, () => {
    console.log(`Api server correindo en el puerto ${port}`);
});

mongoose.connect(mongoSettings.db.uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
});

const cnn = mongoose.connection;

cnn.once('open', () => {
    console.log('Conexion exitosa a MongoDB !!!');

    const pedidoChangeStream = cnn.collection('pedidos').watch();

    console.log('Escuchando cambios en la coleccion pedidos ...');

    pedidoChangeStream.on('change', (change) => {
        switch(change.operationType) {
            case 'insert':
                const pedido = {
                    codigo: change.fullDocument.codigo,
                    precio: change.fullDocument.total,
                    estatus: change.fullDocument.estatus
                };

                io.of('/api/socket').emit('newPedido', pedido);
                break;
            case 'delete':
                io.of('/api/socket').emit('deletedPedido', change.documentKey._id);
                break;
            case 'update':
                io.of('/api/socket').emit('updatePedido', change.documentKey._id);
                break;
        }
    })
});

cnn.on('error', (error: any) => {
    console.log('Error MongoDB: ', error);
});