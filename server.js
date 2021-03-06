require("dotenv").config()
const express = require("express")
const routes = require("./routes")
const path = require("path")
const app = express()
// const helmet = require("helmet");
const csrf = require("csurf")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("connect-flash")
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
const connectionString =
  "mongodb+srv://renan:f6236295@curso-js.zw60j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.emit("connected"))

const sessionOptions = session({
  secret: "loasndkfjioahjdsifhba",
  store: new MongoStore({ mongoUrl: connectionString }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
})

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.json())
// app.use(helmet());


app.use(sessionOptions)
app.use(flash())

app.set("views", path.resolve(__dirname, "src", "views"))
app.set("view engine", "ejs")
app.use(csrf());
// Nossos próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('connected', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});