const express = require("express");
const cors = require('cors')
const index = express();
const port = process.env.PORT || 3001;
index.use(cors())

require('dotenv').config()

const pgp = require('pg-promise')(/* options */)
const db = pgp(process.env.ENV === 'prod' ? process.env.INTERNAL : process.env.EXTERNAL) /*'postgres://username:password@host:port/database'*/


index.get('/api/paints', async (req, res) => {
    try {
        const resp = await db.manyOrNone("SELECT * FROM paints")
        res.send(resp)
    } catch (error) {
        console.error(error)
    }
})

const server = index.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;