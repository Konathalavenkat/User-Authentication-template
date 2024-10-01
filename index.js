const http = require('http');
const app = require('./app');
const {port} = require('./config/keys');


// create server
const server = http.createServer(app);


// start server
server.listen(port, () => console.log(`Server running on port ${port}`));