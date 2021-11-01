import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Wine } from '../entity/Wine';
import { User } from '../entity/User';
import { Cart } from '../entity/Cart';
import { Order } from '../entity/Order';
import { Controller } from './controller';
import { json } from 'body-parser';

export class OrderController extends Controller {
    repository = getRepository(Order);
    cartRepository = getRepository(Cart);
    

    create = async (req, res) => {
       
        try {
            console.log(JSON.stringify(req.body));
            const entity = this.repository.create(req.body);
            const entityAdded = await this.repository.save(entity);
            
            await getConnection()
            .createQueryBuilder()
            .update(Cart)
            .set({ status: false})
            .where("id = :id", { id: req.body.cart })
            .execute();

            res.json(entityAdded); 
          
      
    }
         catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }


    

    getOrder= async (req, res) => {
        
        try {
            const id = req.params.id;
            const entities = await this.repository
          .findOne({where:[
            {user:id}
        ]}
         );
                
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    };

    



}