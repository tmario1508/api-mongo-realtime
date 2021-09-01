import { Request, Response } from 'express';
import Pedido from '../models/pedidos.models';



export const addPedido = async (req: Request, res: Response) => {
    
    const {codigo, total, estatus,  } = req.body;
    
    try {
        const pedido = await Pedido.create({codigo, total, estatus});

        return res.status(200).json({
            success: true,
            message: 'Pedido agregado de forma exitosa'
        });
    } catch (error) {
        console.log('Error al intentar agregar Pedido: ', error);
        return res.status(500).json({
            success: false,
            message: 'Error al intentar agregar Postit. Ver la consola del servidor para mayor detalle'
        }); 
    }
};

export const getPedido = async (req: Request, res: Response) => {
    try {
        const pedidos = await Pedido.find().where({});
        res.status(200).json({
            success: true,
            message: pedidos
        })
        
    } catch (error) {
        console.log('Error al intentar obtener los Pedidos: ', error);
        return res.status(500).json({
            success: false,
            message: 'Error al intentar obtener los Pedidos. Ver la consola del servidor para mayor detalle'
        });
    }
};

