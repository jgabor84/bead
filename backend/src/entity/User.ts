import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, ManyToMany, JoinTable} from 'typeorm';
import { Account } from './Account';
import { Transaction } from './Transaction';
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import {Roles} from './Roles';
import {Review} from './Review';
import { Cart } from './Cart';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { name: 'firstName', nullable: true, length: 50 })
    firstName: string | null;

    @Column('varchar', { name: 'middleName', nullable: true, length: 50 })
    middleName: string | null;

    @Column('varchar', { name: 'lastName', nullable: true, length: 50 })
    lastName: string | null;

    @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @Length(4, 100)
  password: string;

    @Column()
    email: string;

    @Column('varchar', { name: 'tel', nullable: true, length: 50 })
    tel: string | null;

    @Column('varchar', { name: 'postcode', nullable: true, length: 10 })
    postcode: string | null;

    @Column('varchar', { name: 'city', nullable: true, length: 50 })
    city: string | null;

    @Column('varchar', { name: 'address', nullable: true, length: 100 })
    address: string | null; 

    @Column()
    cl_status: boolean;

    @OneToMany(type => Account, account => account.owner)
    accounts: Account[];
    
    @OneToMany(type => Review, review => review.user) review: Review[]; 
    @OneToMany( () => Cart, ( cart ) => cart.user )
	cart: Cart[];

    //uploader admin
    @ManyToMany(() => Roles, {
        
        cascade: true
    })
    @JoinTable()
    roles: Roles[];


    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
      }
    
      checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
      }

    

}
