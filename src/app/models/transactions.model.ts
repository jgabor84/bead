import {Account} from './account.model';

export interface Transactions {
    tr_id: number;
    tr_opp_acc: string;
    tr_amount: number;
    tr_comment: string;
    tr_date: string;
    account: Account;
    }
