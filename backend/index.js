import express from "express";
import bodyParser from "body-parser";
import routerUser from "./src/routes/user.routes.js";
import routerAuth from "./src/routes/authentication.routes.js";
import morgan from "morgan";

const PORT = 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"))

app.get("/document", (req, res) => {
  res.render("document.ejs");
});

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));

app.use("/usuario", routerUser);
app.use("/usuario", routerAuth)

app.listen(PORT, () => {
  console.log(`Conected on port: ${PORT} `);
});
