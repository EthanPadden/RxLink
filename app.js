const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const mongoose = require('mongoose');
const Pharmacy = require('./models/pharmacy');
const Patient = require('./models/patient');

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

app.get('/', (req,res) => {
    res.render('home', { javascriptFile: '/home.js' });
});

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

    if (isPharmacy === 'true') {
        console.log(isPharmacy + ' => pharmacy')
        model = Pharmacy;
    }
    else {
        console.log(isPharmacy + ' => patient')
        model = Patient;
    }

    console.log(isPharmacy)
    console.log(model)
    
    model.find({ email: email }).then((documents, err) => {
        if (err) {
            res.statusCode = 500;
            res.json({ error: 'RETRIEVAL_ERROR' });
        } else {
            if (documents.length == 0 || documents == undefined || documents == null) {
                res.statusCode = 500;
                res.json({ error: 'USER_NOT_FOUND' });
            }
            else if (documents.length > 1) {
                res.statusCode = 500;
                res.json({ error: 'MULTIPLE_ACCOUNTS_FOUND' });
            } else {
                user = documents[0];
                correct_psw_hash = user.password;
                bcrypt.compare(pt_password_attempt, correct_psw_hash, function(err, result) {
                    if(result == true) {
                        res.cookie('userId',user._id);
                        res.json(user);
                    }
                    else {
                        res.statusCode = 500;
                        res.json({error: 'WRONG_PASSWORD'});
                    }
                });
            }
        }
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.send();
});

app.post('/account/pharmacy/register',  (req, res) => {
    email = req.body.email;
    pt_password = req.body.password;
    name = req.body.name;

    // Is there already a pharmacy with this email?
    Pharmacy.findOne({ email: email }).then((document, err) => {
        if (err) {
            res.statusCode = 500;
            res.json({ error: 'REGISTRATION_DB_ERROR' });
        } else {
            if (document == null) {
                const saltRounds = 10;
                bcrypt.hash(pt_password, saltRounds, (err, hash) => {
                    if (err) {
                        res.statusCode = 500;
                        res.json({ error: 'HASH' });
                    } else {
                        // Create a new model object
                        const pharmacy = new Pharmacy({
                            email: email,
                            name: name,
                            password: hash,
                        });
                        // Save to DB
                        pharmacy
                            .save()
                            .then((result) => {
                                // OK
                                res.cookie('userId',result._id);
                                res.json({ result });
                            })
                            .catch((err) => {
                                // Error
                                res.statusCode = 500;
                                console.log(err);
                                res.json({ error: 'ERROR_SAVING_TO_DB' });
                            });
                    }
                });
            } else {
                res.statusCode = 500;
                res.json({ error: 'USER_ALREADY_EXISTS' });
            }
        }
    });
});

app.post('/account/patient/register',  (req, res) => {
    email = req.body.email;
    pt_password = req.body.password;
    name = req.body.name;

    // Is there already a pharmacy with this email?
    Patient.findOne({ email: email }).then((document, err) => {
        if (err) {
            res.statusCode = 500;
            res.json({ error: 'REGISTRATION_DB_ERROR' });
        } else {
            if (document == null) {
                const saltRounds = 10;
                bcrypt.hash(pt_password, saltRounds, (err, hash) => {
                    if (err) {
                        res.statusCode = 500;
                        res.json({ error: 'HASH' });
                    } else {
                        // Create a new model object
                        const patient = new Patient({
                            email: email,
                            name: name,
                            password: hash,
                        });
                        // Save to DB
                        patient
                            .save()
                            .then((result) => {
                                res.cookie('userId',result._id);
                                res.json({ result });
                            })
                            .catch((err) => {
                                // Error
                                res.statusCode = 500;
                                console.log(err);
                                res.json({ error: 'ERROR_SAVING_TO_DB' });
                            });
                    }
                });
            } else {
                res.statusCode = 500;
                res.json({ error: 'USER_ALREADY_EXISTS' });
            }
        }
    });
});