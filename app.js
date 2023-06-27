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

app.get('/pharmacy/registration', (req,res) => {
    res.render('registration-pharmacy', { javascriptFile: '/registration-pharmacy.js' });
});

app.get('/patient/registration', (req,res) => {
    res.render('registration-patient', { javascriptFile: '/registration-patient.js' });
});


app.post('/account/login', (req, res) => {
    email = req.body.email;
    pt_password_attempt = req.body.password;
    isPharmacy = req.body.isPharmacy;

    var model;

    if (isPharmacy) model = Pharmacy;
    else model = Patient;
    
    model.find({ email: email }).then((documents, err) => {
        if (err) {
            res.statusCode = 500;
            res.json({ error: 'RETRIEVAL_ERROR' });
        } else {
            if (documents.length == 0) {
                res.statusCode = 500;
                res.json({ error: 'USER_NOT_FOUND' });
            }
            if (documents.length > 1) {
                res.statusCode = 500;
                res.json({ error: 'MULTIPLE_ACCOUNTS_FOUND' });
            } else {
                user = documents[0];
                correct_psw_hash = user.password;
                bcrypt.compare(pt_password_attempt, correct_psw_hash, function(err, result) {
                    res.json({result})
                });
            }
        }
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