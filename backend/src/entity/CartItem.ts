import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';

import { Cart } from './Cart';
import { Wine } from './Wine';


@Entity()
export class CartItem {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	sku: string;

	@Column()
	price: number;

	@Column()
	discount: number;

	@Column()
	quantity: number;

	@Column()
	active: boolean;

	@Column()
	createdAt: Date;

	@Column()
	updatedAt: Date | null;

	@ManyToOne(type => Cart, {
		eager: true
        
    }) cart: Cart;
	
	@ManyToOne(type => Wine, {eager: true})	wine: Wine;

}