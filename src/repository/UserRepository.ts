import { User } from "@entities/User";
import databaseManager from "src/Database";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async InsertUser({username, name, firstname, email, password}) {
        const user = new User()
        user.username = username
        user.firstname = firstname
        user.name = name
        user.password = password
        user.email = email
        const db = await databaseManager.getManager()
        db.save(user)
        return true
    } 
}
