const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./Routes/routes.index.js')(app);


app.listen(port);