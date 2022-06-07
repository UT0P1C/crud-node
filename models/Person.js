const mongoose = require("mongoose")

const Person = monogoose.model("Person", {
	name: String,
	salary: Number,
	approved: Boolean
})

module.exports = Person