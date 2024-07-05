var express = require('express');
var router = express.Router();
let alunos = require('../tests/mocks/alunos.json')

/* GET users listing. */
router.get('/', function(req, res, next) {
    const data = {
        title: 'Alunos',
        alunos: alunos.content
    };

    res.render('list',data)
});

router.get('/new', function(_req, res, next) {
    res.render('form', {title: 'Novo aluno', buttonText: 'Adicionar aluno'});
});

router.post('/creat', function(req, res, next) {
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;


    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula),
    };

    res.redirect('/alunos');
});


router.put('/', function (req, res, next) {
    
    res.send(rq.body);
});


router.delete('/', function (req, res, next) {
    
    res.send(rq.body);
});


router.get('/:matricula', function(req, res, next) {

    const {matricula} =  req.params;

    const aluno = alunos.content[matricula];
    

    res.render('card',{title:'Detalhe dos alunos', aluno})
});

router.get('/edit/:matricula', function(req, res, next) {

    const {matricula} =  req.params;

    const aluno = alunos.content[matricula];

    res.render('form', {title: 'Editar aluno', buttonText: 'Salvar Alterações', aluno});
});

module.exports = router;

