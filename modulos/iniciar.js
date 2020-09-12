const inquirer= require('inquirer');
inquirer
  .prompt([
      {
        type:'input',
        name:'correo',
        message:'correo'
      },
      {
        type:'password',
        name:'contraseña',
        message:'contraseña'
      },
    ])
  exports.inquirer =inquirer;