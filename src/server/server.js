var express = require('express');
var app = express() ;
var mysql = require('mysql');
var bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
var bcrypt = require('bcryptjs');
var session = require('express-session');
var moment = require('moment');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const verifyHtmlTemplate = `
<h1> Thank you for registering account with GGI! </h1>

<p>We need you to verify your email. Please click the link below! </p>
`;

var transporter; 

app.use(session({
    secret: "hyunraes_secret_lol",
    resave: false, 
    saveUninitialized: true,
    cookie: {
        secure: false,  
        httpOnly: false,
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year 
    }
}));

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

async function main() {
    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ggi.auto.email@gmail.com',
          pass: 'Password2020!'
        }
      });
}

function verifyUser(session) { 
    if (session.username !== undefined && session.username !== null) { 
        return true; 
    }

    return false; 
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
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times" + " " + req.session.email);
     } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
     }
});

app.post('/register', jsonParser, async function (req, res) {
    console.log("New Registration");
    console.log(req.body);

    var random = makeid(19)

    const user = {
        email: req.body.email, 
        password: req.body.password,
        username: req.body.username,
        isMentor: req.body.userCareer !== "",
        career: req.body.userCareer,
        active: false,
        verification_code: random
    };

    // Try adding the user into the database
    connection.query('INSERT INTO users SET ?', user, (err, res) => {
        if(err) {
            throw err;
        } else { 
            console.log('Last insert ID:', res.insertId);
        }
    });

    var verifyUrl = "<h3> http://localhost:8081/verify?code=" + random + "&email=" + req.body.email + "</h3>"; 

    // Send an email for the user to verify 
    let info = await transporter.sendMail({
        from: 'ggi.auto.email@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: "[GGI] Please confirm your email", // Subject line
        html: verifyHtmlTemplate + verifyUrl
      });
    
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send("success");
});

app.post('/login', jsonParser, function (req, res) {
    console.log("New Login attempt");

    var email = req.body.email; 
    var password = req.body.password; 

    connection.query(`SELECT password, active, username FROM users WHERE email = "${email}"`, (err, resp) => {
        if(err) {
            throw err;
        } else {
            if (bcrypt.compareSync(password, resp[0].password)) { 
                // authenticated
                if (resp[0].active === 0) { 
                    // the user has not authenticated yet
                    res.status(200).send("not_verified");
                } else { 
                    req.session.username = resp[0].username;
                    req.session.save();
                    console.log(req.session);

                    var data = {
                        message: "success", 
                        username: resp[0].username
                    }

                    res.status(200).send(data);
                }
            } else { 
                res.status(401).send("The provided email and password are not valid.")
            }
        }
    });
});

app.get('/logout', function (req, res) { 
    req.session.destroy((err) => {
        if (err) { 
            res.status(400).send("Unknown error in logging out");
            return;
        }

        res.status(200).send("success");
    });
});

app.get('/verify', function (req, res) { 
    // get email and verification code
    var email = req.query.email;  
    var code = req.query.code; 

    connection.query(`SELECT verification_code FROM users WHERE email = "${email}"`, (err, resp) => {
        if(err) {
            throw err;
        } else {
            if (resp[0].verification_code === code) { 
                connection.query(`UPDATE users SET active = 1 WHERE email = "${email}"`, (err, resp) => {
                    if(err) {
                        throw err;
                    } else {
                        req.session.email = email;
                        res.status(200).send("Success! Please go ahead and login!");     
                    }
                });
            } else { 
                res.status(401).send("The provided verification code is not valid. Please try logging in and requesting a new verification code.")
            }
        }
    });
});


app.post('/uploadTestimony', jsonParser, async function (req, res) {
    if (!verifyUser(req.session)) {
        res.status(401).send("User not authenticated");
        return;
    }

    console.log("New Testimony");
    console.log(req.body);

    const testimony = {
        title: req.body.title, 
        body: req.body.body,
        author: req.body.author,
        career: req.body.career,
        created: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    };

    // Try adding the testimony into the database
    connection.query('INSERT INTO testimonies SET ?', testimony, (err, resp) => {
        if(err) {
            res.send("failure");
            throw err;
        } else { 
            console.log('Last insert ID:', res.insertId);
            res.status(200).send("success"); 
        }
    });
});

app.get('/getTestimonies', jsonParser, async function (req, res) {
    var career = req.query.career; 

    // Try adding the testimony into the database
    connection.query(`SELECT * FROM testimonies WHERE career="${career}"`, (err, resp) => {
        if(err) {
            console.log("mysql error");
            res.send("failure");
            throw err;
        } else { 
            res.status(200).send(resp); 
        }
    });
});

app.get('/getAllCareers', jsonParser, async function (req, res) {
    connection.query(`SELECT * FROM careers`, (err, resp) => {
        if(err) {
            console.log("mysql error");
            res.send("failure");
            throw err;
        } else { 
            res.status(200).send(resp); 
        }
    });
});


app.get('/getBlsData', jsonParser, async function (req, res) {
    var occCode = req.query.occ_code; 
    var area = req.query.area; 

    var areaQueryString = "(";

    if(Array.isArray(area)) {
        for (i = 0; i < area.length; i++) { 
            if (i === area.length - 1) { 
                areaQueryString += ("'" + area[i] + "')"); 
            } else { 
                areaQueryString += ("'" + area[i] + "',");
            }
        }
    } else { 
        areaQueryString += "'" + area + "')";
    }

    // Try adding the testimony into the database
    connection.query(`SELECT * FROM bls_data WHERE area_title IN ${areaQueryString} AND occ_code="${occCode}"`, (err, resp) => {
        if(err) {
            console.log("mysql error");
            res.send("failure");
            throw err;
        } else { 
            res.status(200).send(resp); 
        }
    });
});

var server = app.listen(8081, function () { 
    var host = server.address().address;
    var port = server.address().port; 

    console.log("App listening at http://%s:%s", host, port);
});

