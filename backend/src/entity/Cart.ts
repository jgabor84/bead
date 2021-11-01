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
import { CartItem } from './CartItem';

@Entity()
export class Cart {

	@PrimaryGeneratedColumn(  )
	id: number;

	@Column()
	status: boolean;

	@Column()
	createdAt: Date;

	@Column()
	updatedAt: Date | null;

	@ManyToOne(type => User, {eager: true})	user: User;

	@OneToMany(type => CartItem, cartItem => cartItem.cart)	cartItem: CartItem[];

}