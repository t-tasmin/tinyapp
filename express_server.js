const express = require("express");
const app = express();

//cookie-parser serves as Express middleware that helps us read the values from the cookie. 
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Used as body-parser
app.use(express.urlencoded({ extended: true}));

//EJS is set as express's templating engine/view engine
app.set("view engine", "ejs");

//********************************************************************************//
const PORT = 8080; // default port 8080
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//*******************************************************************************//
//The callback function with get/ post is registered as  a handler
//This function is called whenever a request is made to our server application.
// This function handles which the requests and sends response

//**********************************************************************************/
//************************************GET ROUTES ***********************************/
//**********************************************************************************/
app.get("/urls", (req, res) => {
  
  let templateVars = {
   urls: urlDatabase,
   username:req.cookies["username"]};///Add an endpoint to handle a POST to /login 
  
  res.render("urls_index", templateVars); // render means it will create an ejs template and convert to html
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

//req.params is an object {shortURL:the number}
// If we type localhost:8080/urls/b2xVn2, then req.params.shortURL=b2xVn2
app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  if (req.params.shortURL in urlDatabase)
  {res.redirect(longURL);}
  else
  {
    res.send("This URL is not found");
  }
});

//**********************************************************************************/
//************************************POST ROUTES **********************************/
//**********************************************************************************/

//Add a POST request when submitting form data (add a resource) to server
app.post("/urls", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  const shortURL = generateRandomString(6);
  const longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
  console.log(urlDatabase);
  //Redirect means browser is requesting for this
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
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect("/urls");
});


// Add a POST route, it triggers when the login button is pressed 
app.post("/login", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect("/urls");
});

//********************************************************************************//
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//********************************************************************************//
//Generate a random alpha-numeric string
function generateRandomString(length) {
  const chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

