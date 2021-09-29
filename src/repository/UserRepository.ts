import { User } from "@entities/User";
import databaseManager from "src/Database";
import { Column, Entity, EntityRepository, Index, PrimaryGeneratedColumn, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async InsertUser({username,email, password}) {
        const user = new User();
        user.username = username
        user.password = password
        user.email = email
        const db = await databaseManager.getManager();
        db.save(user);
        return true
    } 
}
