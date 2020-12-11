/* Return true if the given string is a palindrome. Otherwise, return false.
 * A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.
 */ 

function palindrome(str) {
  let alphanumericals = /[a-z0-9]+/gi;
  let processStr = str.trim().match(alphanumericals).join("").toUpperCase(); //Assign whitespace-less and alphanumeric-only string to processStr var

  let lastLetter = processStr.length -1;
  for (let i = 0; i < processStr.length; i++, lastLetter--){
    if (processStr[i] != processStr[lastLetter]) {
      return false;
    }
  }
  return true;
}

console.log(palindrome("My age is 0, 0 si ega ym."));
