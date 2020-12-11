/* Convert the given number into a roman numeral.
 * All roman numerals answers should be provided in upper-case.
 */

function convertToRoman(num) {
    let returnNum = [];
    let runningNum = num;

    function numWriter(subtractor, romanEquiv) {
        while(runningNum - subtractor >= 0) {
            runningNum -= subtractor;
            returnNum.push(romanEquiv);
        }
    }

    numWriter(1000, "M");
    numWriter(900, "CM");
    numWriter(500, "D");
    numWriter(400, "CD");
    numWriter(100, "C");
    numWriter(90, "XC");
    numWriter(50, "L");
    numWriter(40, "XL");
    numWriter(10, "X");
	numWriter(9, "IX");
	numWriter(5, "V");
	numWriter(1, "I");

    return returnNum.join("");
}

console.log(convertToRoman(98765));
