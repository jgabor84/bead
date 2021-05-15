import { Router } from 'express';
import { AccountController } from './controller/account.controller';
import { UserController } from './controller/user.controller';
import { TransactionController } from './controller/transaction.controller';

export function getRouter(): Router {
    const router = Router();

    const accountController = new AccountController();
    const transactionController = new TransactionController();    
    const userController = new UserController();

    router.get('/account', accountController.getAll);
    router.get('/account/:id', accountController.getOne);
    router.get('/client-accounts/:id', accountController.getClientAccounts);
    router.get('/getaccid/:id', accountController.createAccountNumber);
    router.post('/account', accountController.create);
    router.put('/account', accountController.update);
    router.delete('/account/:id', accountController.delete);

    router.get('/users', userController.getAll);
    router.get('/users/:id', userController.getOne);
    router.post('/users', userController.create);
    router.put('/users', userController.update);
    router.put('/delete-user', userController.delete);

    router.get('/transactions', transactionController.getAll);
    router.get('/report/:id', transactionController.getAccountTransactions);
    router.post('/transaction', transactionController.create);
    

    return router;
}
