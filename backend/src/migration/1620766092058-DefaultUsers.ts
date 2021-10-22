import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../entity/User";

import {StarterUsers} from "./user.migration";
import {StarterAccounts} from "./account.migration";
import { Roles } from "../entity/Roles";

export class DefaultUsers1620766092058 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        const rolesAdmin = new Roles();
        rolesAdmin.role = "ADMIN";
        rolesAdmin.description = "Admin desc";
        const rol = await getRepository("Roles").save(rolesAdmin);

        const rolesUser = new Roles();
        rolesUser.role = "USER";
        rolesUser.description = "USER desc";
        const rol2 = await getRepository("Roles").save(rolesUser);


        let user = new User();
        
        
        user.username="admin";
        user.password="admin";
        user.hashPassword();
        user.roles=[rolesAdmin];
        user.email= "mail@mail.com";
        user.cl_status= true;
        
        const users = await getRepository("User").save(user);
      
        //const accounts = await getRepository("Account").save(StarterAccounts);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
