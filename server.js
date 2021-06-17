const mysql = require('mysql');
const express = require('express');

const mqtt = require('mqtt');
const app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var Server = require("http").Server(app);
var io = require("socket.io")(Server);
var broker_url = "mqtt://mqtt.flespi.io:1883"
var options = {
    username: "FlespiToken vTsX8UaHjIoRDbemkaTkhGUHkHhNVd3eUk2Q20nbzBT2AVcJVTT0pDyx9D8SG0Wq",
    password: ""
}
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'humidity_temperature'
});
// const db = require('./database/db');
var client = mqtt.connect(broker_url, options);
const routes = require('./api/routes');
// const { addInfo } = require('./database/db');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");
const IP = 'localhost';

app.use('/', routes);

function insert(data) {
    var sensor_values = data.split(" ");
    var today = new Date();
    var date = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    var time = String(today.getHours()).padStart(2,'0') + ":" + String(today.getMinutes()).padStart(2,'0') + ":" + String(today.getSeconds()).padStart(2,'0');
    var sql = "INSERT INTO Data (temp, hud, date, hour) VALUES (?)";
    var values = [sensor_values[0],sensor_values[1],date,time];
    con.query(sql, [values], function (err, result) {  
        if (err) throw err;  
        console.log("Number of records inserted: " + result.affectedRows);  
        });
    io.on("connection",function(socket){
        socket.emit("client to webserver",sensor_values);
    })  
    
    }
const server = app.listen(8000, IP, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port);
});
client.subscribe('crawldata', function (err) {
    if (err) {
        console.log(err);
    }
})
client.on('message', function (topic, message) {
    var string1 = message.toString();
    console.log(string1);
    insert(string1);
})
app.get('/', function (req, res) {
    res.render('index.ejs');
});
