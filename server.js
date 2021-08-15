const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const db = require("./models");

const mongoDbUrl = "mongodb://localhost/exercisetrackerdb";

const config = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose.connect(process.env.MONGODB_URI || mongoDbUrl, config);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Dpdi345id983ldiEI$50w',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create(
    {
      mongoUrl: mongoDbUrl
    })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
