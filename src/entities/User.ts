import { Column, Entity, Index, PrimaryGeneratedColumn, EntityManager } from 'typeorm';

@Index("email", ["email"], { unique: true })
@Entity("user")
export class User {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    idUser: number;

    @Column("varchar", { name: "username", length: 255 })
    username: string;

    @Column("varchar", { name: "name", length: 255 })
    name: string;

    @Column("varchar", { name: "firstname", length: 255 })
    firstname: string;

    @Column("varchar", { name: "email", length: 255 })
    email: string;

    @Column("varchar", { name: "password", length: 255 })
    password: string;
}
