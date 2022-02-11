const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeamSchema = new Schema({}, { strict: false })

module.exports = mongoose.model('Team', TeamSchema, 'teams')