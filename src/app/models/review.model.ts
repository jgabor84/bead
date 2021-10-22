import {User} from './user.model';
import {Wine} from './wine.model';

export interface Review {
    id: number;

    color: string;

color_comment: string;

intensity: string;

nose_character: string;

nose_comment:string;

sweetness: string;

acidity: string;

alc_content: string;

tannin_quantity: string;

tannin_quality: string;

body: string;

taste_character: string;

length: string;

taste_comment: string;

rating: number;

published: boolean;

createTime: Date;

    user: User;
    wine: Wine;
    }
