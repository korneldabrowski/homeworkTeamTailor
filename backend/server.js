const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
