import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, ManyToMany, JoinTable} from 'typeorm';
import { Length, IsNotEmpty } from "class-validator";
import {Review} from './Review';
import { CartItem } from './CartItem';

@Entity()
export class Wine {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    imgs: string;
    @Column()
    winery: string;
    @Column()
    description: string;
    @Column()
    type: string;
    @Column()
    year: string;
    @Column()
    alcohol: string;
    @Column()
    color: string;
    @Column()
    sku: string;
    @Column()
    price: number;
    @Column()
    discount: number;
    @Column()
    quantity: number;
    @Column()
    shop: boolean;
    @Column()
    landing: boolean;
    @Column()
    createTime: Date;
    @Column()
    updateTime: Date;
    @OneToMany(type => Review, review => review.user) review: Review[]; 
    @OneToMany( () => CartItem, ( cartItem ) => cartItem.wine )
	cartItems: CartItem[];
    

    //userId
    //imgName







    

}
