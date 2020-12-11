/* Return true if the passed string looks like a valid US phone number.

The user may fill out the form field any way they choose as long as it has the format of a valid US number. The following are examples of valid formats for US numbers (refer to the tests below for other variants):

    555-555-5555
    (555)555-5555
    (555) 555-5555
    555 555 5555
    5555555555
    1 555 555 5555

For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. Your job is to validate or reject the US phone number based on any combination of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone number; otherwise return false.
*/


function telephoneCheck(str) {
  let unallowed = /[a-z?"&!;:]/gi;
  let numbersRegEx = /\d/g;
  let parenthesisTest = /\(|\)/;
  let parenthesis = /\d*\(\d\d\d\)/;

  if (unallowed.test(str) || 
  (numbersRegEx.test(str[0]) == false && str[0] != "(")) {
    //Checks for unallowed chars and for wrong first char
    return false;
  } else if (numsTest(str) == false) {
    //Checks if number is too long or short
    return false;
  } else if (parenthesisTest.test(str)){
    //Checks if number includes parenthesis
    if(parenthesis.test(str)) {
      //Checks both parenthesis are there and in the right place
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }

  function numsTest(string) { //Checks it has the right amount of numbers
     let number = string.match(numbersRegEx);
     console.log(number)
     if (number.length > 11 || 
     number.length < 10 || 
     (number.length == 11 && number[0] != 1)) {
       return false;
     } else {
       return true;
     }
    }

}

telephoneCheck("(555)555-5555");
