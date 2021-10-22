import { Request, Response } from 'express';
import { getConnection, getRepository, SimpleConsoleLogger } from 'typeorm';
import { Wine } from '../entity/Wine';
import { Carousel } from '../entity/Carousel';
import { Controller } from './controller';

export class CarouselController extends Controller {
    repository = getRepository(Carousel);


    delete = async (req, res) => {
        const id = req.body.id;
        console.log("cl number: "+id);
    
        try {
            await getConnection()
            .createQueryBuilder()
            .update(Carousel)
            .set({ active: false})
            .where("id = :id", { id: id })
            .execute();
        
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }

    getAll = async (req: Request, res: Response) => {
    try {
        const entities = await this.repository
        .find({where:{active:"1"},order:{position:"ASC"}});
        res.json(entities);
    } catch (err) {
        console.error(err);
        this.handleError(res);
    }
    };

    getMaxId = async (req: Request, res: Response) => {
        
        try {
            const entities = await this.repository.find();
            const maxId = await getRepository(Carousel)
            .createQueryBuilder("carousel")
            .select("MAX(carousel.id)", "max")
            .getRawOne();
        
    console.log("max:" +JSON.stringify(maxId));
            res.json(maxId); 
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    };



}