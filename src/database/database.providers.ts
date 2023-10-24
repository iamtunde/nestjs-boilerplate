import { Sequelize } from "sequelize-typescript";
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from "../constants";
import { databaseConfig } from "./database.config";
import { User } from "src/user/entities/user.entity";

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async() => {
        let config: any
        switch (process.env.NODE_ENV) {
            case DEVELOPMENT:
                config = databaseConfig.development
                break;
            case TEST:
                config = databaseConfig.test
            case PRODUCTION:
                config = databaseConfig.production
            default:
                config = databaseConfig.development
                break;
        }

        const sequelize = new Sequelize(config)
        sequelize.addModels([User])
        await sequelize.sync()

        return sequelize
    }
}]