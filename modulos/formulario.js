const inquirer= require('inquirer');
inquirer
  .prompt([
      {
        type:'input',
        name:'nombre',
        message:'nombre'
      },
      {
        type:'input',
        name:'correo',
        message:'correo'
      },
      {
        type:'password',
        name:'contraseña',
        message:'contraseña'
      }
    ])
    .then(answers =>{
      
       const crearpqr = require('./opciones')
       crearpqr.menu()
    })

  exports.inquirer =inquirer;