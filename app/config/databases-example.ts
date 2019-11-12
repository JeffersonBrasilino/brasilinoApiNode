// @ts-ignore
export const databases = {
    dev: {
        host: "",
        port: "",
        username: "",
        password: "",
        database: "",
        dialect: "",
        dialectOptions: {
            ssl: true
        },
        pool: {
            max: 2,
            min: 0,
            idle: 1000,
            handleDisconnects: true
        }
    },
    prod: {
        host: "",
        port: "",
        username: "",
        password: "",
        database: "",
        dialect: "",
        dialectOptions: {
            ssl: true
        },
        pool: {
            max: 2,
            min: 0,
            idle: 1000,
            handleDisconnects: true
        },
    },
}
