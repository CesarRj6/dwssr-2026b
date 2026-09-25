//var express = require('express');
import express from 'express';
//var router = express.Router();
const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1 style="color:red;">LISTA DE USUARIOS</h1>');
});
 
//module.exports = router;
export default router;
