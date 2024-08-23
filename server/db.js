/*
As I done want a single static connection to 
the database, but a pool of re-usable open client instances, 
I will create a pool instance, instead of client 
*/

import pg from 'pg'
const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: "babaibunny",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

export default pool;