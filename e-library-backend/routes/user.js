const express = require('express');
const router = express.Router();
const connection = require('../connection');

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/signup', (req, res) => {
    let user = req.body;
    query = 'select email, password, role, status from user where email = ?';

    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            console.log('results: ', results, 'Length: ', results.length);

            if (results.length <= 0) {
                query = 'insert into user(name, roll, batch, session, program_level, mobile_number, address, email, password, status, role) values(?, ?, ?, ?, ?, ?, ?, ?, ?, "false", "user")';
                connection.query(query, [user.name, user.roll, user.batch, user.session, user.program_level, user.mobile_number, user.address, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "User Created" });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                });
            }
            else {
                return res.status(400).json({ message: "Email Already Exists" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    });

});

router.post('/login', (req, res) => {
    const user = req.body;
    query = 'select email, password, role, status from user where email = ?';
    connection.query(query, [user.email], (err, results) => {

        if (!err) {

            if (results.length <= 0 || results[0].password != user.password) { // for invalid credentials
                return res.status(401).json({ message: "Invalid Username/Password" });

            } else if (results[0].status == "false") { // for users
                return res.status(401).json({ message: "User Not Verified. Waiting for admin Approval..." });

            } else if (results[0].password == user.password) { // for admin & valid users
                const response = { email: results[0].email, role: results[0].role };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
                res.status(200).json({ token: accessToken });

            } else {
                return res.status(400).json({ message: "Something went wrong" });
            }

        }
        else {
            return res.status(500).json(err);
        }
    });
});


// change password to be done


var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

router.post('/forgotpassword', (req, res) => {
    const user = req.body;
    query = 'select email, password from user where email = ?';
    connection.query(query, [user.email], (err, results) => {

        if (!err) {

            console.log('Email: ', results);

            if (results.length <= 0) {
                return res.status(200).json({ message: "Invalid Email" });

            } else {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Password Recovery',
                    html: '<p><b>Your login details for E-library</b><br><b>Email:</b> ' + results[0].email + '<br><b>Password:</b> ' + results[0].password + '<br><a href="http://localhost:4200/">Click here to Login</a>' + '</p>'
                };
                transport.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                return res.status(200).json({ message: "Password sent successfully to your email." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.get('/', (req, res) => {
    // check if server is online
    return res.status(200).json({ message: "Server is Online" });

});


module.exports = router;