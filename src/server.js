const express = require("express");
const app = express();
const port = process.env.PORT || 8000 ;
const cors = require("cors");
const db = require("./config/databases");
const route = require("./routes");

require("dotenv").config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));


//connect to db
db.connect();

//routes
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
