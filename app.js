const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.set('view engine', 'ejs');

const server = app.listen(3000); 
// Serve static files from a directory
app.use(express.static('javascripts'));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


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