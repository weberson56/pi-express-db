const{localApi} = require('../../config/config_axios')
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', async function(_req, res, next) {
    try {
        const response = await localApi.get('/api/v1/alunos')
        // console.log(response)
        const alunos = response.data;
        const viewData = {title: 'Alunos', alunos};
        res.status(200).render('list', viewData);
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.get('/new', function(_req, res, next) {
    let viewData = {
        title: 'Novo aluno',
        parametro: "creat",
        metodo: "POST", 
        buttonText: 'Adicionar aluno'}
    
    res.render('form', viewData);
});

router.get('/:matricula', async function(req, res, next) {

    const matricula =  req.params.matricula
    try {
        const response = await localApi.get(`/api/v1/alunos/`+ matricula);
        const aluno = response.data;
        const viewData = {aluno, title:'detlha do aluno'}

        res.status(200).render('card', viewData)
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.get('/edit/:matricula', async function(req, res, next) {

    const matricula  = req.params.matricula;
    let apiUrlaPath = '/api/v1/alunos/' + matricula
    const viewData = {
        metodo: "PUT",
        parametro: matricula,
        title: "Editar aluno",
        buttonText: "Atualizar alunos"};
    try {
        let response = await localApi.get(apiUrlaPath)
        let aluno = response.data
        console.log(aluno)
        viewData.aluno = aluno;
        res.status(200).render('form', viewData)
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.post('/create',async function(req, res, next) {
    const novoAluno = req.body;

    try {
        const response = await localApi.post('alunos', novoAluno)
        if(response.status == 201)res.redirect('/alunos')
    } catch (error) {
        console.error(error.message)
    }
});
router.put('/:matricula', async function (req, res, next) {

    const matricula =  req.params.matricula;
    const apiUrlPath = `/api/v1/alunos/` + matricula;

    const data = req.body;

    try {
        await localApi.put(apiUrlPath, data)
        
    } catch (error) {
        console.error(error.message)
    } finally {
        res.redirect('/alunos/' + matricula)
    }
});

router.delete('/:matricula/', async function (req, res, next) {

    const matricula  = req.params.matricula;
    try {
        await localApi.delete('/api/v1/alunos/' + matricula)
    } catch (error) {
        res.json({msg: error.message})
    }
    finally{
        res.redirect(303, '/alunos')
    }

});






module.exports = router;

