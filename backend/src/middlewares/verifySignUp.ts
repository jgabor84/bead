import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import {User} from "../entity/User";

export const register = async (req: Request, res: Response, next: NextFunction) => {

    const userRepository = getRepository(User);
    let user:User;

   
        user = await userRepository.findOneOrFail({ where: { username: req.body.username } });
    if(user){
        res.status(400).send({
            message: "Létező felhasználónév!"
          });
          return;
    }
        user = await userRepository.findOneOrFail({ where: { cl_address: req.body.email } });
    if(user.cl_address){
        res.status(400).send({
            message: "Létező e-mailcím!"
          });
          return;
    }
    next();

};