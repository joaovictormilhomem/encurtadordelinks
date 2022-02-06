const express = require('express');
const mongoose = require('mongoose');
const linkRoute = require('./routes/linkRoute');
const path = require('path');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/links', { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connectado ao MongoDB'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));
app.listen(PORT, () => console.log(`app lintening on PORT ${PORT}`));
app.use('/', linkRoute);