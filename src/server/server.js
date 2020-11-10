var express = require('express');
var app = express() ;
var mysql = require('mysql');
var bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var transporter; 
var testAccount; 

async function main() {
    testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
        },
    });
}

main().catch(console.error);

var connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'password',
    database    : 'gogetit'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');  
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function (req, res) { 
    res.send('hello world');
});

app.post('/register', jsonParser, async function (req, res) {
    console.log("New Registration");
    console.log(req.body);

    const user = {
        email: req.body.email, 
        password: req.body.password,
        isMentor: req.body.userCareer !== "",
        career: req.body.userCareer,
        active: false 
    };

    // Try adding the user into the database
    connection.query('INSERT INTO users SET ?', user, (err, res) => {
        if(err) {
            throw err;
        } else { 
            console.log('Last insert ID:', res.insertId);
        }
    });

    // Send an email for the user to verify 
    let info = await transporter.sendMail({
        from: 'hyunrae.kim@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: "Please confirm your email", // Subject line
        html: "<b>Hello world?</b>", // html body
      });
    
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send("success");
});

app.post('/login', jsonParser, function (req, res) {
    console.log("New Login attempt");

    var email = req.body.email; 
    var password = req.body.password; 

    connection.query(`SELECT password FROM users WHERE email = "${email}"`, (err, resp) => {
        if(err) {
            throw err;
        } else {
            console.log(password + " VS " + resp[0].password);
            console.log(bcrypt.compareSync(password, resp[0].password));
            if (bcrypt.compareSync(password, resp[0].password)) { 
                // authenticated
                res.status(200).send("success");
            } else { 
                res.status(401).send("The provided email and password are not valid.")
            }
        }
    });
});


var server = app.listen(8081, function () { 
    var host = server.address().address;
    var port = server.address().port; 

    console.log("App listening at http://%s:%s", host, port);
});

