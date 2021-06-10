const route = require('express').Router();
const db = require('../database/db');


route.get('/', function (req, res) {
    res.render('index.ejs');
});
route.post('/', function (req, res) {
    console.log(req.body);
    res.send({ status: 'ok' });
})
route.post('/info', async function (req, res) {
    let data = await db.getInfo();
    res.send(JSON.stringify(data));
})
route.post('/addinfo', async function (req, res) {
    res.send({ status: (await db.addInfo(req.body)) ? 'true' : 'false' });
})
route.post('/deleteinfo', async function (req, res) {
    res.send({ status: (await db.deleteInfo(req.body.ID)) ? 'true' : 'false' });
})
module.exports = route;