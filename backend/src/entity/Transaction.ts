import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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

    @CreateDateColumn()
    tr_date: Date;

    @ManyToOne(type => Account, {
        eager: true,
        cascade: true
    })
    account: Account;

   
    
}