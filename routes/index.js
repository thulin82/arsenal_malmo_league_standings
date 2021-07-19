const express = require('express');
const router = express.Router();
const axios = require('axios');
const parseString = require('xml2js').parseString;
const dotenv = require('dotenv');

dotenv.config();

router.get('/', function (req, response) {
    response.redirect('index.html');
});

router.get('/malmo', function (req, response) {
    let data = '';
    axios.get(process.env.URL_M).then((resp) => {
        let xml = resp.data.slice(28, resp.data.length - 3);
        parseString(xml, function (err, result) {
            JSON.stringify(result);
            data = result;
        });
        response.status(200).json({ success: true, data: data });
    });
});

router.get('/arsenal', function (req, response) {
    let data = '';
    axios.get(process.env.URL_A).then((resp) => {
        let xml = resp.data.slice(27, resp.data.length - 3);
        parseString(xml, function (err, result) {
            JSON.stringify(result);
            data = result;
        });
        response.status(200).json({ success: true, data: data });
    });
});

module.exports = router;
