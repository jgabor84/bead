import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, ManyToMany, JoinTable, ManyToOne, CreateDateColumn} from 'typeorm';
import { Length, IsNotEmpty } from "class-validator";
import {User} from './User';
import {Wine} from './Wine';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    
    @Column()
color: string;
@Column()
color_comment: string;
@Column()
intensity: string;
@Column()
nose_character: string;
@Column()
nose_comment:string;
@Column()
sweetness: string;
@Column()
acidity: string;
@Column()
alc_content: string;
@Column()
tannin_quantity: string;
@Column()
tannin_quality: string;
@Column()
body: string;
@Column()
taste_character: string;
@Column()
length: string;
@Column()
taste_comment: string;
@Column()
rating: number;
@Column()
published: boolean;
@CreateDateColumn()
createTime: Date;


@ManyToOne(type => User, {eager: true, cascade: true}) user: User; 
@ManyToOne(type => Wine, {eager: true, cascade: true}) wine: Wine; 


}