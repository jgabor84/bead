import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Wine } from '../entity/Wine';
import { User } from '../entity/User';
import { Cart } from '../entity/Cart';
import { CartItem } from '../entity/CartItem';
import { Controller } from './controller';

export class CartItemController extends Controller {
    repository = getRepository(CartItem);

    create = async (req, res) => {
        // OPTIONAL TASK: check if entity with the given id is exists
        try {
            console.log(JSON.stringify(req.body));
            const entity = this.repository.create(req.body);
            const entityAdded = await this.repository.save(entity);
            
            res.json(entityAdded);
          
      
    }
         catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }

    getCartItems = async (req: Request, res: Response) => {
        
        
        try {
          
            const id = req.params.id;
            const entities = await this.repository
               .find({where:[
                   {cart:id}
                   ]}
                );
                console.log("cartitement: "+JSON.stringify(entities));
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    };

    



}