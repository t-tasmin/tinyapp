const checkEmailMatchPassword =function (users, email, pword ){

 for (key in users){
   if (users[key].email === email && users[key].password===pword)
   {
     return true;
   }
  }
  return false;
}


module.exports = checkEmailMatchPassword;