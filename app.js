const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const server = app.listen(3000); 

app.get('/', (req,res) => {
    res.send('<p>Hello World!</p>');
});
