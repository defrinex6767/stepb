const request = require('request-promise')


const purschase = (userId, products, options) => {
        request('http://localhost:3000/user/' + userId, { json: true }).then(response => {
                console.log(response)
        })
        console.log('kjahsdka')
}

purschase(1, 1, undefined)
