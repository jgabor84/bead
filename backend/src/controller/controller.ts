import { Request, Response } from "express";
import { Repository } from "typeorm";

export abstract class Controller {
    repository: Repository<any>;

    getAll = async (req: Request, res: Response) => {
        try {
            const entities = await this.repository.find();
            res.json(entities); 
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    };

    getOne = async (req: Request, res: Response) => {
        const id = req.params.id;
        
        try {
            const entity = await this.repository.findOne(id);

            if (!entity) {
                this.handleError(res, 404, 'No entity with the given id.');
                return;
            }

            res.json(entity);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    };

    create = async (req, res) => {
        // OPTIONAL TASK: check if entity with the given id is exists
        try {
            console.log(JSON.stringify(req.body));
            const entity = this.repository.create(req.body);
            const entityAdded = await this.repository.save(entity);
            res.json(entityAdded);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }

    // OPTIONAL TASK: check if the given id is valid
    update = async (req, res) => {
        const id = req.body.id;
        const body = req.body;
        console.log("json: "+JSON.stringify(req.body));

        try {
            await this.repository.update(id, body);
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }

    delete = async (req, res) => {
        const id = req.params.id;

        try {
            await this.repository.delete(id);
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }

    handleError(res, status: number = 500, message: string = 'Server error occurred.') {
        res.status(status).json({ message });
    }
};