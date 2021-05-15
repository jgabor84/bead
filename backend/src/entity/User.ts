import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn} from 'typeorm';
import { Account } from './Account';
import { Transaction } from './Transaction';

@Entity()
export class User {

    @PrimaryColumn()
    cl_number: number;

    @Column()
    cl_name: string;

    @Column()
    cl_address: string;

    @Column()
    cl_tel: string;

    @Column()
    cl_uid: string;

    @Column()
    cl_status: boolean;

    @OneToMany(type => Account, account => account.owner)
    accounts: Account[];

    

}
