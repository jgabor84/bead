import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {StarterUsers} from "./user.migration";
import {StarterAccounts} from "./account.migration";

export class DefaultUsers1620766092058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const users = await getRepository("User").save(StarterUsers);
        const accounts = await getRepository("Account").save(StarterAccounts);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
