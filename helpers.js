function getUserByEmail(email, obj) {
  for (let key in obj) {
    if (obj[key].email === email)
      return key;
  }

  return null;
}


function urlsForUser(urlDatabase ,id) {
  let A = {};
  for (let key in urlDatabase) {
    if (urlDatabase[key].userID === id) {
      A[key] = urlDatabase[key].longURL;
    
    }
  }
  return A;
}


module.exports = { getUserByEmail, urlsForUser };

