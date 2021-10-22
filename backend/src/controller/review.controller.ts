import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Wine } from '../entity/Wine';
import { User } from '../entity/User';
import { Review } from '../entity/Review';
import { Controller } from './controller';

export class ReviewController extends Controller {
    repository = getRepository(Review);

    
    getWineReviews= async (req, res) => {
        
        try {
          
            const id = req.params.id;
          const entities = await this.repository
          .createQueryBuilder('review')
          .leftJoinAndSelect('review.wine', 'wine')
          .where("wine.id = :id", { id })
                
                .getMany();
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    };

    getRating= async (req, res) => {
        
        try {
          
            const id = req.params.id;
            console.log("trans_id: "+id);
          const entities = await this.repository
          .createQueryBuilder("review")
          .select("AVG(review.rating)","avg")
          .where("wineId=:id",{id})
          .getRawOne();
        
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    };

    getTopRating= async (req, res) => {
        
        try {
 
          const entities = await this.repository
          .createQueryBuilder("review")
          .leftJoinAndSelect("review.wine", "wine")
            .select(['review.wineId', 'wine.imgs', 'wine.id', 'wine.name', 'wine.year', 'wine.winery', 'wine.price']  )
          .addSelect("AVG(review.rating)", "maxrate")
          .groupBy("review.wineId")
          .orderBy('maxrate', 'ASC')
          .getRawOne();
                
            res.json(entities);
            console.log("max:" +JSON.stringify(entities));
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    };



}