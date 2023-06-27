const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');

const server = app.listen(3000); 
// Serve static files from a directory
app.use(express.static('javascripts'));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Access environment variables
const mongodb_username = process.env.MONGODB_USERNAME;
const mongodb_psw = process.env.MONGODB_PSW;
const dbURI = `mongodb+srv://${mongodb_username}:${mongodb_psw}@rxlink.ire4kcg.mongodb.net/?retryWrites=true&w=majority`

// Use the environment variables in your code
console.log(dbURI);



app.get('/login', (req,res) => {
    res.render('login', { javascriptFile: '/login.js' });
});

app.post('/account/login', (req, res) => {
    email = req.body.email;
    password = req.body.password;
    isPharmacy = req.body.isPharmacy;

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.statusCode = 500;
            res.send();
        }
        console.log(hash);
        res.send();
    });
})