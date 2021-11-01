import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
    
    
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({
      message: "Unauthorized!"
    });
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username, roles } = jwtPayload;
  const newToken = jwt.sign({ userId, username, roles }, config.jwtSecret, {
    expiresIn: 60
  });
  console.log("jwt: " );
  console.log("jwt: "+newToken );
  res.setHeader("token", newToken);
 
  //Call the next middleware or controller
  next();
};