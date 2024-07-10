var express = require('express');
const db = require('../../config/config_database');
var router = require('express').Router();


/* GET users listing. */
router.get('/', async function (req, res, next) {
    const query = `select * from alunos`

    try {
        const data = await db.any(query);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.massager })
    }
});

router.get('/:matricula', async function (req, res, next) {
    const matricula = req.params.matricula
    const query = `SELECT * 
        FROM alunos 
        WHERE matricula = $1`;

    try {
        const data = await db.any(query,matricula);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.massager })
    }
});

router.post('/', async function (req, res, next) {

    const nome = req.body.nome
    const matricula = req.body.matricula
    const email = req.body.email
    const data_nascimento = req.body.data_nascimento
    
    const query = `INSERT INTO alunos (matricula, nome, email, data_nascimento) 
            VALUES ($1, $2, $3, $4)`

    const values =[matricula, nome, email, data_nascimento]

    try {
        const data = await db.any(query, values)
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
    
});

router.put('/:matricula', function (req, res, next) {
    const query = `UPDATE alunos 
            SET alunos (matricula = $1 , nome = $2 ,  email = $3, data_nascimento = $4) 
            WHERE alunos = $1`
    const novoAluno = req.body;
    const martricula = Number(req.params.martricula)

    alunos.content[martricula] = {...novoAluno, martricula}

    const response = {
        msg:"aluno criado com sucesso",
        aluno: alunos.content[martricula]
    }

    res.status(201).json(response)
});

router.delete('/:matricula/', function (req, res, next) {
    const query = `DELETE FROM
        alunos
        WHERE matricula=$1`
    const martricula = req.params.matricula;
    delete alunos.content[martricula]
    const response = {
        msg: "aluno removido",
        martricula
    }
    res.status(201).json(response)
});






module.exports = router;

