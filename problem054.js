/*
 * https://projecteuler.net/problem=54
 */

const AllHands = [ 'highCard', 'onePair', 'twoPairs', 'threeOfAKind', 'straight', 'flush', 'fullHouse', 'fourOfAKind', 'straightFlush', 'royalFlush', ]
const AllCards = [ '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A', ]

function sortCardsByStrengthDesc(cards) {
    return cards.slice().sort((a,b) => { return AllCards.indexOf(b[0]) - AllCards.indexOf(a[0]) })
}

HandProcessors = {

    highCard: function (cards) {
        tempHand = sortCardsByStrengthDesc(cards).slice()
        highCard = tempHand[0]
        rest = tempHand.slice(1,5)
        if (highCard) {
            return { hand: 'highCard', rank: highCard, rest: rest }
        }
    },

    onePair: function (cards) {
        return getPairHands(cards.slice(), false)
    },

    twoPairs: function (cards) {
        return getPairHands(cards.slice(), true)
    },

    threeOfAKind: function (cards) {
        triples = []
        cards.forEach((card) => {
            paired = cards.filter((other) => {
                return card != other && other[0] == card[0]
            })
            if (paired.length == 2) {
                triples.push(card)
            }
        })
        if (triples && triples.length == 3) {
            rest = sortCardsByStrengthDesc(cards).splice()
            triples.forEach((t) => { rest.splice(rest.indexOf(t), 1) })
            return { hand: 'threeOfAKind', rank: triples, rest: rest }
        } else {
            return undefined
        }
    },

    straight: function (cards) {
        ascending = sortCardsByStrengthDesc(cards).reverse()
        prev = ascending[0]
        for (i = 1; i < ascending.length; i++) {
            curr = ascending[i]
            if (AllCards.indexOf(curr[0]) - AllCards.indexOf(prev[0]) != 1) {
                return undefined
            }
            prev = curr
        }
        return { hand: 'straight', rank: ascending.reverse(), rest: [] }
    },

    flush: function (cards) {
        // here be 🐉 af
        //🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊
        sorted = sortCardsByStrengthDesc(cards)
        return [...new Set(cards.map((c) => {
            return c[1]
        }))].length == 1 ? { hand: 'flush', rank: [sorted[0]], rest: sorted.slice(1,5) } : undefined
    },

    fullHouse: function (cards) {
        triples = HandProcessors.threeOfAKind(cards.slice())
        doubles = HandProcessors.twoPairs(cards.slice())
        if (triples && doubles && doubles.rank.length > 4) {
            return {
                hand: 'fullHouse',
                rank: triples.rank.concat(triples.rest),
                rest: doubles.rank.filter((c) => { return !triples.rank.includes(c) })
            }
        }
        return undefined
    },

    fourOfAKind: function (cards) {
        quads = []
        cards.forEach((card) => {
            paired = cards.filter((other) => {
                return card != other && other[0] == card[0]
            })
            if (paired.length == 3) {
                quads.push(card)
            }
        })
        if (quads && quads.length > 0) {
            rest = cards.filter((c) => {
                return !quads.includes(c)
            })
            return { hand: 'fourOfAKind', rank: quads, rest: rest }
        } else {
            return undefined
        }
    },

    straightFlush: function (cards) {
        straight = HandProcessors.straight(cards.slice())
        flush = HandProcessors.flush(cards.slice())
        if (straight && flush) {
            return { hand: 'straightFlush', rank: straight.rank, rest: [] }
        } else {
            return undefined
        }
    },

    royalFlush: function (cards) {
        sFlush = HandProcessors.straightFlush(cards.slice())
        if (sFlush && sFlush.rank[0][0] == 'A') {
            return { hand: 'royalFlush', rank: sFlush.rank, rest: [] }
        } else {
            return undefined
        }
    }
}

function getPairHands(cards, twoPair = false) {
    pairs = []
    cards.forEach((card) => {

        // Get all the cards paired with the current one
        paired = cards.filter((other) => {
            return card != other && other[0] == card[0]
        })

        // If any were found, push the current card onto the pairs list
        if (paired.length > 0) {
            pairs.push(card)
        }
    })

    if (pairs && pairs.length > 0) {
        rest = sortCardsByStrengthDesc(cards).slice()
        if (!twoPair) {
            pairs = sortCardsByStrengthDesc(pairs).slice(0,2)
            pairs.forEach((c) => {
                rest.splice(rest.indexOf(c),1)
            })
            return {hand: 'onePair', rank: pairs, rest: rest}
        } else if (twoPair && pairs.length >= 4) {
            pairs = sortCardsByStrengthDesc(pairs)
            pairs.forEach((c) => {
                rest.splice(rest.indexOf(c),1)
            })
            return { hand: 'twoPairs', rank: pairs, rest: rest }
        } else {
            return undefined
        }
    } else {
        return undefined
    }
}

