const express = require("express");
const postgres = require('postgres');
const bodyParser = require('body-parser')
const cors = require('cors')
const index = express();
const port = process.env.PORT || 3001;
index.use(cors())
index.use(bodyParser.json()) // for parsing application/json
// const { createClient } = require('@supabase/supabase-js');

require('dotenv').config()

const sql = postgres(process.env.ENV === 'prod' ? process.env.DATABASE_URL : process.env.DATABASE_URL_DEV) /*'postgres://username:password@host:port/database'*/

// const supabaseUrl = process.env.SUPABASE_URL
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)



// get all paints
index.get('/api/paints', async (_, res) => {
    try {
        const resp = await sql`SELECT * FROM paints ORDER BY id`
        res.send(resp)

        /*const { data, error } = await supabase
            .from('paints')
            .select()
            .order('id', { ascending: true })
        if (error) {
            console.error(error.message)
        }
        if (data) {
            res.send(data)
        }*/
    } catch (error) {
        console.error(error)
    }
})

// update paint by id
index.patch('/api/paints/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { available, low, out_of_stock } = req.body
        const resp = await sql`UPDATE paints SET available = ${ available }, low = ${ low }, out_of_stock = ${ out_of_stock } WHERE id = ${ id }`
        res.send(resp)

        /*const { data, error } = await supabase
            .from('paints')
            .update({ available, low, out_of_stock })
            .eq('id', id)
        if (error) {
            console.error(error.message)
        }
        if (data) {
            res.send(data)
        }*/
    } catch (error) {
        console.error(error)
    }
})

const server = index.listen(port, () => console.log(`Paint app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;