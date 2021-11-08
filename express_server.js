const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

//EJS is set as express's templating engine/view engine
app.set("view engine", "ejs");


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// The callback function is registered as  a handler on the root path, "/".
//This function is called whenever a request is made to our server application.
// a function which handles requests and sends response
app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);   //res.send will also work
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});