function getBestHandForCards(cards) {
    processedHand = undefined
    AllHands.slice().reverse().forEach((potentialHand) => {
        if (!processedHand) {
            processedHand = HandProcessors[potentialHand](cards.slice())
        }
    })
    return processedHand
}

function compareHands(a,b) {
    aStrength = AllHands.indexOf(a.hand)
    bStrength = AllHands.indexOf(b.hand)
    if (aStrength == bStrength) {
        aStrength = AllCards.indexOf(a.rank[0][0])
        bStrength = AllCards.indexOf(b.rank[0][0])
    }
    if (aStrength == bStrength && a.rest && b.rest) {
        aStrength = AllCards.indexOf(a.rest[0][0])
        bStrength = AllCards.indexOf(b.rest[0][0])
        if (aStrength == bStrength) {
            aStrength = AllCards.indexOf(a.rest[1][0])
            bStrength = AllCards.indexOf(b.rest[1][0])
        }
        if (aStrength == bStrength) {
            aStrength = AllCards.indexOf(a.rest[2][0])
            bStrength = AllCards.indexOf(b.rest[2][0])
        }
    }
    return aStrength - bStrength
}

const Purdy = require('purdy')
module.exports = function() {

    testHandData = [
        { id: 1, p1: '5H 5C 6S 7S KD'.split(' '), p2: '2C 3S 8S 8D TD'.split(' '), winner: 'p2'},
        { id: 2, p1: '5D 8C 9S JS AC'.split(' '), p2: '2C 5C 7D 8S QH'.split(' '), winner: 'p1'},
        { id: 3, p1: '2D 9C AS AH AC'.split(' '), p2: '3D 6D 7D TD QD'.split(' '), winner: 'p2'},
        { id: 4, p1: '4D 6S 9H QH QC'.split(' '), p2: '3D 6D 7H QD QS'.split(' '), winner: 'p1'},
        { id: 5, p1: '2H 2D 4C 4D 4S'.split(' '), p2: '3C 3D 3S 9S 9D'.split(' '), winner: 'p1'},
    ]

    //Purdy(getBestHandForCards(testHandData[0].p1))
    //return Purdy(getBestHandForCards(testHandData[0].p2))

    testResults = testHandData.map((testData) => {
        hand1 = getBestHandForCards(testData.p1)
        hand2 = getBestHandForCards(testData.p2)
        compare = compareHands(hand1, hand2)
        winner = undefined
        if (compare > 0) {
            winner = 'p1'
        } else if (compare < 0) {
            winner = 'p2'
        }

        return {
            testDataId: testData.id,
            result: winner,
            expected: testData.winner,
            pass: winner && winner == testData.winner,
            p1: hand1,
            p2: hand2,
        }
    })

    testFailures = testResults.filter((testResult) => {
        return !testResult.pass
    })

    if (testFailures && testFailures.length > 0) {
        Purdy(testFailures, { depth: 3 })
        system.exit(0)
        return
    } else {
        console.log('no test failures')
    }

    const fs = require('fs')
    const rl = require('readline')

    hands = fs.readFileSync('./p054_poker.txt')
              .toString()
              .split("\n")
              .filter((m) => { return !!m })

    winners = hands.map((hand) => {
        cards = hand.split(' ')
        p1Cards = cards.slice(0,5)
        p2Cards = cards.slice(5,10)
        p1Hand = getBestHandForCards(p1Cards)
        p2Hand = getBestHandForCards(p2Cards)
        comparison = compareHands(p1Hand, p2Hand)
        if (comparison > 0) {
            return 'p1'
        } else if ( comparison < 0 ) {
            return 'p2'
        } else {
            return undefined
        }
    })

    winnerStats = ({
        p1: winners.filter((w) => w == 'p1').length,
        p2: winners.filter((w) => w == 'p2').length,
        undef: winners.filter((w) => w == undefined).length
    })

    return winnerStats.p1

}
