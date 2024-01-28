const mongoose = require('mongoose');
require('dotenv').config()

async function db() {
    try {
        await mongoose.connect(process.env.DB_URL).then(console.log('coonted on mongooes database'))
    } catch (e) {
        console.log(e)
    }
};

module.exports = db;