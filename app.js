const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const server = app.listen(3000); 
// Serve static files from a directory
app.use(express.static('javascripts'));


app.get('/login', (req,res) => {
    res.render('login', { javascriptFile: '/login.js' });
});
