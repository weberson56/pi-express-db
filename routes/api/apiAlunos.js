var express = require('express');
var router = express.Router();
let alunos = require('../../tests/mocks/alunos.json')

/* GET users listing. */
router.get('/', function(_req, res, next) {
    const data = {alunos};
    res.json(data);
});

router.get('/:matricula', function(req, res, next) {

    const {matricula} =  req.params;

    const aluno = alunos.content[matricula];
    

    res.json('card',{title:'Detalhe dos alunos', aluno})
});

router.post('/', function(req, res, next) {
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;


    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula),
    };

    res.redirect('/alunos');
});

router.put('/matricula', function (req, res, next) {
    // const {body, method} = req;

    const {matricula} =  req.params;

    const novoAluno = req.body;

    alunos.content[matricula] = {
        ...novoAluno, 
        matricula: Number(matricula)
    };

    // res.send({body, method, msg:'altera usuario'});

    res.redirect('/alunos');
});

router.delete('/:matricula/', function (req, res, next) {

    const {matricula} = req.params;

    delete alunos.content[matricula]

    // res.send({body, method, msg:'remover o aluno'});
    res.redirect(303, '/alunos')

});






module.exports = router;

