import { Request, Response } from 'express';
import Postit from '../models/postit.model';
import Pedido from '../models/pedidos.models';

export const addPostit = async (req: Request, res: Response) => {
    
    const { name, description} = req.body;
    
    try {
        const postit = await Postit.create({name, description});

        return res.status(200).json({
            success: true,
            message: 'Postit agregado de forma exitosa'
        });
    } catch (error) {
        console.log('Error al intentar agregar Postit: ', error);
        return res.status(500).json({
            success: false,
            message: 'Error al intentar agregar Postit. Ver la consola del servidor para mayor detalle'
        }); 
    }
};

export const getPostits = async (req: Request, res: Response) => {
    try {
        const postits = await Postit.find().select(['-__v']);
        res.status(200).json({
            success: true,
            message: postits
        })
    } catch (error) {
        console.log('Error al intentar obtener los Postits: ', error);
        return res.status(500).json({
            success: false,
            message: 'Error al intentar obtener los Postits. Ver la consola del servidor para mayor detalle'
        });
    }
};

