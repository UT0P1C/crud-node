const router = require("express").Router()

const Person = require("../models/Person")

//CREATE (C)RUD - POST

router.post("/", async(req, res) => {

	const {name, salary, approved} = req.body

	if(!name){
		res.status(422).json({error: "Erro ao processar, verifique as informações e tente novamente!"})
		return
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

//Read - C(R)UD - GET

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
		
		if(!person){
			res.status(422).json({message: "Usuário não encontrado!"})
			return
		}

		res.status(200).json(person)

	} catch (error) {
		res.status(500).json({error: error})
	}
})

//Update CR(U)D - PUT/PATCH

router.patch('/:id', async(req, res) => {
	const id = req.params.id;

	const {name, salary, approved} = req.body

	const person = {
		name,
		salary,
		approved
	}

	try{
		const updatedPerson = await Person.updateOne({_id: id, person});

		//valida se o usuario existe
		
		console.log(updatedPerson);

		if(updatedPerson.matchedCount == 0){
			res.status(422).json({message: "Usuário não encontrado!"})
			return
		}

		res.status(200).json(person)
	}catch(error){
		res.status(500).json({message:"Erro ao atualizar usuário"})
	}
})


//DELETE - CRU(D)

router.delete('/:id', async(req, res) => {
	const id = req.params.id;

	const person = await Person.findOne({_id: id})

	if(!person){
		res.status(422).json({message: "Usuário não encontrado!"})
		return
	}

	try {
		await Person.deleteOne({_id:id})

		res.status(200).json({message: "Usuário Deletado com sucesso!"})
	} catch (error) {
		res.status(500).json(error)
	}


})

module.exports = router