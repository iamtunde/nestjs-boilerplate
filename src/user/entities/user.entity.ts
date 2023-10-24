import { Table, Model, Column, DataType, HasMany, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table({ tableName: 'Users' })

export class User extends Model<User>{
    @Column({
        type: DataType.STRING,
        primaryKey: true,
    })
    id: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstName: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastName: string

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    email: string

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    password: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    phone: string

    @CreatedAt
    createdAt?: any;

    @UpdatedAt
    updatedAt?: any;

}