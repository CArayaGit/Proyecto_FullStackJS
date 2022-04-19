require("dotenv").config();
const express = require("express");
const {create} = require("express-handlebars");
const app = express();

//req.body:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/img'));

//hbs:
const hbs = create({
    partialsDir: ['views/components'],
    extname: 'hbs',
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

//app.use("/api/v1/", require("./routes/users.route"));
app.use("/", require("./routes/vistas.route"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Servidor OK, en puerto: ${PORT}`) );