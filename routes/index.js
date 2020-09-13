var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var services = require('./../inc/services');
var produtos = require('./../inc/produtos');
var home = require('./../inc/home');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results => {

    res.render('index', {   //render é na rota
      title: 'Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Restaurante saboroso!!',
      menus: results,
      isHome: true
    });
    
  });
  
});

router.get('/contacts', function(req, res, next){

  contacts.render(req, res);
  
});

router.post('/contacts', function(req, res, next) {

  if (!req.body.name) {
    contacts.render(req, res, "Informe seu nome");
  } else if (!req.body.email) {
    contacts.render(req, res, "Informe seu e-mail");
  } else if (!req.body.message) {
    contacts.render(req, res, "Escreva a mensagem");
  } else {
  
    contacts.save(req.body).then(results => {

      req.body = {};

      contacts.render(req, res, null, "Mensagem enviada. Em breve responderemos!");

    }).catch(err=>{

      contacts.render(req, res, err.message);

    });

    }
});


router.get('/menus', function(req, res, next) {

  menus.getMenus().then(results => {

    res.render('menus', {
      title: 'Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results
    });
  });
});

router.get('/services', function(req, res, next) {

  res.render('services', {
    title: 'Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  });

});

router.get('/reservations', function(req, res, next) {

  reservations.render(req, res);

});

router.post('/reservations', function(req, res, next) {

  if (!req.body.name) {
    reservations.render(req, res, "Digite o nome");
  } else if (!req.body.email) {
    reservations.render(req, res, "Informe o e-mail");
  } else if (!req.body.people) {
    reservations.render(req, res, "Informe nº pessoas");
  } else if (!req.body.date) {
    reservations.render(req, res, "Informe a data");
  } else if (!req.body.time) {
    reservations.render(req, res, "Informe o horário");
  } else {
  
    reservations.save(req.body).then(results => {

      req.body = {};

      reservations.render(req, res, null, "Reserva efetuada");

    }).catch(err=>{

      reservations.render(req, res, err.message);

    });

    }
});

router.use(function(req, res, next) {

  req.menus = menus.getMenus();
  next();
})

router.use(function(req, res, next) {

  req.produtos = produtos.getProdutos();
  next();
})

router.use(function(req, res, next) {
  
  req.services = services.getServices();
  next();
})


router.get('/teste', function(req, res, next) {

  menus.getMenus().then(results => {

    res.render('teste', {
      title: 'Potência!',
      banner: 'images/lagoa.jpg',
      h1: 'Lonas e Revestimentos!',
      products: results,
      services: results
    });
  });
});

module.exports = router;
