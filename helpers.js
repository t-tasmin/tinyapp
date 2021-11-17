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


//Generate a random alpha-numeric string
const  generateRandomString = function(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
module.exports = { getUserByEmail, urlsForUser, generateRandomString};

