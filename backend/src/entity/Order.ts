import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';

import { User } from './User';
import { Cart } from './Cart';

@Entity()
export class Order {

	@PrimaryGeneratedColumn(  )
	id: number;

	@Column()
	status: string;

	@Column()
	createdAt: Date;

    @Column('varchar', { name: 'invoice_firstName', nullable: true, length: 50 })
    invoice_firstName: string | null;

    @Column('varchar', { name: 'invoice_middleName', nullable: true, length: 50 })
    invoice_middleName: string | null;

    @Column('varchar', { name: 'invoice_lastName', nullable: true, length: 50 })
    invoice_lastName: string | null;

    @Column('varchar', { name: 'invoice_tel', nullable: true, length: 50 })
    invoice_tel: string | null;

    @Column('varchar', { name: 'invoice_postcode', nullable: true, length: 10 })
    invoice_postcode: string | null;

    @Column('varchar', { name: 'invoice_city', nullable: true, length: 50 })
    invoice_city: string | null;

    @Column('varchar', { name: 'invoice_address', nullable: true, length: 100 })
    invoice_address: string | null;


    @Column('varchar', { name: 'ship_firstName', nullable: true, length: 50 })
    ship_firstName: string | null;

    @Column('varchar', { name: 'ship_middleName', nullable: true, length: 50 })
    ship_middleName: string | null;

    @Column('varchar', { name: 'ship_lastName', nullable: true, length: 50 })
    ship_lastName: string | null;

    @Column('varchar', { name: 'ship_tel', nullable: true, length: 50 })
    ship_tel: string | null;

    @Column('varchar', { name: 'ship_postcode', nullable: true, length: 10 })
    ship_postcode: string | null;

    @Column('varchar', { name: 'ship_city', nullable: true, length: 50 })
    ship_city: string | null;

    @Column('varchar', { name: 'ship_address', nullable: true, length: 100 })
    ship_address: string | null;

	
	@ManyToOne(type => User, {eager: true})	user: User;
    @ManyToOne(type => Cart, {eager: true})	cart: Cart;
	

}