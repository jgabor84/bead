
import { getConnection, getRepository } from "typeorm";
import { User } from "../entity/User";
import { Controller } from "./controller";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { Roles } from "../entity/Roles";


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
        const id = req.body.id;
        console.log("cl number: "+id);
    
        try {
            await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ cl_status: false})
            .where("id = :id", { id: id })
            .execute();
        
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }

    setAdmin = async (req: Request, res: Response) => {
      const id = req.body.userid;
      console.log("cl number: "+id);
  
      try {
          await getConnection()
          .createQueryBuilder()
          .relation(User, "roles")
          .of(id)
          .add(1);
      
          res.json({ success: true });
      } catch (err) {
          console.error(err);
          this.handleError(res);
      }
  };

      listAll = async (req: Request, res: Response) => {
        //Get users from database
        
        const users = await this.repository.find({
          select: ["id", "username", "roles"]
        });
      
        //Send the users object
        res.send(users);
      };
      
      
       getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: string = req.params.id;
      
        //Get the user from database
        const userRepository = getRepository(User);
        
        try {
          const user = await userRepository.findOneOrFail(id, {
            select: ["id", "username", "roles"] 
          });
        } catch (error) {
          res.status(404).send("User not found");
        }
      };
      
       newUser = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { username, password,  email, role } = req.body;
        let roles = [];
        const roleRepository = getRepository(Roles);
        try {
             roles = await roleRepository.find({where:[{role:role}]});

            

             
        } catch (error) {
            res.status(404).send("Nincs ilyen szerepkör!");
        }

        let user = new User();
        console.log("r: "+JSON.stringify(roles) );
        user.username = username;
        user.password = password;
        user.email = email;
        user.cl_status = true;
        user.roles=roles;
        
        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
      
        //Hash the password, to securely store on DB
        user.hashPassword();
      
        //Try to save. If fails, the username is already in use
        const userRepository = getRepository(User);
        
        try {
          await userRepository.save(user);
        } catch (e) {
          res.status(409).send({
            message: "Felhasználónév foglalt!"
          });
          return;
        }
      
        //If all ok, send 201 response
        res.status(201).send({
            message: "Felhasználó létrehozva!"
          });
      };
      
       
      
       deleteUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
      
        const userRepository = getRepository(User);
        let user: User;
        try {
          user = await userRepository.findOneOrFail(id);
        } catch (error) {
          res.status(404).send("User not found");
          return;
        }
        userRepository.delete(id);
      
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
      };


      newWine = async (req: Request, res: Response) => {

        
      };

      adminBoard = (req, res) => {
        res.status(200).send("Moderator Content.");
      };
      };
    
      export default UserController;


