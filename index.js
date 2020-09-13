const inquirer= require('inquirer');
const variables_session = require('./modulos/variables_interfaz');
const funciones = require('./modulos/interfaces');

inquirer
  .prompt(variables_session.Opciones_Session())
  .then(answers =>{
        if(answers.opcion==='Iniciar sesison') funciones.Iniciar_Session();
        else funciones.Formulario();
  })
