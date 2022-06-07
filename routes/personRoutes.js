const router = require("express").Router()

const Person = require("../models/Person")

//CREATE (C)RUD

router.post("/", async(req, res) => {

	const {name, salary, approved} = req.body

	if(!name){
		res.status(422).json({error: "Erro ao processar, verifique as informações e tente novamente!"})
	}

	const person = {
		name,
		salary,
		approved
	}

	try {
		await Person.create(person)

		res.status(201).json({message: "Pessoa inserida com sucesso"})
	} catch (error) {
		res.status(500).json({error : error})
	}
})

//Read - C(R)UD

router.get('/', async(req,res) => {
	
	try {

		const people = await Person.find()
		
		res.status(200).json(people)
	} catch (error) {
		res.status(500).json({error: error})
	}
})

//read by ID

router.get('/:id', async(req,res) => {

	const id = req.params.id;

	try {
		const person = await Person.findOne({_id: id})
		
		res.status(200).json(person)
	} catch (error) {
		res.status(500).json({error: error})
	}
})

module.exports = router