const inquirer= require('inquirer');

inquirer
  .prompt({
   type:'list',
   name:'opcion',
   message:'¿que desea hacer?',
   choices:['iniciar sesison','registrar']
  })
  .then(answers =>{
    if(answers.opcion==='iniciar sesison'){
     const iniciar = require('./modulos/iniciar')
     iniciar.inquirer}
     const registro = require('./modulos/formulario')
     registro.inquirer
  })
