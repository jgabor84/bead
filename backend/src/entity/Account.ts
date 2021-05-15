import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Account {
    @PrimaryColumn()
    acc_number: string;

    @Column()
    acc_balance: number;

    @Column()
    acc_status: boolean;

    

    @ManyToOne(type => User, {
        eager: true,
        cascade: true
    })
    owner: User;
    
    @OneToMany(type => Account, account => account.acc_number)
    accounts: Account[];
    
}