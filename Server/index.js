const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./Models/models.index");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database to "+ db.url);
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
require('./Routes/routes.index.js')(app);


app.listen(port);