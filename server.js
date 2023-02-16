const express = require('express');
const app = express();
const chalk = require ('chalk');


app.get ('/', onHome).listen(1337);

function onHome (req, res) {
    res.send ('hallo')
}

