const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const mongoose = require('mongoose');
const Pharmacy = require('./models/pharmacy');
const e = require('express');

require('dotenv').config();

app.set('view engine', 'ejs');

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
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
    app.listen(3000);
    console.log('connected to DB')
})
.catch((err) => {console.log(err)});



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
});

app.post('/account/pharmacy/register',  (req, res) => {
    // Get the information from the request body
    email = req.body.email;
    name = req.body.name;
    pt_password = req.body.password;
    console.log(req.body);

    const saltRounds = 10;
    bcrypt.hash(pt_password, saltRounds, (err, hash) => {
        if (err) {
            res.statusCode = 500;
            res.json({error:'HASH'});
        } else {
            // Create a new modul object
            const pharmacy = new Pharmacy({
                email: email,
                name: name,
                password: hash
            });
            // Save to DB
            pharmacy.save()
            .then((result) => {
                // OK
                res.json({result});
            })
            .catch((err) => {
                // Error
                res.statusCode = 500;
                res.json({error:'DB'});
            });
        }
    });
});