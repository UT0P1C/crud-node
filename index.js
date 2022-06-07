//initializing packages
require('dotenv').config()

const express = require("express")

const mongoose = require("mongoose")

const app = express()

//read JSON 

app.use(
	express.urlencoded({
		extended: true
	})
)

app.use(express.json())


//routes
const personRoutes = require("./routes/personRoutes")

app.use('/person', personRoutes)


//endpoint

app.get("/", (req, res) => {
	res.json("status: 200")
})

//mongoose

const DB_USER = process.env.DB_USER;

const DB_PASS = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@nodecluster.rfi14.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {

	console.log("Connected")
	app.listen(3000)

})
.catch((err) => {
	console.log(err)
})
