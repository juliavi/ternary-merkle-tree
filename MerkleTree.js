'use strict'

const SHA256 = require('hash.js/lib/hash/sha/256')
const DateGenerator = require('random-date-generator')

const calculateRoot = (data = []) => {   //tree structure not saved, input data is hashed - class is unaware of real data
    if(data.length === 0) {
        return null
    }

    if(data.length === 1) {
        return data[0]
    }

    if(data.length <= 3) {
        return hash(data.join(''))
    }

    const nextLevel = []

    for(let i = 0; i < data.length; i += 3) {
        nextLevel.push(hash((data.slice(i, i+3).join(''))))
    }

    return calculateRoot(nextLevel)
}

const hash = data => SHA256().update(data).digest('hex')


///demo

const randData = Array.apply(null, new Array(16))
    .map(x => x = hash(
        (DateGenerator.getRandomDateInRange(new Date(2017,0,1), new Date(2017,11,31)).toString())
    ))

console.log(`Root - ${calculateRoot(randData)}`)
