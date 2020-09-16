const inquirer= require('inquirer');
const variables_session = require('./modulos/variables_interfaz');
const {Formulario, Iniciar_Session} = require('./modulos/interfaces');


      inquirer
      .prompt(variables_session.Opciones_Session())
      .then(answers =>{
            if(answers.opcion==='Iniciar sesison') Iniciar_Session();
            if(answers.opcion==='Registrar') Formulario();
      })
