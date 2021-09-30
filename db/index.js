const mongoose = require('mongoose')

module.exports = async function syncDB() { await mongoose.connect('mongodb://localhost:27017/purchaseInfo_db') }
