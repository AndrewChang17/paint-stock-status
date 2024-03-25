const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const index = express();
const port = process.env.PORT || 3001;
index.use(cors())
index.use(bodyParser.json()) // for parsing application/json

require('dotenv').config()

const pgp = require('pg-promise')(/* options */)
const db = pgp(process.env.ENV === 'prod' ? process.env.INTERNAL : process.env.EXTERNAL) /*'postgres://username:password@host:port/database'*/


// get all paints
index.get('/api/paints', async (req, res) => {
    try {
        const resp = await db.manyOrNone("SELECT * FROM paints ORDER BY id")
        res.send(resp)
    } catch (error) {
        console.error(error)
    }
})

// update paint by id
index.patch('/api/paints/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { available, low, out_of_stock } = req.body
        const resp = await db.none("UPDATE paints SET available = $1, low = $2, out_of_stock = $3 WHERE id = $4", [available, low, out_of_stock, id])
        res.send(resp)
    } catch (error) {
        console.error(error)
    }
})

const server = index.listen(port, () => console.log(`Paint app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;