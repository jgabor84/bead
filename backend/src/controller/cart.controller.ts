import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Wine } from '../entity/Wine';
import { User } from '../entity/User';
import { Cart } from '../entity/Cart';
import { CartItem } from '../entity/CartItem';
import { Controller } from './controller';
import { json } from 'body-parser';

export class CartController extends Controller {
    repository = getRepository(Cart);
    cartItemrepository = getRepository(CartItem);

    create = async (req, res) => {
        // OPTIONAL TASK: check if entity with the given id is exists
        try {
            console.log(JSON.stringify(req.body));
            const entity = this.repository.create(req.body);
            const entityAdded = await this.repository.save(entity);

            res.json(entityAdded);
          console.log("ccc "+Object(entityAdded)["id"]);
      
    }
         catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }

    getCart= async (req, res) => {
        
        try {
            const id = req.params.id;
            const entities = await this.repository
          .find({where:[
            {user:id,
            status:true}
        ]}
         );
                
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    };

    



}