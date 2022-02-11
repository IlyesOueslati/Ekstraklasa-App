const mongoose = require('mongoose')
const Schema = mongoose.Schema


const PlayerSchema = new Schema({}, { strict: false })

module.exports = mongoose.model('Player', PlayerSchema, 'players')