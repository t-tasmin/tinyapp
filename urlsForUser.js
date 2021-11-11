const urlsForUser = function (urlDatabase ,id){
  let A= {};
for (let key in urlDatabase){
  if (urlDatabase[key].userID === id){
    A[key]=urlDatabase[key].longURL;
    
  }
}
return A;
};


module.exports = urlsForUser ;