const inquirer= require('inquirer');
inquirer.registerPrompt('datepicker', require('inquirer-datepicker'));
const tipoSFiltro = ['Peticion', 'Queja','Reclamo','Vacio']
const estadoFiltro = ['Radicado','Proceso','Resuelto','Cerrado','Vacio']
const tipoS = ['Peticion', 'Queja','Reclamo','Vacio']
const opcionesUs = ['Crear PQR','Listar PQRS','Salir']
const opciones = ['Agregar Nota','Marcar como resuelto','Salir']
const opcionesAd = ['Agregar Nota','Marcar como resuelto','Radicar','Proceso','Salir']
const opciones1 = ['Iniciar Session','Continuar en el formulario','Salir']

   exports.Menu_Operaciones = function() {
        return [{
            type:'list',
            message: '¿Que operacion desea realizar?',
            name: 'opcion', 
            choices: opcionesUs  
        }];
    }   

   exports.Opciones_Session = function() {
        return [{
            type:'list',
            name:'opcion',
            message:'¿que desea hacer?',
            choices:['Iniciar sesison','Registrar','Salir']
        }];
   }

   exports.Opciones_Solicitud = function() {
        return [{
            type:'list',
            name:'opcion',
            message:' ¿Desea continuar o salir?',
            choices: opciones
        }];
    }

    exports.Opciones_IF = function() {
        return [{
            type:'list',
            name:'opcion',
            message:' ¿Error, que desea hacer?',
            choices: opciones1
        }];
    }

    exports.Filtro_PQRS = function() {
        return [{
            type:'list',
            name:'tipo',
            message:'Filtro por Tipo de PQR',
            choices: tipoSFiltro
        },
        {
            type:'list',
            name:'estado',
            message:'Filtro por estado de PQR',
            choices: estadoFiltro
        }];
    }

    exports.Crear_Solicitud = function() {
        return [{
            type:'input',
            name:'asunto',
            message:'Asunto', 
            validate: function (value) {
                if ((/.+/).test(value)) { return true; }
                return 'Asunto es requerido';
            }
        },
        {
            type:'list',
            name:'tipo',
            message:'tipo',
            choices: tipoS
        },
        {
            type:'input',
            name:'descrip',
            message:'Descripcion',
            validate: function (value) {
                if ((/.+/).test(value)) { return true; }
                return 'Descripcion  requerido';
            }
        }];
    }    

    exports.Filtro_Lista = function() {
        return [{
            type:'list',
            name:'tipo',
            message:'Tipo de solicitud',
            choices: tipoSFiltro,
            default: ''
        },
        {
            type:'list',
            name:'estado',
            message:'Estado de solicitud',
            choices: estadoFiltro,
            default: ''
        },
        {
            type:'input',
            name:'asunto',
            message:'Ingrese el asunto',            
            default:''
        },
        {
            type:'datepicker',
            name:'creacion',
            message:'Ingrese fecha de creaccion',
            default: new Date('3000-09-13T01:50:32.201Z')
        }];
    }

    exports.Opciones_Notacion = function() {
        return [{
            type:'list',
            name:'opcion',
            message:' ¿Que proceso quiere hacer con la pqr?',
            choices: opciones
        }];
    }

    exports.Opciones_NotacionAd = function() {
        return [{
            type:'list',
            name:'opcion',
            message:' ¿Que proceso quiere hacer con la pqr?',
            choices: opcionesAd
        }];
    }

    exports.Iniciar_Session = function() {
        return [{
            type:'input',
            name:'correo',
            message:'Correo',
            validate: function (value) {
                if ((/.+/).test(value)) { return true; }
                return 'Correo es requerido';
            }
        },
        {
            type:'password',
            name:'contraseña',
            message:'contraseña',
            validate: function (value) {
                if ((/.+/).test(value)) { return true; }
                return 'Contraseña  requerida';
            }
        }];
    }

    exports.Formulario = function() {
        return [{
            type:'input',
            name:'nombre',
            message:'Nombre',
            validate: function (value) {
                if ((/.+/).test(value)) { return true; }
                return 'Nombre requerido';
            }
        },
        {
            type:'input',
            name:'correo',
            message:'Correo',
            validate: function (value) {
                if ((/.+/).test(value)) { return true; }
                return 'Correo requerido';
            }
        },
        {
            type:'password',
            name:'contraseña',
            message:'Contraseña',
            validate: function (value) {
                if ((/.+/).test(value)) { return true; }
                return 'Contraseña requerida';
            }
        }];
    }

