import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, ManyToMany, JoinTable, ManyToOne, CreateDateColumn, Generated} from 'typeorm';
import { Length, IsNotEmpty } from "class-validator";
import {User} from './User';
import {Wine} from './Wine';

@Entity()
export class Carousel {
@PrimaryGeneratedColumn()
id: number;    
@Column()
text: string;
@Column()
img: string;
@Column()
active: boolean;
@Column()
link: string;
@Column()
position: number;
}