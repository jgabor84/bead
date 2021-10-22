import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Wine } from '../entity/Wine';
import { User } from '../entity/User';
import { Controller } from './controller';

export class WineController extends Controller {
    repository = getRepository(Wine);

    getAll= async (req, res) => {
        
        try {
 
          const entities = await this.repository
          .find({where:[
            {landing:true,
            shop:true}
        ]}
         );
                
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    };

    



}