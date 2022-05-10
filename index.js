//initializing packages
const express = require("express")

const app = express()

//read JSON 

app.use(
	express.urlencoded({
		extended: true
	})
)

app.use(express.json())


//endpoint

app.get("/", (req, res) => {
	res.json("status: 200")
})


//ports
app.listen(3000)