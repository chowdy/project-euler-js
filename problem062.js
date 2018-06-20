/*
 * The cube, 41063625 (345^3), can be permuted to produce two other cubes: 56623104 (384^3) and 66430125 (405^3).
 * In fact, 41063625 is the smallest cube which has exactly three permutations of its digits which are also cube.
 *
 * Find the smallest cube for which exactly five permutations of its digits are cube.
 */
const utils = require('./utils.js')
module.exports = function() {

    max = 0
    var j = 0

    cubes = [1,1]
    var i = 2
    while (true) {

        while (true) {
        }

        // I think a better solution might be to save a set of a huge number of cubes and search for ones that are
        // permutations of one another

        //if (j == 500) { return }
        //if (j % 25 == 0) {
        //    console.log(j)
        //}
        //j++ // wow, i had to call this j nstead of i ? declare it as var? i don't understand js variable scoping yet
        // super golfy ⛳
        //cubePerms = utils.permutations((j*j*j).toString().split(''))
        //                 .map((pa) => { return pa.join('') })
        //                 .filter((ps, index, array) => { return array.indexOf(ps) === index })
        //                 .map((p) => { return BigInt(p) })
        //                 .filter((p) => { return utils.isCube(p) })
        //if (cubePerms.length > max) {
        //    max = cubePerms.length
        //    console.log(`#${max} ${j} => ${cubePerms}`)
        //}
        //if (cubePerms.length == 5) {
        //    return j
        //}
        //cubePerms = []
        //count = 0
        //utils.permutations((j*j*j).toString().split('')).forEach((ps) => {
        //    p = parseInt(ps)
        //    cbrt = Math.cbrt(p)
        //    if (cbrt - parseInt(cbrt) == 0) {
        //        count++
        //    }
        //})
        //if (count == 5) {
        //    return j
        //}

    }
}
