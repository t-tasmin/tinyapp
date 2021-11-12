const { assert } = require('chai');
const { getUserByEmail, urlsForUser } = require("../helpers.js");

const testUsers = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

describe('#getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail("user@example.com", testUsers);
    const expectedUserID = "userRandomID";
    assert.strictEqual(user, expectedUserID);
  });

  it('should return null with invalid email', function() {
    const user = getUserByEmail("user12@example.com", testUsers);
    const expectedUserID = null;
    assert.strictEqual(user, expectedUserID);
  });
});


const urlDatabase = {
  "b2xVn2": {longURL: "http://www.lighthouselabs.ca",   userID: "aJ48lW"},
  "9sm5xK": {longURL: "http://www.google.com", userID: "a24d34"},
  "csm4xK": {longURL: "http://www.amazon.com", userID: "a24d34"},
  "1sm4xK": {longURL: "http://www.ebay.com", userID: "a24d34"}};

describe('#urlsForUser', function() {
  it('should return object of URLs with matching user', function() {
    const urls = urlsForUser(urlDatabase, "a24d34");
    const expectedurls = {"9sm5xK" :  "http://www.google.com",
      "csm4xK" :"http://www.amazon.com",
      "1sm4xK" :"http://www.ebay.com"};
    assert.deepEqual(urls, expectedurls);
  });
  
  it('should return null object with invalid user', function() {
    const urls = urlsForUser(urlDatabase, "a200");
    const expectedurls = {};
    assert.deepEqual(urls, expectedurls);
  });
});