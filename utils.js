
var cubeMemo = {}

module.exports = {

    // Super naive and memoized
    // this was really dumb, but will be useful if i ever need to do this math on big numbers lol
    isCube: function(n) {
        if ((memo = cubeMemo[n]) != undefined) {
            return memo
        }
        i = 1
        while (true) {
            cube = i*i*i
            if (cube > n) {
                cubeMemo[n] = false
                return false
            }
            if (cube == n) {
                cubeMemo[n] = true
                return true
            }
            i++
        }
        return false
    },

    swap: function(array, i, j) {
        buf = array[i]
        array[i] = array[j]
        array[j] = buf
    },

    // https://en.wikipedia.org/wiki/Heap%27s_algorithm
    permutations: function(array) {
        perms = {}
        buf = []
        for (i = 0; i < array.length; i++) {
            buf[i] = 0
        }
        perms[array.join('')] = true
        i = 0

        // This is neat:
        while (i < array.length) if (buf[i] < i) {
            if (i % 2 == 0) {
                aBuf = array[0]
                array[0] = array[i]
                array[i] = aBuf
            } else {
                aBuf = array[buf[i]]
                array[buf[i]] = array[i]
                array[i] = aBuf
            }
            perms[array.join('')] = true
            buf[i]++
            i = 0
        } else {
            buf[i] = 0
            i++
        }
        return perms
    }

}