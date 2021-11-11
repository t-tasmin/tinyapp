//Used for password Hashing
const bcrypt = require('bcryptjs');

const checkEmailMatchPassword = function(users, email, pword) {

  for (let key in users) {
    if (users[key].email === email && bcrypt.compareSync(pword, users[key].password)) {
      return true;
    }
  }
  return false;
};


module.exports = checkEmailMatchPassword;