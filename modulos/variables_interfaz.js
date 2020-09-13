const inquirer= require('inquirer');
inquirer.registerPrompt('datepicker', require('inquirer-datepicker'));
const tipoS = ['tipo1','tipo2']
const estado = ['tipo1','tipo2']
const opciones = ['Continuar','Salir']
const opcion = ['Crear solicitud','Listar solicitud','Salir']

   exports.Menu_Operaciones = function() {
        return [{
            type:'list',
            message: '¿Que operacion desea realizar?',
            name: 'opcion', 
            choices: opcion  
        }];
    }   

   exports.Opciones_Session = function() {
        return [{
            type:'list',
            name:'opcion',
            message:'¿que desea hacer?',
            choices:['Iniciar sesison','Registrar']
        }];
   }

   exports.Opciones_Solicitud = function() {
        return [{
            ttype:'list',
            name:'opcion',
            message:' ¿Desea continuar o salir?',
            choices: opciones
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
            choices: tipoS,
            default: tipoS[0]
        },
        {
            type:'list',
            name:'estado',
            message:'Estado de solicitud',
            choices: estado,
            default: estado[0]
        },
        {
            type:'datepicker',
            name:'creacion',
            message:'Ingrese fecha de creaccion',            
            default:new Date('2017-09-28 17:36:05')
        },
        {
            type:'datepicker',
            name:'fin',
            message:'Ingrese fecha de respuesta',
            default: new Date('2017-09-28 17:36:05')
        }];
    }

    exports.Opciones_Notacion = function() {
        return [{
            type:'list',
            name:'opcion',
            message:' ¿Desea agregar una notificacion?',
            choices: opciones
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
            name:'Contraseña',
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

