/*
 * The 5-digit number, 16807=75, is also a fifth power. Similarly, the 9-digit number, 134217728=89, is a ninth power.
 * How many n-digit positive integers exist which are also an nth power?
 */

module.exports = function() {
    winners = 0
    digit = 1n
    while(true) {
        for (i = 1n; (i ** digit).toString().length <= digit; i++) {
            pow = i ** digit
            if (pow.toString().length == digit) {
                winners++
                console.log(`${winners} ${i}^${digit} => ${pow.toString()}`)
            }
        }
        digit++
    }
}