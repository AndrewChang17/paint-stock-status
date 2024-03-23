const express = require("express");
const index = express();
const port = process.env.PORT || 3001;

index.get('/', (req, res) => {
    res.send('Hello World!')
})

const server = index.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;