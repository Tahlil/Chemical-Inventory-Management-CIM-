const express = require('express')
const app = express()
const port = 3000

require('./Routes/routes.index.js')(app);

app.listen(port);