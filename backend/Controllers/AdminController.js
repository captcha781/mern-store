require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const adminModel = require("../Models/AdminModel");
const nodemailer = require("nodemailer");
// const sendibBlueTransport = require("nodemailer-sendinblue-transport")

const sendEmail = async (mailObj) => {
  const { from, recipients, subject, message } = mailObj;

  try {
    // Create a transporter
    // console.log(`API_KEY = ${process.env.API_KEY}`);
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER,
        apikey: process.env.API_KEY,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    let mailStatus = transporter
      .sendMail({
        from: from,
        to: recipients,
        subject: subject,
        text: message,
      })
      .then((response) => {
        console.log(`Message sent: ${response}`);
        return `Message sent: ${response.messageId}`;
      })
      .catch((err) => console.log(err));

    // console.log(`Message sent: ${mailStatus.messageId}`);
  } catch (error) {
    console.error(error);
    throw new Error(
      `Something went wrong in the sendmail method. Error: ${error.message}`
    );
  }
};

exports.getAdminAuthStatus = (req, res) => {
  if (req.session.user) {
    return res.status(200).json({
      auth: true,
    });
  }
  res.json({ auth: false });
};

exports.postAdminSignup = (req, res) => {
  let email = req.body.mail;
  let username = req.body.username;
  let password = req.body.password;
  let confPassword = req.body.confirmPassword;
  let name = req.body.name;

  if (
    email &&
    username &&
    password &&
    confPassword &&
    name &&
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    ) &&
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password) &&
    /^[a-zA-Z0-9]+$/.test(username) &&
    /^[a-zA-Z\-]+$/.test(name)
  ) {
    adminModel
      .findOne({ $or: [{ username: username }, { mail: email }] })
      .then((response) => {
        if (response !== null) {
          return res.json({
            auth: false,
            message: "Sorry an account already exists with these credentials",
          });
        }

        if (password === confPassword) {
          bcryptjs
            .hash(password, Number(process.env.SALT))
            .then((hashedPass) => {
              adminModel
                .create({
                  name,
                  password: hashedPass,
                  mail: email,
                  username,
                  status: true,
                  type: "admin",
                })
                .then((creationResponse) => {
                  creationResponse.password = "";
                  req.session.user = creationResponse;

                  const token = jwt.sign(
                    { id: creationResponse._id },
                    process.env.JWT_SECRET
                  );

                  const mailObj = {
                    from: process.env.NODEMAILER_USER,
                    recipients: [creationResponse.mail],
                    subject: "Account Created Successfully",
                    html: `
              <h2>Your Account is created successfully!!!</h2>
              <p>Thanks for creating account Mr./Ms./Mrs. ${creationResponse.name}</p>
              `,
                  };

                  sendEmail(mailObj).then((postmail_response) => {
                    console.log(postmail_response);
                    return res
                      .cookie("x-access-token", token, {
                        maxAge: 60 * 60 * 24 * 5 * 1000,
                        httpOnly: true,
                      })
                      .json({
                        auth: true,
                        message: "Account Created successfully....",
                        user: creationResponse,
                      });
                  });
                })
                .catch((err) => {
                  res.json({
                    auth: false,
                    message: "Some Error Occured, Please try again.",
                  });
                });
            });
        } else {
          return res.json({
            auth: false,
            message: "Password doesn't match",
          });
        }
      });
  } else {
    return res.json({
      auth: false,
      message: "Enter the valid credentials",
    });
  }
};

exports.postLogin = (req, res) => {
  let userEntry = req.body.userEntry;
  let password = req.body.password;

  if (userEntry) {
    adminModel
      .findOne({ $or: [{ mail: userEntry }, { username: userEntry }] })
      .then((foundResponse) => {
        if (foundResponse === null) {
          return res.json({
            auth: false,
            message: "No user found with these credentials.",
          });
        }
        bcryptjs
          .compare(password, foundResponse.password)
          .then((passResponse) => {
            if (!passResponse) {
              return res.json({
                auth: false,
                message: "Incorrect password.",
              });
            } else {
              foundResponse.password="";
              req.session.user = foundResponse
              const token = jwt.sign(
                { id: foundResponse._id },
                process.env.JWT_SECRET
              );

              return res.cookie("x-access-token",token,{
                maxAge: 60 * 60 * 24 * 5 * 1000,
                httpOnly: true,
              }).json({
                auth: true,
                user: foundResponse,
                message: "Login Successful...",
              });
            }
          })
          .catch((err) => {
            return res.json({
              auth: false,
              message: "Some Unprecedented error occured please try again.",
            });
          });
      })
      .catch((err) => {
        return res.json({
          auth: false,
          message: "Some Unprecedented error occured please try again.",
        });
      });
  } else {
    return res.json({
      auth: false,
      message: "Please enter all credentials before you proceed.",
    });
  }
  ``;
};

exports.signoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.clearCookie("x-access-token",{maxAge: 0}).clearCookie("biscuit",{maxAge:0}).json({ auth: false, redirection: "/signin" });
    return;
  });
};
