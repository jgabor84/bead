import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Transaction } from '../entity/Transaction';
import { Controller } from './controller';

export class TransactionController extends Controller {
    repository = getRepository(Transaction);

    getAccountTransactions= async (req, res) => {
        
        try {
          
            const id = req.params.id;
            console.log("trans_id: "+id);
          const entities = await this.repository
               .find({where:[
                   {account:id},
                   {tr_opp_acc:id}
               ]}
                );
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    };


}
