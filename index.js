//initializing packages
const express = require("express")

const mongoose = require("mongoose")

const app = express()

const Person = require("./models/Person")

//read JSON 

app.use(
	express.urlencoded({
		extended: true
	})
)

app.use(express.json())


//routes

app.post("/person", async(req, res) => {

	const {name, salary, approved} = req.body

	const person = {
		name,
		salary,
		approved
	}

	try {
		await Person.create(person)

		res.status(201)
	} catch (error) {
		res.status(500).json({error : error})
	}
})


//endpoint

app.get("/", (req, res) => {
	res.json("status: 200")
})

mongoose.connect('mongodb+srv://utopic:gWOq2rhn2ebzhbaX@nodecluster.rfi14.mongodb.net/?retryWrites=true&w=majority')
.then(() => {

	console.log("Connected");
	app.listen(3000)

})
.catch((err) => {
	console.log(err)
})

//password gWOq2rhn2ebzhbaX

//mongodb+srv://utopic:gWOq2rhn2ebzhbaX@nodecluster.rfi14.mongodb.net/?retryWrites=true&w=majority