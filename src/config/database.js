const mongoose = require("mongoose")
const { config } = require("dotenv")

config()
async function connect(url) {
	try {
		mongoose.connect(
			url || process.env.MONGO_DB_LOCALHOST,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)
		console.log("connected to Mongo DB")
	} catch (err) {
		console.log(err.message)
	}
}

module.exports = connect
