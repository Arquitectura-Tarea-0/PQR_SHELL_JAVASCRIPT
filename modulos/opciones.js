const funciones = require('./funciones');
const opciones= require('inquirer');
const opcion = ['crear solicitud','listar solicitud','salir']

exports.menu= function(){
        opciones.prompt([{
        type:'list',
        message: '¿Que operacion desea realizar?',
        name: 'opcion', 
        choices: opcion    
    }])
    .then(function(answers) {
        if(answers.opcion==='crear solicitud'){
            funciones.CrearAsunto()
        }
        if(answers.opcion==='listar solicitud'){ 
            funciones.OpcionesFiltro()
        }
    })
}