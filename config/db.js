const { Client } = require('pg')
const connection = new Client()
connection.connect()

module.exports = connection