const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: long
}, {timestamps: true});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;