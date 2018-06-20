module.exports = {

    swap: function(array, i, j) {
        buf = array[i]
        array[i] = array[j]
        array[j] = buf
    },

    // https://en.wikipedia.org/wiki/Heap%27s_algorithm
    permutations: function(array) {
        perms = []
        buf = []
        for (i = 0; i < array.length; i++) {
            buf[i] = 0
        }
        perms.push(array.slice())
        i = 0

        // This is interesting:
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
            perms.push(array.slice())
            buf[i]++
            i = 0
        } else {
            buf[i] = 0
            i++
        }
        return perms
    }

}