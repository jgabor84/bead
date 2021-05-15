import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Account } from './Account';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    tr_id: number;

    @Column()
    tr_opp_acc: string;

    @Column()
    tr_amount: number;

    @Column()
    tr_comment: string;

    @Column()
    tr_date: string;

    @ManyToOne(type => Account, {
        eager: true,
        cascade: true
    })
    account: Account;

   
    
}