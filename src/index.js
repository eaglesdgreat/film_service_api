const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/error.middleware');

const models = require('./models');
const cors = require('cors');

const port = process.env.PORT || 5000;

const app = express();
const alter = false;
const force = false;

models.sequelize.sync({ alter, force });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/api/films', require('./routes/film.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/purchases', require('./routes/purchase.routes'));
app.use('/api/reports', require('./routes/report.routes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));
