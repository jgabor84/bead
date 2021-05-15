import { start } from "node:repl";
import { getConnection, getRepository } from "typeorm";
import { User } from "../entity/User";
import { Controller } from "./controller";

export class UserController extends Controller {
    repository = getRepository(User);
    cl_number: any;

    create = async (req, res) => {
        // OPTIONAL TASK: check if entity with the given id is exists
        try {
            let promise = this.createOrderNumber();
            promise.then(async (result) => {
                req.body.cl_number = result;
                console.log("result " + result);
                const entity = this.repository.create(req.body);
                const entityAdded = await this.repository.save(entity);
                res.json(entityAdded);

            });

        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }
    async createOrderNumber() {
        const startOrderNumber = 100000;

        const highestOrderNumber = await getRepository(User)
            .createQueryBuilder("user")
            .select("MAX(user.cl_number)", "user")
            .getRawOne();


        const newOrderNumber =
            highestOrderNumber.user < startOrderNumber ? startOrderNumber : highestOrderNumber.user + 1;

        return newOrderNumber;

    }

    delete = async (req, res) => {
        const id = req.body.cl_number;
        console.log("cl number: "+id);
    
        try {
            await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ cl_status: false})
            .where("cl_number = :id", { id: id })
            .execute();
        
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }



}