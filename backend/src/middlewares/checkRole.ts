import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Roles } from "../entity/Roles";

import { User } from "../entity/User";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;
    console.log("role: "+id);
    

    //Get user role from the database
    const userRepository = getRepository(User);
    
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { id:id } ,relations: ["roles"] });
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role

    for (let i = 0; i < user.roles.length; i++) {
      if (roles.indexOf(user.roles[i].role) > -1) next();
      else res.status(401).send();
    }
    
  };
};