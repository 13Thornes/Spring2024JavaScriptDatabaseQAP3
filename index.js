
// define constants
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

// Debug, set and use statements
global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, }));
app.use(methodOverride('_method'));
app.use(express.json());


// Get index page
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// get about page
app.get('/about', (request, response) => {
    response.render('about.ejs');
});

// get games page
const gamesRouter = require('./Routes/games')
app.use('/games', gamesRouter);

// Error page
app.use((req, res) => {
    res.status(404).render('404');
});

// run the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
});



