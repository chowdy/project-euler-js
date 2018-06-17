/*
 * For a number written in Roman numerals to be considered valid there are basic rules which must be followed. Even
 * though the rules allow some numbers to be expressed in more than one way there is always a "best" way of writing a
 * particular number.
 *
 * For example, it would appear that there are at least six ways of writing the number sixteen:
 *
 * IIIIIIIIIIIIIIII
 * VIIIIIIIIIII
 * VVIIIIII
 * XIIIIII
 * VVVI
 * XVI
 *
 * However, according to the rules only XIIIIII and XVI are valid, and the last example is considered to be the most
 * efficient, as it uses the least number of numerals.
 *
 * The 11K text file, roman.txt (right click and 'Save Link/Target As...'), contains one thousand numbers written in
 * valid, but not necessarily minimal, Roman numerals; see About... Roman Numerals for the definitive rules for this
 * problem.
 *
 * Find the number of characters saved by writing each of these in their minimal form.
 *
 * Note: You can assume that all the Roman numerals in the file contain no more than four consecutive identical units.
 */
const fs = require('fs')
const Purdy = require('purdy')

ROMAN = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }

const TestRomanNumeralTranslations = {
    'IIIIIIIIIIIIIIII': {decimal: 16, valid: false},
    'XIIIIII': {decimal: 16},
    'XVI': {decimal: 16},
    'XIX': {decimal: 19},
    'IX': {decimal: 9},
    'IIIIIIIII': {decimal:9},
    'VIIII': {decimal:9},
    'XIIIIIIIII': {decimal: 19},
    'XVIIII': {decimal: 19},
    'IV': {decimal: 4},
    'IIII': {decimal: 4},
    'XXXXIIIIIIIII': {decimal:49},
    'XXXXVIIII': {decimal:49},
    'XXXXIX': {decimal:49},
    'XLIIIIIIIII': {decimal:49},
    'XLVIIII': {decimal:49},
    'XLIX': {decimal:49},
    'MCCCCCCVI': {decimal: 1606},
    'MDCVI': {decimal: 1606},
}

const TestDecimalTranslations = {
    1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI',
    9: 'IX', 19: 'XIX', 14: 'XIV',
    40: 'XL', 90: 'XC',
    400: 'CD', 900: 'CM',
    1606: 'MDCVI'
}

function testDecimalToRoman() {
    numFailures = 0
    Object.keys(TestDecimalTranslations).map((decimal) => {
        test = decimal
        actual = decimalToRoman(decimal)
        expected = TestDecimalTranslations[decimal]
        return {
            decimal: decimal,
            actual: actual,
            expected: expected,
            passed: (actual == expected)
        }
    }).forEach((testResult) => {
        if (!testResult.passed) {
            numFailures++
            Purdy(testResult)
        }
    })

    if (numFailures == 0) {
        console.log("testDecimalToRoman(): ✅")
    }
}

function testRomanToDecimal() {
    Object.keys(TestRomanNumeralTranslations).map((roman) => {
        test = TestRomanNumeralTranslations[roman]
        actual = romanToDecimal(roman)
        expected = test.decimal
        return {
            roman: roman,
            actual: actual,
            expected: expected,
            passed: (actual == expected)
        }
    }).forEach((testResult) => {
        if (!testResult.passed) {
            Purdy(testResult)
        }
    })
}

//return testRomanToDecimal()
// Returns most efficient
function decimalToRoman(num) {

    exact = undefined
    Object.keys(ROMAN).forEach((k) => {
        if (ROMAN[k] == num) {
            exact = k
        }
    })
    if (exact) {
        return exact
    }

    roman = ""
    numBuf = num
    while (numBuf > 0) {
        chunked = false
        new Array(1000, 500, 100, 50, 10, 5, 1).forEach((chunk) => {
            if (chunked) { return; }
            if (chunk > numBuf) {
                subPairs = {
                    5: 1,
                    10: 1,
                    50: 10,
                    100: 10,
                    500: 100,
                    1000: 100,
                }
                subPair = subPairs[chunk]
                if (subPair && chunk - subPair <= numBuf) {
                    roman += (decimalToRoman(subPair) + decimalToRoman(chunk))
                    numBuf -= (chunk - subPair)
                    chunked = true
                }
            } else {
                numBuf -= chunk
                roman += decimalToRoman(chunk)
                chunked = true
            }
        })
    }
    return roman
}

function romanToDecimal(rnum) {
    sum = 0
    prev = undefined
    canLeadSubtractivePair = [ 'I', 'X', 'C' ]
    for (i = 0; i < rnum.length; i++) {
        curr = rnum[i]

        if (prev) {
            if (ROMAN[curr] <= ROMAN[prev]) {
                sum += ROMAN[prev]
                prev = curr
            } else {
                sum += ROMAN[curr] - ROMAN[prev]
                prev = undefined
            }
        } else {
            if (canLeadSubtractivePair.includes(curr)) {
                prev = curr
            } else {
                sum += ROMAN[curr]
            }
        }
    }

    if (prev)  {
        sum += ROMAN[prev]
    }

    return sum
}

module.exports = function() {

    //return testRomanToDecimal()
    //return testDecimalToRoman()

    file = fs.readFileSync('./p089_roman.txt')
    fileRomans = file.toString().split("\n")
    fileTranslated = fileRomans.map((fr) => {
        return {
            fileRoman: fr,
            decimal: romanToDecimal(fr) ,
            myRoman: decimalToRoman(romanToDecimal(fr))
        }
    })
    fileTranslated = fileTranslated.map((ft) => { return (ft.fileRoman.length - ft.myRoman.length) })
    return fileTranslated.reduce((m,i) => { return m + i })
}
