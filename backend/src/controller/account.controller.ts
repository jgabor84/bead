import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Account } from '../entity/Account';
import { User } from '../entity/User';
import { Controller } from './controller';

export class AccountController extends Controller {
    repository = getRepository(Account);

    getClientAccounts= async (req, res) => {
        
        try {
          
            const id = req.params.id;
          const entities = await this.repository
                .createQueryBuilder('account')
                .leftJoinAndSelect('account.owner', 'acc')
                .where("acc.cl_number = :id", { id })
                
                .getMany();
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    };

    

    create = async (req, res) => {
        
    try {
       /* const id = req.body.owner;
        let promise = this.createAccountNumber(id);
        promise.then(async (result) => {
            console.log("acc result " + result);
            req.body.acc_number = result;
            
            const entity = this.repository.create(req.body);
            const entityAdded = await this.repository.save(entity);
            res.json(entityAdded);

        });*/

        const entity = this.repository.create(req.body);
        const entityAdded = await this.repository.save(entity);
        res.json(entityAdded);

        /*const entities = await this.repository
            .createQueryBuilder('user')
            .where("user.cl_number = :id)", { id })
            .leftJoinAndSelect('user.accounts', 'account')
            .getMany();
        res.json(entities);*/
    } catch (err) {
        console.error(err);
        this.handleError(res);
    }
};

/*async createAccountNumber(clnumber:number) {
    const startOrderNumber = 100000;

    const accountNumber = await getRepository(Account)
        .createQueryBuilder("account")
        .select("COUNT(account.owner)", "account")
        .where("account.owner = :id", { id: clnumber })
        .getRawOne();
        console.log("accountNumber: "+accountNumber.account);
        console.log("clnumber: "+clnumber);

        const accountNewNumber = clnumber + 9999900000 + accountNumber.account;
    console.log("new num: "+accountNewNumber);

    return startOrderNumber;

}*/

update = async (req, res) => {
    const id = req.body.acc_number;
    const balance = req.body.acc_balance;

    try {
        await getConnection()
        .createQueryBuilder()
        .update(Account)
        .set({ acc_balance: balance})
        .where("acc_number = :id", { id: id })
        .execute();
    
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        this.handleError(res);
    }
}



createAccountNumber = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const entities = await this.repository.find();
        const accountNumber = await getRepository(Account)
        .createQueryBuilder("account")
        .select("COUNT(account.owner)", "account")
        .where("account.owner = :id", { id: id })
        .getRawOne();
        console.log("accountNumber: "+accountNumber.account);
        console.log("clnumber: "+id);

        let pad = "0000";
        let n = parseInt(accountNumber.account)+1;
        const seq = (pad+n).slice(-pad.length);
        const accountNewNumber = id.toString()+"-"+seq;

        res.json(accountNewNumber); 
    } catch (err) {
        console.error(err);
        this.handleError(res);
    }
};

}
