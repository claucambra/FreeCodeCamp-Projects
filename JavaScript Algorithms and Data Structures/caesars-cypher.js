/* One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.
 * A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.
 * Write a function which takes a ROT13 encoded string as input and returns a decoded string.
 * All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
 */

function rot13(str) {

  let alphabet = {
    head: {
      value: 1,
      letter: "A",
      next: {
        value: 2,
        letter: "B",
        next: {
          value: 3,
          letter: "C",
          next: {
            value: 4,
            letter: "D",
            next: {
              value: 5,
              letter: "E",
              next: {
                value: 6,
                letter: "F",
                next: {
                  value: 7,
                  letter: "G",
                  next: {
                    value: 8,
                    letter: "H",
                    next: {
                      value: 9,
                      letter: "I",
                      next: {
                        value: 10,
                        letter: "J",
                        next: {
                          value: 11,
                          letter: "K",
                          next: {
                            value: 12,
                            letter: "L",
                            next: {
                              value: 13,
                              letter: "M",
                              next: {
                                value: 14,
                                letter: "N",
                                next: {
                                  value: 15,
                                  letter: "O",
                                  next: {
                                    value: 16,
                                    letter: "P",
                                    next: {
                                      value: 17,
                                      letter: "Q",
                                      next: {
                                        value: 18,
                                        letter: "R",
                                        next: {
                                          value: 19,
                                          letter: "S",
                                          next: {
                                            value: 20,
                                            letter: "T",
                                            next: {
                                              value: 21,
                                              letter: "U",
                                              next: {
                                                value: 22,
                                                letter: "V",
                                                next: {
                                                  value: 23,
                                                  letter: "W",
                                                  next: {
                                                    value: 24,
                                                    letter: "X",
                                                    next: {
                                                      value: 25,
                                                      letter: "Y",
                                                      next: {
                                                        value: 26,
                                                        letter: "Z",
                                                        next: null
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  //Make linked list circular
  let nullNext = alphabet.head;
  while(nullNext.next != null) {
    nullNext = nullNext.next;
  }

  nullNext.next = alphabet.head;

  //Finds value of cyphered letter in the linked list
  function findLetter(letter) {
    let node = alphabet.head;
    while(letter != node.letter) {
      node = node.next;
    }
    return node.value;
  }

  //Finds decyphered equivalent
  function decypher(letter) {
    let alphabetNode = alphabet.head;
    while(alphabetNode.value != findLetter(letter)) {
      
      alphabetNode = alphabetNode.next;
    }
    for(let i=0; i<13;i++) {
      alphabetNode = alphabetNode.next;
    }
   return alphabetNode.letter;
  }
  
  let letters = /[a-z]/i
  let returnArr = [];

  for (let i=0; i<str.length; i++) {
    if(letters.test(str[i]) == false) {
      returnArr.push(str[i]);
    } else {
      returnArr.push(decypher(str[i]))
    }
  }

  console.log(returnArr.join(""))
  return returnArr.join("");
}

rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.");
