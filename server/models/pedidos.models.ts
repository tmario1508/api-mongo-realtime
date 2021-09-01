import mongoose from 'mongoose';

const PedidoSchema = new mongoose.Schema({
    codigo: { type: String, unique: false, required: true },
    total: { type: Number, unique: false, required: true },
    estatus: {type: String, unique: false, required: true }
});

const Pedido = mongoose.model('Pedido', PedidoSchema);
export default Pedido;