/*
 * The cube, 41063625 (345^3), can be permuted to produce two other cubes: 56623104 (384^3) and 66430125 (405^3).
 * In fact, 41063625 is the smallest cube which has exactly three permutations of its digits which are also cube.
 *
 * Find the smallest cube for which exactly five permutations of its digits are cube.
 */
const utils = require('./utils.js')
module.exports = function() {
    x = [1,2,3]
    utils.swap(x,0,2)
    //return x
    return utils.permutations([1,2,3]).join("\n")
}
