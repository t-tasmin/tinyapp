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

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

// If we type http://localhost:8080/urls/b2xVn2 as url then req.params.shortURL=b2xVn2
app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});