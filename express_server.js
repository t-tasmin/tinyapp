const { getUserByEmail, urlsForUser } = require("./helpers.js");
const express = require("express");
const app = express();
//cookie-session serves as Express middleware that helps us read the values from the cookie.
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1','key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
// Used as body-parser
app.use(express.urlencoded({ extended: true}));
//Used for password Hashing
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
app.use(morgan('dev'));
//EJS is set as express's templating engine/view engine
app.set("view engine", "ejs");

//**********************************CONSTANTS AND OBJECTS*********************************************//
const PORT = 8080; // default port 8080
const urlDatabase = {
  "b2xVn2": {longURL: "http://www.lighthouselabs.ca",   userID: "aJ48lW"},
  "9sm5xK": {longURL: "http://www.google.com", userID: "a24d34"},
  "csm4xK": {longURL: "http://www.amazon.com", userID: "a24d34"},
  "1sm4xK": {longURL: "http://www.ebay.com", userID: "a24d34"}};


const users = {
  "a24d34": {
    id: "a24d34",
    email: "ttasmin@gmail.com",
    password: bcrypt.hashSync("12345", 10)
  },
  "b4f5s6": {
    id: "b4f5s6",
    email: "user2@example.com",
    password: bcrypt.hashSync("dishwasher-funk", 10)
  }
};

//*******************************************************************************//
//The callback function with get/ post is registered as  a handler
//This function is called whenever a request is made to our server application.
// This function handles which the requests and sends response

//**********************************************************************************/
//************************************GET ROUTES ***********************************/
//**********************************************************************************/
app.get("/urls", (req, res) => {
  if (req.session.user_id) {
    let templateVars = {
      urls: urlsForUser(urlDatabase,req.session.user_id),
      user: users[req.session.user_id]};
    res.render("urls_index", templateVars); // render means it will create an ejs template and convert to html
  } else {
    res.redirect('/login');
  }
});

app.get("/urls/new", (req, res) => {
  if (req.session.user_id) {
    let templateVars = {
      urls: urlDatabase,
      user: users[req.session.user_id]};
    res.render("urls_new",templateVars);
  } else {
    res.redirect('/login');
  }
});

//req.params is an object {shortURL:the number}
// If we type localhost:8080/urls/b2xVn2, then req.params.shortURL=b2xVn2
app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL].longURL, user: users[req.session.user_id]};
  res.render("urls_show", templateVars);
});

// This route will redirect to actual webpage
app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  if (urlDatabase[shortURL]) {
    const longURL = "http://" + urlDatabase[shortURL].longURL;
    res.redirect(longURL);
  } else {
    res.send("This URL is not found");
  }
});


app.get("/register", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    user: users[req.session.user_id]};
  res.render("register", templateVars);
});

app.get("/login", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    user: users[req.session.user_id]};
  res.render("login", templateVars);
});
//**********************************************************************************/
//************************************POST ROUTES **********************************/
//**********************************************************************************/

//Add a POST request when submitting form data (add a resource) to server
app.post("/urls", (req, res) => {
  const shortURL = generateRandomString(6);
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = {longURL:longURL, userID:req.session.user_id};
  res.redirect(`/urls/${shortURL}`);
});

// Add a POST route, it triggers when the delete button of  /urls is pressed
app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];  // Log the POST request body to the console
  res.redirect("/urls");
});

// Add a POST route, it triggers when the Edit button of /urls is pressed, it redirects to that particular url
app.post("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  res.redirect(`/urls/${shortURL}`);
});

// Add a POST route, it triggers when the longURL is entered for updating urlDatabase
app.post("/urls/:shortURL/update", (req, res) => {
  const shortURL = req.params.shortURL;
  urlDatabase[shortURL] = {longURL:req.body.longURL, userID:urlDatabase[shortURL].userID};
  res.redirect("/urls");
});

// Add a POST route, it triggers when the login button is pressed
app.post("/login", (req, res) => {
  let email = req.body.email;
  const password = req.body.password;
  const userID = getUserByEmail(email, users);
  if (userID === null) {
    res.status(403).send('Email is not found!');
  } else {
    if (!bcrypt.compareSync(password, users[userID].password)) {
      res.status(403).send('Email and Password does not match!');
    } else {
      req.session.user_id = userID;
      res.redirect("/urls");
    }
  }
});

// Add a POST route, it triggers when the logout button is pressed
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/urls");
});

// Add a POST route, it triggers when the register button is pressed
app.post("/register", (req, res) => {
  const id = generateRandomString(6);
  let email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);

  if (email === "") {
    res.status(400).send('Not a valid Email');
  } else if (getUserByEmail(email, users)) {
    res.status(400).send('Email already Exits');
  } else {
    users[id] = {id, email, password};
    req.session.user_id = id;
    res.redirect("/urls");
  }
});
//********************************************************************************//
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//********************************************************************************//
//Generate a random alpha-numeric string
const  generateRandomString = function(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

