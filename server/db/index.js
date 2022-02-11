const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://ilyes:23011997@socytics.feqql.mongodb.net/webapp?authSource=admin', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection


module.exports = db