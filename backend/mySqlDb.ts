import mysql from 'mysql2/promise';
import config from './config';

let connection: mysql.Connection;

const mysqlDb = {
    init: async () => {
        connection = await mysql.createConnection(config.database);
    },
    getConnection: () => {
        return connection;
    },
}

export default mysqlDb;


