const checkemail = function(email, obj) {
  for (let key in obj) {
    if (obj[key].email === email)
      return true;
  }

  return false;
};

module.exports = checkemail;