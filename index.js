const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "views")));

const routes = require('./routes');
app.use(routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server up and running on port ${port}`);
});
