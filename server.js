const express = require('express');
const mqtt = require('mqtt');
const app = express();
const mqttClient = mqtt.connect("http://localhost:8000");
// const db = require('./database/db');
const routes = require('./api/routes');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");

const IP = 'localhost';

app.use('/', routes);
// app.get('/', function(req, res) {
//     res.render('index.ejs');
// });
// app.post('/', function(req, res) {
//     console.log(req.body);
//     res.send({status:'ok'});
// })
// app.post('/info', async function(req, res) {
//     let data = await db.getInfo();
//     res.send(JSON.stringify(data));
// })
// app.post('/addinfo', async function(req, res) {
//     res.send({status : (await db.addInfo(req.body))?'true':'false'});
// })
// app.post('/deleteinfo', async function(req, res) {
//     res.send({status : (await db.deleteInfo(req.body.ID))?'true':'false'});
// })

const server = app.listen(8000, IP, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port);
});
mqttClient.on('connect', function () {
    console.log("hahah")
})